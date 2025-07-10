import React from "react";
import Navbar from "../views/Navbar";
import Footer from '../views/Footer';

const ContactPage = () => {
  return (
    <>
      <Navbar />

      <div className="container-fluid px-0">
        <div className="row m-0">
          {/* Contact Info + Illustration */}
          <div className="col-md-6 d-flex flex-column justify-content-center text-white p-5"
            style={{
              background: 'linear-gradient(to right, #F8483C, #DE2B59)',
              minHeight: "400px",
            }}>
            <h4 className="mb-4 fw-bold">Contact Us</h4>
            <p><i className="bi bi-telephone-fill me-2"></i> +91 9988776655, 9988776644</p>
            <p><i className="bi bi-envelope-fill me-2"></i> odcards@gmail.com</p>
            <p><i className="bi bi-geo-alt-fill me-2"></i> Kphb Colony, Kukatpally, Hyderabad</p>
            <img
              src="https://img.freepik.com/free-vector/support-typographic-header-idea-web-page-diagnostic-service-providing-web-site-with-updated-technical-information-flat-vector-illustration_613284-2889.jpg?ga=GA1.1.2026462327.1743072904&semt=ais_hybrid&w=740"
              alt="Support"
              className="img-fluid mt-4"
              style={{ maxWidth: "300px" }}
            />
          </div>

          {/* Contact Form */}
          <div className="col-md-6 bg-light p-5 shadow">
            <h4 className="fw-bold mb-4 text-dark">Let’s Get in Touch</h4>
            <form>
              <div className="row mb-3">
                <div className="col">
                  <input type="text" className="form-control" placeholder="First Name" />
                </div>
                <div className="col">
                  <input type="text" className="form-control" placeholder="Last Name" />
                </div>
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" />
              </div>
              <div className="mb-3">
                <input type="tel" className="form-control" placeholder="Mobile Number" />
              </div>
              <div className="mb-3">
                <textarea className="form-control" rows="4" placeholder="Description"></textarea>
              </div>
              <button className="btn btn-danger btn-lg">Submit</button>
            </form>
          </div>
        </div>

        {/* Embedded Map */}
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
