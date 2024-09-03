"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session } = useSession();
  console.log("1111", session);
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="hidden lg:inline-flex">
          <Image
            src="/Instagram_logo_black.webp"
            width={96}
            height={96}
            alt="instagram logo"
          />
        </Link>

        <Link href="/" className="lg:hidden">
          <Image
            src="/800px-Instagram_logo_2016.webp"
            width={40}
            height={40}
            alt="instagram logo"
          />
        </Link>

        <input
          type="text"
          placeholder="search here.."
          className=" bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-180px]:"
        />
        {session ? (
          <div className=" flex pl-2">
            <img
              className="h-10 w-10 rounded-full cursor-pointer"
              src={session?.user?.image}
              alt={session?.user?.name}
              height={24}
              width={24}
              onClick={signOut}
            />
            <span className="width-80 pl-2">{session?.user?.name}</span>
          </div>
        ) : (
          <button
            onClick={signIn}
            className="text-sm font-semibold text-blue-500 w-90px"
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
