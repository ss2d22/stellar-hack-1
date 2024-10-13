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

app.post("/api/send", async (req, res) => {
  try {
    const xdr = req.body.xdr;
    const response = await passkeyServer.send(xdr);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

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
