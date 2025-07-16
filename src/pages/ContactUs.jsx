import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../views/Navbar";
import Footer from '../views/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: null, message: "" });
  const [contactInfo, setContactInfo] = useState(null);

  // 🔹 Fetch Contact Info from backend
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await axios.get("https://od-cards-backend-z494.onrender.com/api/admin/get");
        if (res.data.success && res.data.data.length > 0) {
          setContactInfo(res.data.data[0]);
        }
      } catch (error) {
        console.error("Failed to load contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

  // 🔹 Reset message after 3 seconds
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ success: null, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // 🔹 Handle Form Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    try {
      const res = await axios.post("https://od-cards-backend-z494.onrender.com/api/admin/contactus", {
        name: fullName,
        email: formData.email,
        number: formData.number,
        message: formData.message,
      });

      if (res.data.success) {
        setStatus({ success: true, message: res.data.message });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          number: "",
          message: "",
        });
      } else {
        setStatus({ success: false, message: "Failed to submit. Try again later." });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus({ success: false, message: "Something went wrong. Please try again." });
    }
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid px-0">
        <div className="row m-0">
          {/* 🔹 Dynamic Contact Info + Illustration */}
          <div
            className="col-md-6 d-flex flex-column justify-content-center text-white p-5"
            style={{
              background: "linear-gradient(to right, #F8483C, #DE2B59)",
              minHeight: "400px",
            }}
          >
            <h4 className="mb-4 fw-bold">Contact Us</h4>
            {contactInfo ? (
              <>
                <p><i className="bi bi-telephone-fill me-2"></i> +91 {contactInfo.phone}</p>
                <p><i className="bi bi-envelope-fill me-2"></i> {contactInfo.email}</p>
                <p><i className="bi bi-geo-alt-fill me-2"></i> {contactInfo.address}</p>
              </>
            ) : (
              <p>Loading contact info...</p>
            )}
            <img
              src="https://static.vecteezy.com/system/resources/previews/010/869/738/non_2x/faq-concept-illustration-people-looking-through-magnifying-glass-at-interrogation-point-searching-solutions-useful-information-customer-support-solving-problem-free-png.png"
              alt="Support"
              className="img-fluid mt-4"
              style={{ maxWidth: "300px" }}
            />
          </div>

          {/* 🔹 Contact Form */}
          <div className="col-md-6 bg-light p-5 shadow">
            <h4 className="fw-bold mb-4 text-dark">Let’s Get in Touch</h4>

            {status.message && (
              <div
                className={`alert ${status.success ? "alert-success" : "alert-danger"}`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Mobile Number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Description"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button className="btn btn-danger btn-lg" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* 🔹 Google Map Embed */}
        <div className="w-100 mt-4" style={{ height: "400px" }}>
          <iframe
            title="OD Cards Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.503244047839!2d-79.38634248450253!3d43.645853979121776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d30d37bbf9%3A0xa49689e943d52d7e!2sEntertainment%20District%2C%20Toronto%2C%20ON!5e0!3m2!1sen!2sca!4v1616585807635!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
