import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerationImage from "/src/assets/reg-page.png";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

import "./Register.css";
import LoadingButton from "../../components/Loading-Buttons";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const URL = `${API}/api/auth/register`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(URL, options);
      const res_Data = await response.json();
      console.log("data from register response:", res_Data);

      if (response.ok) {
        storeTokenInLS(res_Data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration Successfull");
        navigate("/");
      } else {
        toast.error(
          res_Data.extraDetails ? res_Data.extraDetails : res_Data.message
        );
      }
      console.log(response);
    } catch (error) {
      console.log("register", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main>
        <section className="section-registration">
          <div className="registration-container">
            <div className="registration-image">
              <img src={registerationImage} alt="registration image" />
            </div>
            <div className="registration-form">
              <h1 className="main-heading">
                Ready to Start Your <span className="highlight">Success </span>{" "}
                Story?{" "}
              </h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="enter name"
                    required
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="enter email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="enter phone number"
                    required
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="enter password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <LoadingButton isLoading={isSubmitting} type="submit">
                  Submit
                </LoadingButton>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Register;
