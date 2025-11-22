import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, user } = useAuth();

  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">Ash</NavLink>
        </div>

        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/about">About</NavLink>
          </li>

          <li>
            <NavLink to="/services">Services</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>

          {/*Show Admin link only if logged in & isAdmin */}
          {isLoggedIn && user?.isAdmin && (
            <li>
              <NavLink to="/admin/users">Admin</NavLink>
            </li>
          )}

          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
