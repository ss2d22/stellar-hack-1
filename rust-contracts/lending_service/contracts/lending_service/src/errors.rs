use soroban_sdk::{contracterror};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    UserBanned = 1,
    InsufficientCreditScore = 2,
    LoanAmountTooHigh = 3,
    NoActiveLoan = 4,
    Unauthorized = 5,
    LoanDefaulted = 6,
    UserNotFound = 7,
    GlobalParamsNotSet = 8,
    ActiveLoanExists = 9,
    AdminNotSet = 10,
    AlreadyInitialized = 11,
}
