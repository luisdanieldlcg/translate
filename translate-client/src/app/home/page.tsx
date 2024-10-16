import React from "react";
import { FiSidebar, FiUser } from "react-icons/fi";

const Home = () => {
  return (
    <div className="max-w-screen-2xl mx-auto text-center flex flex-col h-screen">
      <nav className="flex items-center justify-between my-4">
        <FiSidebar className="text-3xl" />
        <FiUser className="text-3xl" />
      </nav>
      <div className="m-auto flex flex-col gap-12">
        <h1 className="font-bold text-4xl">What do you want to translate? </h1>
        <textarea
          className="outlined-input"
          // hint
          placeholder="Translate anything..."
          cols={40}
          rows={7}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
