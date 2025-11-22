import React, { useState } from "react";
import loginImage from "/src/assets/login-page.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import LoadingButton from "../../components/Loading-Buttons";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const URL = `${API}/api/auth/login`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(URL, options);
      const res_Data = await response.json();
      console.log("response data from login ", res_Data);

      if (response.ok) {
        storeTokenInLS(res_Data.token);
        setUser({ email: "", password: "" });
        toast.success("Login Successfull");
        navigate("/");
      } else {
        toast.error(
          res_Data.extraDetails ? res_Data.extraDetails : res_Data.message
        );
      }
    } catch (error) {
      console.log("login", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main>
        <section className="section-login">
          <div className="login-container">
            <div className="login-image">
              <img src={loginImage} alt="login image" />
            </div>
            <div className="login-form">
              <h1 className="main-heading">
                Welcome to <span className="highlight">DevAsh</span>{" "}
              </h1>
              <form onSubmit={handleSubmit}>
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

export default Login;
