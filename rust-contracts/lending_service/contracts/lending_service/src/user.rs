use soroban_sdk::{contracttype, Address, Env};
use crate::{DataKey, Error};
use soroban_sdk::BytesN;

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct UserProfile {
    pub credit_score: u32,
    pub current_loan: u32,
    pub missed_payments: u32,
    pub is_banned: bool,
    pub active_loan_id: Option<BytesN<32>>,
}

pub fn register(env: Env, user: Address) -> Result<(), Error> {
    user.require_auth();

    if env
        .storage()
        .instance()
        .has(&DataKey::UserProfile(user.clone()))
    {
        return Err(Error::UserAlreadyRegistered);
    }

    let user_profile = UserProfile {
        credit_score: 500,
        current_loan: 0,
        missed_payments: 0,
        is_banned: false,
        active_loan_id: None,
    };
    env.storage()
        .instance()
        .set(&DataKey::UserProfile(user), &user_profile);
    Ok(())
}

pub fn get_profile(env: Env, user: Address) -> Result<UserProfile, Error> {
    env.storage()
        .instance()
        .get(&DataKey::UserProfile(user))
        .ok_or(Error::UserNotFound)
}

pub fn update_profile(
    env: Env,
    user: Address,
    profile: UserProfile,
) -> Result<(), Error> {
    env.storage()
        .instance()
        .set(&DataKey::UserProfile(user), &profile);
    Ok(())
}
