"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { PasskeyKit, PasskeyServer, SACClient } from "passkey-kit";
import { Buffer } from "buffer";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SquareUser, Key } from "lucide-react";
import "../App.css";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

const Login = () => {
  const [keyId, setKeyId] = useState(localStorage.getItem("sp:keyId") || "");
  const [contractId, setContractId] = useState("");
  const [loading, setLoading] = useState({});
/*   const [balance, setBalance] = useState("");
  const [signers, setSigners] = useState([]);
  const [loading, setLoading] = useState({}); */

  const passkeyClient = new PasskeyKit({
    rpcUrl: import.meta.env.VITE_PUBLIC_RPC_URL,
    networkPassphrase: import.meta.env.VITE_PUBLIC_NETWORK_PASSPHRASE,
    factoryContractId: import.meta.env.VITE_PUBLIC_FACTORY_CONTRACT_ID,
  });
  console.log("passkeyClient", passkeyClient);

  const passkeyServer = new PasskeyServer({
    rpcUrl: import.meta.env.VITE_PUBLIC_RPC_URL,
    launchtubeUrl: import.meta.env.VITE_LAUNCHTUBE_URL,
    launchtubeJwt: import.meta.env.VITE_PRIVATE_LAUNCHTUBE_JWT,
    mercuryUrl: import.meta.env.VITE_PUBLIC_MERCURY_URL,
    mercuryJwt: import.meta.env.VITE_PRIVATE_MERCURY_JWT,
});

  const native = new SACClient({
    rpcUrl: import.meta.env.VITE_PUBLIC_RPC_URL,
    networkPassphrase: import.meta.env.VITE_PUBLIC_NETWORK_PASSPHRASE,
  }).getSACClient(import.meta.env.VITE_PUBLIC_NATIVE_CONTRACT_ID);
  console.log("native", native);

/*   useEffect(() => {
    if (keyId && !contractId) {
      connectWallet(keyId);
    }
  }, [keyId, contractId]); */

  const connectWallet = async (kid) => {
    try {
      console.log("Attempting to connect wallet...");
      const { contractId: cid } = await passkeyClient.connectWallet({
        keyId: kid,
        getContractId: () => passkeyServer.getContractId({keyId}),
      });
      console.log("Wallet connected successfully:", cid);
      setContractId(cid);
      //await fetchBalance(cid);
      //await fetchSigners(cid);
    } catch (err) {
      console.error("Error connecting wallet:", err);
      alert("Error connecting wallet: " + err.message);
    }
  };

/*   const fetchBalance = async (cid) => {
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
  }; */

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
      console.log("done setting contract ID");
    } catch (err) {
      console.error("Error creating wallet:", err);
      alert("Error creating wallet: " + err.message);
    } finally {
      setLoading((prev) => ({ ...prev, create: false }));
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#0B0406] -mt-20">
        <div className="rounded-xl p-px bg-gradient-to-b from-[#395BBF] to-[#D96277] box-border w-full max-w-md ">
          <Card className="w-full px-10 max-w-md bg-[#0B0406] border-transparent">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-[#F3F3F3]">
                Welcome To Starlend!
              </CardTitle>
              <CardDescription className="text-center">
                Sign-in/ sign-up using passkey
              </CardDescription>
            </CardHeader>
              <CardContent className="space-y-4">
              <Button onClick={connectWallet} className="w-full">
                  Sign In
                </Button>
                <Button onClick={onCreate} className="w-full">
                  Sign Up
                </Button>
              </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Login;


