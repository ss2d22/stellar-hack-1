use soroban_sdk::{contracttype, Address, Env};
use crate::{DataKey, Error};

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct GlobalParams {
    pub base_interest_rate: u32,
    pub min_credit_score: u32,
    pub max_loan_amount: u32,
    pub payment_period: u64,
    pub max_missed_payments: u32,
}

pub fn initialize(env: Env, admin: Address) -> Result<(), Error> {
    if env.storage().instance().has(&DataKey::Admin) {
        return Err(Error::AlreadyInitialized);
    }
    let global_params = GlobalParams {
        base_interest_rate: 500,
        min_credit_score: 500,
        max_loan_amount: 10000,
        payment_period: 2592000, 
        max_missed_payments: 3,
    };
    env.storage()
        .instance()
        .set(&DataKey::GlobalParams, &global_params);
    env.storage().instance().set(&DataKey::Admin, &admin);
    Ok(())
}

pub fn update_params(env: Env, admin: Address, new_params: GlobalParams) -> Result<(), Error> {
    admin.require_auth();
    let stored_admin: Address = env
        .storage()
        .instance()
        .get(&DataKey::Admin)
        .ok_or(Error::AdminNotSet)?;
    if admin != stored_admin {
        return Err(Error::Unauthorized);
    }
    env.storage()
        .instance()
        .set(&DataKey::GlobalParams, &new_params);
    Ok(())
}

pub fn ban_user(env: Env, admin: Address, user: Address) -> Result<(), Error> {
    admin.require_auth();
    let stored_admin: Address = env
        .storage()
        .instance()
        .get(&DataKey::Admin)
        .ok_or(Error::AdminNotSet)?;
    if admin != stored_admin {
        return Err(Error::Unauthorized);
    }
    let mut user_profile = crate::user::get_profile(env.clone(), user.clone())?;
    user_profile.is_banned = true;
    crate::user::update_profile(env, user, user_profile)?;
    Ok(())
}

pub fn get_global_params(env: Env) -> Result<GlobalParams, Error> {
    env.storage()
        .instance()
        .get(&DataKey::GlobalParams)
        .ok_or(Error::GlobalParamsNotSet)
}
