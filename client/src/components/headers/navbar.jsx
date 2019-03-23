import React from "react";
import { Link } from "react-router-dom";
import Search from "./search";

const Navbar = props => {
  return (
    <header>
      <nav className="container navbar fixed-top">
        <div className="brand">
          <Link to="/" className="brand-name">
            SendIT<sup className="size-12">&trade;</sup>
          </Link>
        </div>
        <Search />
        <div className="links">
          <Link to="/signin" className="nav-link">
            Sign in
          </Link>
          <Link to="/signup" className="nav-link">
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
