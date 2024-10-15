import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col max-w-screen-sm mx-auto my-24 gap-5">
      <h1 className="text-center text-3xl mt-16 mb-12">translate.</h1>
      <label htmlFor="email" className="font-bold">
        Email
      </label>
      <input type="text" id="email" className="outlined-input" />
      <label htmlFor="password" className="font-bold">
        Password
      </label>
      <input type="password" id="password" className="outlined-input" />
      <button className="primary-button my-4">Login</button>
      <div className="text-right">
        Forgot your password?
        <span className="font-bold"> Click to reset</span>
      </div>
      <hr className="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="text-center">
        Not a member yet?
        <span className="font-bold"> Click to signup</span>
      </div>
    </div>
  );
};

export default LoginPage;
