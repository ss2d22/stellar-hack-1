import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { PasskeyServer } from "passkey-kit";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const passkeyServer = new PasskeyServer({
  rpcUrl: process.env.PUBLIC_RPC_URL,
  launchtubeUrl: process.env.PUBLIC_LAUNCHTUBE_URL,
  launchtubeJwt: process.env.PRIVATE_LAUNCHTUBE_JWT,
  mercuryUrl: process.env.PUBLIC_MERCURY_URL,
  mercuryJwt: process.env.PRIVATE_MERCURY_JWT,
});

/**
 * Handles user registration.
 * Users intially have 0 balance in their account.
 * Registration timestamp is created.
 */
app.post("/api/register", async (req, res) => {
  try {

  } catch (error) {

  }
});

/**
 * Handles user login.
 */
app.post("/api/login", async (req, res) => {
  try {

  } catch (error) {

  }
});

/**
 * Queries account balance.
 */
app.get("/api/profile", async (req, res) => {
  try {

  } catch (error) {

  }
});

/**
 * 
 */
app.post("/api/loans/lend", async (req, res) => {
  try {

  } catch (error) {

  }
});

/**
 * 
 */
app.post("/api/loans/request", async (req, res) => {
  try {

  } catch (error) {

  }
});

/**
 * 
 */
app.get("/api/loans/:loanId/status", async (req, res) => {
  try {

  } catch (error) {

  }
});

/**
 * 
 */
app.post("/api/loans/:loanId/repay", async (req, res) => {
  try {

  } catch (error) {

  }
});

/**
 * 
 */
app.post("/api/exchange/crypto-to-fiat", async (req, res) => {
  try {

  } catch (error) {

  }
});


/**
 * 
 */
app.post("/api/exchange/fiat-to-crypto", async (req, res) => {
  try {

  } catch (error) {

  }
});


/**
 * 
 */
app.get("/api/exchange/rates", async (req, res) => {
  try {

  } catch (error) {

  }
});

/*
 * The client (user) generates a transaction on the frontend (e.g., using Soroban SDK).
 * This transaction (in XDR format) is sent to the backend, where the passkey server signs it with the user's private key.
 * The signed transaction is sent to the blockchain (Stellar network) for execution. 
 */
app.post("/api/send", async (req, res) => {
  try {
    const xdr = req.body.xdr;
    const response = await passkeyServer.send(xdr);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

/**
 * Retrieves the list of signers associated with the given contract ID.
 * Sends the data back to the client in JSON format.
 */
app.get("/api/signers/:contractId", async (req, res) => {
  try {
    const signers = await passkeyServer.getSigners(req.params.contractId);
    res.json(signers);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});