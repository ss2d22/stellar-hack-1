"use client";
import { Button } from "@/components/ui/button"; // Adjust the import path based on your project structure
import { SettingsIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

/*
function a({ href, children }: { href: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <a
      href={href}
      className={`text-md mt-5 mb-3 ${
        isActive
          ? "text-[#F3F3F3] mt-5 border-b-2 border-[#F3F3F3]"
          : "text-[#B9B9B9] mt-5 hover:text-[#F3F3F3] transition-colors"
      }`}
    >
      {children}
    </a>
  );
}
  */

export function Navbar() {
  return (
    <nav className="bg-[#0B0406] shadow-md">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-xl font-bold text-[#E7E7E7]">
                <img
                  src="/assets/starLend.png" // Ensure the path is correct for your public assets
                  alt="Logo"
                  width={64}
                  height={64}
                  className="mt-1"
                />
              </a>
            </div>
            <div className="hidden ml-10 sm:flex sm:space-x-10">
              <a
                className="text-[#B9B9B9] mt-5 hover:text-[#F3F3F3] transition-colors"
                href="/"
              >
                Home
              </a>
              <a
                className="text-[#B9B9B9] mt-5 hover:text-[#F3F3F3] transition-colors"
                href="/dashboard"
              >
                Dashboard
              </a>
              <a
                className="text-[#B9B9B9] mt-5 hover:text-[#F3F3F3] transition-colors"
                href="/offers"
              >
                Offers
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <div className="rounded-3xl p-px bg-gradient-to-b from-[#395BBF] to-[#D96277] box-border w-28 h-8 max-w-md ">
              <div className="rounded-3xl mt-px bg-[#0B0406] w-26 h-7 max-w-md pt-px">
                <Link
                  className="text-[#F3F3F3] hover:text-[#395BBF] transition-colors"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="#F3F3F3" // This is the inner color of the SVG
                viewBox="0 0 24 24"
                stroke="#F3F3F3" // This will change the stroke (outline) color
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
