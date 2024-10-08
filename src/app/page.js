"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Feed from "@/components/Feed";

const Home = ({ props }) => {
  const { data: session } = useSession();
  // console.log('2222',session,props)
  return (
    <>
      <h1 className="text-red-600">Home</h1>
      <h2> {session?.user?.name ? "logged in" : "logged out"} </h2>
      <Feed />
    </>
  );
};

export default Home;
