use soroban_sdk::{contracttype, Address, Env};
use crate::{DataKey, Error, admin, user};

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct LoanStatus {
    pub amount: u32,
    pub due_date: u64,
    pub payments_made: u32,
    pub total_payments: u32,
}

pub fn request(env: Env, user: Address, amount: u32) -> Result<(), Error> {
    user.require_auth();

    let mut user_profile = user::get_profile(env.clone(), user.clone())?;

    if user_profile.is_banned {
        return Err(Error::UserBanned);
    }

    if user_profile.current_loan > 0 {
        return Err(Error::ActiveLoanExists);
    }

    let global_params = admin::get_global_params(env.clone())?;

    if user_profile.credit_score < global_params.min_credit_score {
        return Err(Error::InsufficientCreditScore);
    }

    let max_loan = calculate_max_loan(user_profile.credit_score, global_params.max_loan_amount);

    if amount > max_loan {
        return Err(Error::LoanAmountTooHigh);
    }

    let loan_status = LoanStatus {
        amount,
        due_date: env.ledger().timestamp() + global_params.payment_period,
        payments_made: 0,
        total_payments: 12,
    };
    env.storage().instance().set(&DataKey::LoanStatus(user.clone()), &loan_status);

    user_profile.current_loan = amount;
    user::update_profile(env, user, user_profile)?;

    Ok(())
}

pub fn make_payment(env: Env, user: Address) -> Result<(), Error> {
    user.require_auth();

    let mut user_profile = user::get_profile(env.clone(), user.clone())?;
    let mut loan_status: LoanStatus = env.storage().instance().get(&DataKey::LoanStatus(user.clone()))
        .ok_or(Error::NoActiveLoan)?;

    if loan_status.payments_made >= loan_status.total_payments {
        return Err(Error::NoActiveLoan);
    }

    let current_time = env.ledger().timestamp();
    if current_time <= loan_status.due_date {
        user_profile.credit_score += 5;
    } else {
        user_profile.credit_score = user_profile.credit_score.saturating_sub(10);
        user_profile.missed_payments += 1;
    }

    loan_status.payments_made += 1;
    loan_status.due_date += 2592000;

    if loan_status.payments_made == loan_status.total_payments {
        user_profile.current_loan = 0;
        user_profile.missed_payments = 0;
        env.storage().instance().remove(&DataKey::LoanStatus(user.clone()));
    } else {
        env.storage().instance().set(&DataKey::LoanStatus(user.clone()), &loan_status);
    }

    user::update_profile(env, user, user_profile)?;

    Ok(())
}

pub fn check_status(env: Env, user: Address) -> Result<(), Error> {
    let global_params = admin::get_global_params(env.clone())?;
    let mut user_profile = user::get_profile(env.clone(), user.clone())?;
    let loan_status: LoanStatus = env.storage().instance().get(&DataKey::LoanStatus(user.clone()))
        .ok_or(Error::NoActiveLoan)?;

    let current_time = env.ledger().timestamp();
    let payments_overdue = (current_time - loan_status.due_date) / global_params.payment_period;

    if payments_overdue as u32 + user_profile.missed_payments > global_params.max_missed_payments {
        user_profile.is_banned = true;
        user_profile.credit_score = user_profile.credit_score.saturating_sub(100);
        env.storage().instance().remove(&DataKey::LoanStatus(user.clone()));
        user::update_profile(env, user, user_profile)?;
        return Err(Error::LoanDefaulted);
    }

    Ok(())
}

fn calculate_max_loan(credit_score: u32, max_loan_amount: u32) -> u32 {
    (credit_score as u64 * max_loan_amount as u64 / 1000) as u32
}
