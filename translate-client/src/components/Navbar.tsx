import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between items-center p-4">
        <a href="/">Translate.</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </nav>
  );
};

export default Navbar;
