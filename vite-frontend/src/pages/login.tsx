"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

function Login() {
  const [account, setAccount] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!account || !privateKey) {
      setError("Please fill in all fields");
      return;
    }

    // Here you would typically call your authentication API
    console.log("Login attempt with:", { account, privateKey });
    // For demo purposes, let's simulate a failed login
    setError("Invalid account number or privateKey");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#0B0406] -mt-20">
        <div className="rounded-xl p-px bg-gradient-to-b from-[#395BBF] to-[#D96277] box-border w-full max-w-md ">
          <Card className="w-full px-10 max-w-md bg-[#0B0406] border-transparent">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-[#F3F3F3]">
                Login
              </CardTitle>
              <CardDescription className="text-center">
                Enter your account and private key to login
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#F3F3F3] text-md" htmlFor="account">
                    Account
                  </Label>
                  <div className="relative">
                    <SquareUser
                      className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={22}
                    />
                    <Input
                      id="account"
                      type="account"
                      placeholder="Enter your Account"
                      className="pl-10 text-[#F3F3F3]"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    className="text-[#F3F3F3] text-md"
                    htmlFor="privateKey"
                  >
                    Private Key
                  </Label>
                  <div className="relative">
                    <Key
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      id="privateKey"
                      type="privateKey"
                      placeholder="Enter your Private Key"
                      className="pl-10 text-[#F3F3F3]"
                      value={privateKey}
                      onChange={(e) => setPrivateKey(e.target.value)}
                    />
                  </div>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className=" flex flex-col space-y-4">
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <Button type="submit" className="w-full">
                  Use FaceID to Sign In
                </Button>
                <Label className="text-center text-[#F3F3F3]">
                  Not Register? Create Account
                </Label>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Login;
