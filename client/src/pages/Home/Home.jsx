import React from "react";
import "./Home.css";
import HeroImage from "/src/assets/home-page1.png";
import HeroImage2 from "/src/assets/home-page2.png";
import Analytics from "../../components/Analytics";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleConnectClick = () => {
    navigate("/contact");
  };
  const handleLearnMoreClick = () => {
    navigate("/about");
  };
  return (
    <div className="homepage-container">
      <main>
        <section className="hero-section">
          <div className="hero-content" data-aos="fade-right">
            <p className="welcome-note">
              Welcome{" "}
              {user?.username ? (
                <span className="username-highlight">{user.username}</span>
              ) : (
                ""
              )}{" "}
              to our website..
            </p>
            <h1>
              We Build Digital <span className="highlight">Experiences</span>{" "}
              That Matter.
            </h1>
            <p>
              At <strong>DevAsh</strong>, we are passionate about crafting innovative solutions
              that drive growth. Our team of experts is dedicated to turning
              your vision into reality with cutting-edge technology and creative
              design. Let's build something amazing together.
            </p>
            <p>➤➤ From concept to launch — we handle it all.</p>
            <p>➤➤Delivering quality with speed, clarity, and precision.</p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleConnectClick}
              >
                Connect Now
              </button>
              <button
                className="btn btn-outline"
                type="button"
                onClick={handleLearnMoreClick}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image" data-aos="zoom-in-up">
            <img src={HeroImage} alt="Team collaborating on a project" />
          </div>
        </section>
        <Analytics />
        <section className="hero-section">
          <div className="hero-image">
            <img src={HeroImage2} alt="Team collaborating on a project" data-aos="zoom-in-up"/>
          </div>
          <div className="hero-content" data-aos="fade-left">
            <p>We are here to help you</p>
            <h1>
              Get <span className="highlight">Started</span> Today
            </h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let's discuss how DevAsh can help your business thrive in the
              digital age.
            </p>
            <p>💥Start your digital journey with us.</p>
            <p>💥Your trusted partner for digital transformation.</p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleConnectClick}
              >
                Connect Now
              </button>
              <button
                className="btn btn-outline"
                type="button"
                onClick={handleLearnMoreClick}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
