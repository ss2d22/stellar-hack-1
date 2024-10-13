import { useEffect, useState } from "react";
import axios from "axios";
import { PasskeyKit, SACClient } from "passkey-kit";
import { Buffer } from "buffer";

const App = () => {
  const [keyId, setKeyId] = useState(localStorage.getItem("sp:keyId") || "");
  const [contractId, setContractId] = useState("");
  const [balance, setBalance] = useState("");
  const [signers, setSigners] = useState([]);
  const [loading, setLoading] = useState({});

  const passkeyClient = new PasskeyKit({
    rpcUrl: import.meta.env.VITE_PUBLIC_RPC_URL,
    networkPassphrase: import.meta.env.VITE_PUBLIC_NETWORK_PASSPHRASE,
    factoryContractId: import.meta.env.VITE_PUBLIC_FACTORY_CONTRACT_ID,
  });
  console.log("passkeyClient", passkeyClient);

  const native = new SACClient({
    rpcUrl: import.meta.env.VITE_PUBLIC_RPC_URL,
    networkPassphrase: import.meta.env.VITE_PUBLIC_NETWORK_PASSPHRASE,
  }).getSACClient(import.meta.env.VITE_PUBLIC_NATIVE_CONTRACT_ID);
  console.log("native", native);

  useEffect(() => {
    if (keyId && !contractId) {
      connectWallet(keyId);
    }
  }, [keyId, contractId]);

  const connectWallet = async (kid) => {
    try {
      console.log("Attempting to connect wallet...");
      const { contractId: cid } = await passkeyClient.connectWallet({
        keyId: kid,
      });
      console.log("Wallet connected successfully:", cid);
      setContractId(cid);
      await fetchBalance(cid);
      await fetchSigners(cid);
    } catch (err) {
      console.error("Error connecting wallet:", err);
      alert("Error connecting wallet: " + err.message);
    }
  };

  const fetchBalance = async (cid) => {
    try {
      setLoading((prev) => ({ ...prev, balance: true }));
      const { result } = await native.balance({ id: cid });
      setBalance(result.toString());
      setLoading((prev) => ({ ...prev, balance: false }));
    } catch (err) {
      console.error("Error fetching balance:", err);
      setLoading((prev) => ({ ...prev, balance: false }));
    }
  };

  const fetchSigners = async (cid) => {
    try {
      setLoading((prev) => ({ ...prev, signers: true }));
      const res = await axios.get(`/api/signers/${cid}`);
      setSigners(res.data);
      setLoading((prev) => ({ ...prev, signers: false }));
    } catch (err) {
      console.error("Error fetching signers:", err);
      setLoading((prev) => ({ ...prev, signers: false }));
    }
  };

  const onCreate = async () => {
    setLoading((prev) => ({ ...prev, create: true }));
    try {
      const wallet = await passkeyClient.createWallet(
        "Super Peach",
        "Super Peach"
      );
      const keyIdBase64 = wallet.keyId.toString("base64");
      localStorage.setItem("sp:keyId", keyIdBase64);
      setKeyId(keyIdBase64);
      setContractId(wallet.contractId);
    } catch (err) {
      console.error("Error creating wallet:", err);
      alert("Error creating wallet: " + err.message);
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  return (
    <div>
      <h1>Passkey Auth</h1>
      {contractId ? (
        <>
          <p>Contract ID: {contractId}</p>
          <p>Balance: {balance}</p>
          <button onClick={() => fetchBalance(contractId)}>
            Refresh Balance
          </button>
          <button onClick={() => fetchSigners(contractId)}>
            Refresh Signers
          </button>
          {signers.map((signer, index) => (
            <div key={index}>
              <p>Signer: {signer.key}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          <button onClick={onCreate}>Create Wallet</button>
        </>
      )}
    </div>
  );
};

export default App;
