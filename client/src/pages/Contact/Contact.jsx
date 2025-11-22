import React from "react";
import { useState, useEffect } from "react";
import contactImage from "/src/assets/contact-page.png";
import { useAuth } from "../../store/auth";
import "./Contact.css";
import { toast } from "react-toastify";
import LoadingButton from "../../components/Loading-Buttons";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

function Contact() {
  const [contact, setContact] = useState(defaultContactFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const [userData, setUserData] = useState(true);
  const { user, API, authorizationToken } = useAuth();

  // if (userData && user) {
  //   setContact({
  //     username: user.username,
  //     email: user.email,
  //     message: "",
  //   });
  //   setUserData(false);
  // }

  // Set username & email once user is loaded
  useEffect(() => {
    if (user) {
      setContact((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(contact);

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const URL = `${API}/api/form/contact`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ message: contact.message }),
      };

      const response = await fetch(URL, options);
      const contactData = await response.json();

      if (response.ok) {
        setContact((prev) => ({
          ...prev,
          message: "",
        }));
        console.log("contact res data", contactData);
        toast.success("Message sent successfully");
      } else {
        toast.error(
          contactData.extraDetails
            ? contactData.extraDetails
            : contactData.message
        );
      }
    } catch (error) {
      console.log("error from contact", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="section-contact">
        <div className="contact-main-heading">
          <h1>
            Contact <span className="highlight">Us</span>{" "}
          </h1>
        </div>
        <div className="contact-container">
          <div className="contact-image" data-aos="zoom-out">
            <img src={contactImage} alt="contact-image" />
          </div>
          <div className="contact-form" data-aos="fade-up">
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="enter username"
                  required
                  autoComplete="off"
                  value={contact.username}
                  readOnly
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
                  value={contact.email}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  type="text"
                  name="message"
                  id="message"
                  autoComplete="off"
                  required
                  cols="30"
                  rows="10"
                  value={contact.message}
                  onChange={handleInput}
                ></textarea>
              </div>
              <LoadingButton isLoading={isSubmitting} type="submit">
                Submit
              </LoadingButton>
            </form>
          </div>
        </div>
        <hr />
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.719689758892!2d74.48219377456434!3d14.093717489286615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc410efb2f7e51%3A0xc0548490c3c96ee4!2sShri%20Murudeshwara%20Shiva%20Temple!5e0!3m2!1sen!2sin!4v1761563332361!5m2!1sen!2sin"
            style={{ width: "100vw", height: "200px", border: "none" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
}

export default Contact;
