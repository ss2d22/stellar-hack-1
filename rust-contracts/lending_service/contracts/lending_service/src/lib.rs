#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, BytesN, Env, Vec};

mod admin;
mod errors;
mod loan;
mod user;

use admin::GlobalParams;
use errors::Error;
use user::UserProfile;

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    UserProfile(Address),
    LoanRequest(BytesN<32>),
    LoanRequestsList,
    Loan(BytesN<32>),
    GlobalParams,
}

#[contract]
pub struct LendingService;

#[contractimpl]
impl LendingService {
    pub fn initialize(env: Env, admin: Address) -> Result<(), Error> {
        admin::initialize(env, admin)
    }

    pub fn register_user(env: Env, user: Address) -> Result<(), Error> {
        user::register(env, user)
    }

    pub fn request_loan(env: Env, borrower: Address, amount: u32) -> Result<BytesN<32>, Error> {
        loan::request_loan(env, borrower, amount)
    }

    pub fn list_loan_requests(env: Env) -> Vec<BytesN<32>> {
        loan::list_loan_requests(env)
    }

    pub fn get_loan_request(env: Env, loan_id: BytesN<32>) -> Result<loan::LoanRequest, Error> {
        loan::get_loan_request(env, loan_id)
    }

    pub fn fund_loan(env: Env, lender: Address, loan_id: BytesN<32>) -> Result<(), Error> {
        loan::fund_loan(env, lender, loan_id)
    }

    pub fn make_payment(env: Env, borrower: Address) -> Result<(), Error> {
        loan::make_payment(env, borrower)
    }

    pub fn check_loan_status(env: Env, borrower: Address) -> Result<(), Error> {
        loan::check_status(env, borrower)
    }

    pub fn get_user_profile(env: Env, user: Address) -> Result<UserProfile, Error> {
        user::get_profile(env, user)
    }

    pub fn update_global_params(
        env: Env,
        admin: Address,
        new_params: GlobalParams,
    ) -> Result<(), Error> {
        admin::update_params(env, admin, new_params)
    }

    pub fn ban_user(env: Env, admin: Address, user: Address) -> Result<(), Error> {
        admin::ban_user(env, admin, user)
    }
}

