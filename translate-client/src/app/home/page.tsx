"use client";

import { useHomeStore } from "@/store/home";
import React, { useEffect } from "react";

const Home = () => {
  const setNewChatScreen = useHomeStore((state) => state.setNewChatScreen);

  useEffect(() => {
    setNewChatScreen(true);
  }, []);
  return (
    <h1 className="font-bold text-4xl">What do you want to translate? </h1>
  );
};

export default Home;
