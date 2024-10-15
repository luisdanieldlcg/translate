import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between max-w-screen-xl mt-3 mx-auto px-4">
      <div>
        <a href="/" className="text-lg">
          Translate.
        </a>
      </div>
      <div>
        <button className="outlined-button mx-5">
          <a href="/login">Log In</a>
        </button>
        <button className="primary-button">
          <a href="/signup">Sign Up</a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
