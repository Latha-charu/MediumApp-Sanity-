import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex space-x-5 items-center">
        <Link href="/">
          <img
            src="https://links.papareact.com/yvf"
            alt=""
            className="w-44 object-contain cursor-pointer"
          />
        </Link>
        <div className="hidden space-x-5 items-center md:inline-flex">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="bg-green-600 py-1 text-white px-4 rounded-full">
            Follow
          </h3>
        </div>
      </div>

      <div className="text-green-600 flex items-center space-x-5">
        <h3>Sign In</h3>
        <h3 className="border border-green-600 px-4 py-1 rounded-full">
          Get Started
        </h3>
      </div>
    </header>
  );
};
