use soroban_sdk::{
    contracttype, Address, Bytes, BytesN, Env, Vec,
};
use crate::{admin, user, DataKey, Error};

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct LoanRequest {
    pub id: BytesN<32>,
    pub borrower: Address,
    pub amount: u32,
    pub interest_rate: u32, 
    pub funded: bool,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Loan {
    pub id: BytesN<32>,
    pub borrower: Address,
    pub lender: Address,
    pub amount: u32,
    pub interest_rate: u32,
    pub due_date: u64,
    pub payments_made: u32,
    pub total_payments: u32,
}

pub fn request_loan(
    env: Env,
    borrower: Address,
    amount: u32,
) -> Result<BytesN<32>, Error> {
    borrower.require_auth();

    let user_profile = user::get_profile(env.clone(), borrower.clone())?;

    if user_profile.is_banned {
        return Err(Error::UserBanned);
    }

    let global_params = admin::get_global_params(env.clone())?;

    if user_profile.credit_score < global_params.min_credit_score {
        return Err(Error::InsufficientCreditScore);
    }

    let max_loan =
        calculate_max_loan(user_profile.credit_score, global_params.max_loan_amount);

    if amount > max_loan {
        return Err(Error::LoanAmountTooHigh);
    }

    let interest_rate = calculate_interest_rate(user_profile.credit_score);

    let loan_id = generate_loan_id(env.clone());

    let loan_request = LoanRequest {
        id: loan_id.clone(),
        borrower: borrower.clone(),
        amount,
        interest_rate,
        funded: false,
    };

    env.storage()
        .instance()
        .set(&DataKey::LoanRequest(loan_id.clone()), &loan_request);

    let mut loan_requests: Vec<BytesN<32>> = env
        .storage()
        .instance()
        .get(&DataKey::LoanRequestsList)
        .unwrap_or(Vec::new(&env));
    loan_requests.push_back(loan_id.clone());
    env.storage()
        .instance()
        .set(&DataKey::LoanRequestsList, &loan_requests);

    Ok(loan_id)
}

pub fn list_loan_requests(env: Env) -> Vec<BytesN<32>> {
    env.storage()
        .instance()
        .get(&DataKey::LoanRequestsList)
        .unwrap_or(Vec::new(&env))
}

pub fn get_loan_request(
    env: Env,
    loan_id: BytesN<32>,
) -> Result<LoanRequest, Error> {
    env.storage()
        .instance()
        .get(&DataKey::LoanRequest(loan_id))
        .ok_or(Error::LoanNotFound)
}


pub fn fund_loan(
    env: Env,
    lender: Address,
    loan_id: BytesN<32>,
) -> Result<(), Error> {
    lender.require_auth();

    let mut loan_request: LoanRequest = env
        .storage()
        .instance()
        .get(&DataKey::LoanRequest(loan_id.clone()))
        .ok_or(Error::LoanNotFound)?;

    if loan_request.funded {
        return Err(Error::LoanAlreadyFunded);
    }

    //simulation
    let loan = Loan {
        id: loan_id.clone(),
        borrower: loan_request.borrower.clone(),
        lender: lender.clone(),
        amount: loan_request.amount,
        interest_rate: loan_request.interest_rate,
        due_date: env.ledger().timestamp() + 2592000,
        payments_made: 0,
        total_payments: 12,
    };

    env.storage()
        .instance()
        .set(&DataKey::Loan(loan_id.clone()), &loan);

    loan_request.funded = true;
    env.storage()
        .instance()
        .set(&DataKey::LoanRequest(loan_id.clone()), &loan_request);

let loan_requests: Vec<BytesN<32>> = env
    .storage()
    .instance()
    .get(&DataKey::LoanRequestsList)
    .unwrap_or(Vec::new(&env));

let mut new_loan_requests = Vec::new(&env);
for id in loan_requests.iter() {
    if id != loan_id { 
        new_loan_requests.push_back(id.clone());
    }
}

env.storage()
    .instance()
    .set(&DataKey::LoanRequestsList, &new_loan_requests);
    let mut user_profile =
        user::get_profile(env.clone(), loan_request.borrower.clone())?;
    user_profile.current_loan = loan_request.amount;
    user_profile.active_loan_id = Some(loan_id.clone());
    user::update_profile(env, loan_request.borrower.clone(), user_profile)?;

    Ok(())
}

fn calculate_max_loan(credit_score: u32, max_loan_amount: u32) -> u32 {
    (credit_score as u64 * max_loan_amount as u64 / 1000) as u32
}

fn calculate_interest_rate(credit_score: u32) -> u32 {
    let base_rate: u32 = 500; // 5%
    let rate_decrease = (credit_score.saturating_sub(500)) * 1;
    let interest_rate = base_rate.saturating_sub(rate_decrease);
    let min_rate = 200; // 2%
    if interest_rate < min_rate {
        min_rate
    } else {
        interest_rate
    }
}

fn generate_loan_id(env: Env) -> BytesN<32> {
    let mut seed = [0u8; 32];
    let network_id = env.ledger().network_id().to_array();
    seed.copy_from_slice(&network_id);
    seed[0] = (env.ledger().timestamp() % 256) as u8;
    let hash = env.crypto().sha256(&Bytes::from_array(&env, &seed));
    BytesN::from_array(&env, &hash.to_array())
}



pub fn make_payment(env: Env, borrower: Address) -> Result<(), Error> {
    borrower.require_auth();

    let mut user_profile = user::get_profile(env.clone(), borrower.clone())?;

    let loan_id = user_profile
        .active_loan_id
        .clone()
        .ok_or(Error::NoActiveLoan)?;

    let mut loan: Loan = env
        .storage()
        .instance()
        .get(&DataKey::Loan(loan_id.clone()))
        .ok_or(Error::NoActiveLoan)?;

    if loan.payments_made >= loan.total_payments {
        return Err(Error::NoActiveLoan);
    }

    let current_time = env.ledger().timestamp();
    if current_time <= loan.due_date {
        user_profile.credit_score += 5;
    } else {
        user_profile.credit_score = user_profile.credit_score.saturating_sub(10);
        user_profile.missed_payments += 1;
    }

    loan.payments_made += 1;
    loan.due_date += 2592000;

    if loan.payments_made == loan.total_payments {
        user_profile.current_loan = 0;
        user_profile.missed_payments = 0;
        user_profile.active_loan_id = None;
        env.storage()
            .instance()
            .remove(&DataKey::Loan(loan_id.clone()));
    } else {
        env.storage()
            .instance()
            .set(&DataKey::Loan(loan_id.clone()), &loan);
    }

    user::update_profile(env, borrower, user_profile)?;

    Ok(())
}

pub fn check_status(env: Env, borrower: Address) -> Result<(), Error> {
    let global_params = admin::get_global_params(env.clone())?;
    let mut user_profile = user::get_profile(env.clone(), borrower.clone())?;

    let loan_id = user_profile
        .active_loan_id
        .clone()
        .ok_or(Error::NoActiveLoan)?;

    let loan: Loan = env
        .storage()
        .instance()
        .get(&DataKey::Loan(loan_id.clone()))
        .ok_or(Error::NoActiveLoan)?;

    let current_time = env.ledger().timestamp();
    let payments_overdue =
        (current_time - loan.due_date) / global_params.payment_period;

    if payments_overdue as u32 + user_profile.missed_payments > global_params.max_missed_payments {
        user_profile.is_banned = true;
        user_profile.credit_score = user_profile.credit_score.saturating_sub(100);
        user_profile.active_loan_id = None; 
        env.storage()
            .instance()
            .remove(&DataKey::Loan(loan_id.clone()));
        user::update_profile(env, borrower, user_profile)?;
        return Err(Error::LoanDefaulted);
    }

    Ok(())
}





