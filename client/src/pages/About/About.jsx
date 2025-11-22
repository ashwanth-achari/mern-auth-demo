import React from "react";
import "./About.css";
import aboutPageImage from "/src/assets/about-page.png";
import Analytics from "../../components/Analytics";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const handleConnectClick = () => {
    navigate("/contact");
  };
  const handleServiceClick = () => {
    navigate("/services");
  };

  return (
    <main>
      <section className="about-section">
        <div className="about-content" data-aos="fade-down">
          <p>We are best in the World !</p>
          <h1>
            Why <span className="highlight">Choose</span> Us?
          </h1>
          <p>
            At <strong>DevAsh</strong>, innovation is at the heart of everything
            we do. We're a team of passionate creators, developers, and
            strategists driven by a single goal - to build digital experiences
            that make a real impact.</p>
            <p>
              📌 We turn ideas into scalable digital solutions.
            </p>
            <p>
              📌 Pixel-perfect design meets powerful code.
            </p>
            <p>
              📌 End-to-end support.
            </p>
            <p>📌 Your vision, our execution</p>

            <p>What makes us different is our belief in collaboration. We don't
            just build projects - we build partnerships. By understanding your
            goals, challenges, and audience, we deliver solutions that truly
            reflect your vision. Together, let's shape the future - one
            innovation at a time.
          </p>

          <div className="about-buttons">
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
              onClick={handleServiceClick}
            >
              What We Offer
            </button>
          </div>
        </div>
        <div className="about-image" data-aos="zoom-out">
          <img src={aboutPageImage} alt="About image" />
        </div>
      </section>
      <Analytics />
    </main>
  );
}

export default About;
