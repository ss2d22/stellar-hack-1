"use client";
import { Link } from "react-router-dom";
import backgroundImage from "/backg.jpg";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover", // To make the image cover the whole div
          backgroundPosition: "center", // Center the image
          height: "100vh", // Full height of the viewport
          width: "100vw", // Full width of the viewport
        }}
      >
        <div
          className="flex flex-col justify-center items-center min-h-screen space-y-10"
          style={{ marginTop: "-30px" }}
        >
          <text className="text-8xl font-bold text-[#F3F3F3] ">Welcome...</text>
          <text className="text-3xl text-[#E7E7E7] ">
            Start profitable lending and accessible borrowing from today
          </text>
          <div className="flex flex-row space-x-10">
            <div className="items-center justify-center rounded-3xl p-px bg-gradient-to-b from-[#395BBF] to-[#D96277] box-border w-36 h-12 max-w-md ">
              <div className="rounded-3xl mt-px bg-[#0B0406] w-35 h-11 max-w-md pt-2">
                <Link
                  className="text-[#F3F3F3] hover:text-[#395BBF] transition-colors"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>
            <Button type="submit" className="w-1/2 bg-transparent mt-1 ">
              Learn more
              <img
                src="/assets/arrow.png" // Ensure the path is correct for your public assets
                alt="Logo"
                width={16}
                height={16}
                className="ml-2"
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
