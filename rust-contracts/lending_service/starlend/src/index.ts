import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CAVL2BSDT7WG6DS3CEMSJ4TBIAEG7FQ6UVPSKOPW5PWFQ2ZPIXQCF44W",
  }
} as const


export interface GlobalParams {
  base_interest_rate: u32;
  max_loan_amount: u32;
  max_missed_payments: u32;
  min_credit_score: u32;
  payment_period: u64;
}

export const Errors = {
  1: {message:"UserBanned"},

  2: {message:"InsufficientCreditScore"},

  3: {message:"LoanAmountTooHigh"},

  4: {message:"NoActiveLoan"},

  5: {message:"Unauthorized"},

  6: {message:"LoanDefaulted"},

  7: {message:"UserNotFound"},

  8: {message:"GlobalParamsNotSet"},

  9: {message:"ActiveLoanExists"},

  10: {message:"AdminNotSet"},

  11: {message:"AlreadyInitialized"},

  12: {message:"UserAlreadyRegistered"},

  13: {message:"LoanNotFound"},

  14: {message:"LoanAlreadyFunded"}
}

export interface LoanRequest {
  amount: u32;
  borrower: string;
  funded: boolean;
  id: Buffer;
  interest_rate: u32;
}


export interface Loan {
  amount: u32;
  borrower: string;
  due_date: u64;
  id: Buffer;
  interest_rate: u32;
  lender: string;
  payments_made: u32;
  total_payments: u32;
}


export interface UserProfile {
  active_loan_id: Option<Buffer>;
  credit_score: u32;
  current_loan: u32;
  is_banned: boolean;
  missed_payments: u32;
}

export type DataKey = {tag: "Admin", values: void} | {tag: "UserProfile", values: readonly [string]} | {tag: "LoanRequest", values: readonly [Buffer]} | {tag: "LoanRequestsList", values: void} | {tag: "Loan", values: readonly [Buffer]} | {tag: "GlobalParams", values: void};


