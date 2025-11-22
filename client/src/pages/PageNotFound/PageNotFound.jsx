import React from "react";
import { NavLink } from "react-router-dom";
import errorImage from "/src/assets/error-page.png";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <main>
      <section className="section-error">
        <div className="error-content">
          <h1>
            Page Not <span className="highlight">Found</span>
          </h1>
          <img
            src={errorImage}
            alt="Error page illustration"
            className="error-image"
          />
          <p>
            Oops! The page you're looking for doesn’t exist. If you think
            something is wrong, feel free to report the problem.
          </p>
        </div>
        <div className="error-page-btns">
          <NavLink to="/" className="btn btn-outline">
            Return Home
          </NavLink>
          <NavLink to="/contact" className="btn btn-outline">
            Report Issue
          </NavLink>
        </div>
      </section>
    </main>
  );
}

export default PageNotFound;
