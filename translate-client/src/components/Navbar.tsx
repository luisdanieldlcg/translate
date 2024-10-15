import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between max-w-screen-xl mt-3 mx-auto px-4">
      <div>
        <Link href="/" className="text-xl">
          Translate.
        </Link>
      </div>
      <div>
        <Link href="/login">
          <button className="outlined-button mx-5">Log In</button>
        </Link>
        <Link href="/signup">
          <button className="primary-button">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
