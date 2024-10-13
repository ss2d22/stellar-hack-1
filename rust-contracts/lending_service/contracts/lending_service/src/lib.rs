#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, Address, Env,
};

mod user;
mod loan;
mod admin;
mod errors;

use user::UserProfile;
use admin::GlobalParams;
use errors::Error;

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    UserProfile(Address),
    LoanStatus(Address),
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

    pub fn request_loan(env: Env, user: Address, amount: u32) -> Result<(), Error> {
        loan::request(env, user, amount)
    }

    pub fn make_payment(env: Env, user: Address) -> Result<(), Error> {
        loan::make_payment(env, user)
    }

    pub fn check_loan_status(env: Env, user: Address) -> Result<(), Error> {
        loan::check_status(env, user)
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