export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin}: {admin: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a register_user transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  register_user: ({user}: {user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a request_loan transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  request_loan: ({borrower, amount}: {borrower: string, amount: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<Buffer>>>

  /**
   * Construct and simulate a list_loan_requests transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  list_loan_requests: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Array<Buffer>>>

  /**
   * Construct and simulate a get_loan_request transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_loan_request: ({loan_id}: {loan_id: Buffer}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<LoanRequest>>>

  /**
   * Construct and simulate a fund_loan transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  fund_loan: ({lender, loan_id}: {lender: string, loan_id: Buffer}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a make_payment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  make_payment: ({borrower}: {borrower: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a check_loan_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  check_loan_status: ({borrower}: {borrower: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_user_profile transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_user_profile: ({user}: {user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<UserProfile>>>

  /**
   * Construct and simulate a update_global_params transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_global_params: ({admin, new_params}: {admin: string, new_params: GlobalParams}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a ban_user transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  ban_user: ({admin, user}: {admin: string, user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAADEdsb2JhbFBhcmFtcwAAAAUAAAAAAAAAEmJhc2VfaW50ZXJlc3RfcmF0ZQAAAAAABAAAAAAAAAAPbWF4X2xvYW5fYW1vdW50AAAAAAQAAAAAAAAAE21heF9taXNzZWRfcGF5bWVudHMAAAAABAAAAAAAAAAQbWluX2NyZWRpdF9zY29yZQAAAAQAAAAAAAAADnBheW1lbnRfcGVyaW9kAAAAAAAG",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAADgAAAAAAAAAKVXNlckJhbm5lZAAAAAAAAQAAAAAAAAAXSW5zdWZmaWNpZW50Q3JlZGl0U2NvcmUAAAAAAgAAAAAAAAARTG9hbkFtb3VudFRvb0hpZ2gAAAAAAAADAAAAAAAAAAxOb0FjdGl2ZUxvYW4AAAAEAAAAAAAAAAxVbmF1dGhvcml6ZWQAAAAFAAAAAAAAAA1Mb2FuRGVmYXVsdGVkAAAAAAAABgAAAAAAAAAMVXNlck5vdEZvdW5kAAAABwAAAAAAAAASR2xvYmFsUGFyYW1zTm90U2V0AAAAAAAIAAAAAAAAABBBY3RpdmVMb2FuRXhpc3RzAAAACQAAAAAAAAALQWRtaW5Ob3RTZXQAAAAACgAAAAAAAAASQWxyZWFkeUluaXRpYWxpemVkAAAAAAALAAAAAAAAABVVc2VyQWxyZWFkeVJlZ2lzdGVyZWQAAAAAAAAMAAAAAAAAAAxMb2FuTm90Rm91bmQAAAANAAAAAAAAABFMb2FuQWxyZWFkeUZ1bmRlZAAAAAAAAA4=",
        "AAAAAQAAAAAAAAAAAAAAC0xvYW5SZXF1ZXN0AAAAAAUAAAAAAAAABmFtb3VudAAAAAAABAAAAAAAAAAIYm9ycm93ZXIAAAATAAAAAAAAAAZmdW5kZWQAAAAAAAEAAAAAAAAAAmlkAAAAAAPuAAAAIAAAAAAAAAANaW50ZXJlc3RfcmF0ZQAAAAAAAAQ=",
        "AAAAAQAAAAAAAAAAAAAABExvYW4AAAAIAAAAAAAAAAZhbW91bnQAAAAAAAQAAAAAAAAACGJvcnJvd2VyAAAAEwAAAAAAAAAIZHVlX2RhdGUAAAAGAAAAAAAAAAJpZAAAAAAD7gAAACAAAAAAAAAADWludGVyZXN0X3JhdGUAAAAAAAAEAAAAAAAAAAZsZW5kZXIAAAAAABMAAAAAAAAADXBheW1lbnRzX21hZGUAAAAAAAAEAAAAAAAAAA50b3RhbF9wYXltZW50cwAAAAAABA==",
        "AAAAAQAAAAAAAAAAAAAAC1VzZXJQcm9maWxlAAAAAAUAAAAAAAAADmFjdGl2ZV9sb2FuX2lkAAAAAAPoAAAD7gAAACAAAAAAAAAADGNyZWRpdF9zY29yZQAAAAQAAAAAAAAADGN1cnJlbnRfbG9hbgAAAAQAAAAAAAAACWlzX2Jhbm5lZAAAAAAAAAEAAAAAAAAAD21pc3NlZF9wYXltZW50cwAAAAAE",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABgAAAAAAAAAAAAAABUFkbWluAAAAAAAAAQAAAAAAAAALVXNlclByb2ZpbGUAAAAAAQAAABMAAAABAAAAAAAAAAtMb2FuUmVxdWVzdAAAAAABAAAD7gAAACAAAAAAAAAAAAAAABBMb2FuUmVxdWVzdHNMaXN0AAAAAQAAAAAAAAAETG9hbgAAAAEAAAPuAAAAIAAAAAAAAAAAAAAADEdsb2JhbFBhcmFtcw==",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAANcmVnaXN0ZXJfdXNlcgAAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAMcmVxdWVzdF9sb2FuAAAAAgAAAAAAAAAIYm9ycm93ZXIAAAATAAAAAAAAAAZhbW91bnQAAAAAAAQAAAABAAAD6QAAA+4AAAAgAAAAAw==",
        "AAAAAAAAAAAAAAASbGlzdF9sb2FuX3JlcXVlc3RzAAAAAAAAAAAAAQAAA+oAAAPuAAAAIA==",
        "AAAAAAAAAAAAAAAQZ2V0X2xvYW5fcmVxdWVzdAAAAAEAAAAAAAAAB2xvYW5faWQAAAAD7gAAACAAAAABAAAD6QAAB9AAAAALTG9hblJlcXVlc3QAAAAAAw==",
        "AAAAAAAAAAAAAAAJZnVuZF9sb2FuAAAAAAAAAgAAAAAAAAAGbGVuZGVyAAAAAAATAAAAAAAAAAdsb2FuX2lkAAAAA+4AAAAgAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAMbWFrZV9wYXltZW50AAAAAQAAAAAAAAAIYm9ycm93ZXIAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAARY2hlY2tfbG9hbl9zdGF0dXMAAAAAAAABAAAAAAAAAAhib3Jyb3dlcgAAABMAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAAAAAAAQZ2V0X3VzZXJfcHJvZmlsZQAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAfQAAAAC1VzZXJQcm9maWxlAAAAAAM=",
        "AAAAAAAAAAAAAAAUdXBkYXRlX2dsb2JhbF9wYXJhbXMAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAACm5ld19wYXJhbXMAAAAAB9AAAAAMR2xvYmFsUGFyYW1zAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAIYmFuX3VzZXIAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        register_user: this.txFromJSON<Result<void>>,
        request_loan: this.txFromJSON<Result<Buffer>>,
        list_loan_requests: this.txFromJSON<Array<Buffer>>,
        get_loan_request: this.txFromJSON<Result<LoanRequest>>,
        fund_loan: this.txFromJSON<Result<void>>,
        make_payment: this.txFromJSON<Result<void>>,
        check_loan_status: this.txFromJSON<Result<void>>,
        get_user_profile: this.txFromJSON<Result<UserProfile>>,
        update_global_params: this.txFromJSON<Result<void>>,
        ban_user: this.txFromJSON<Result<void>>
  }
}