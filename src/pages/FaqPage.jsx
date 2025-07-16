import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";

const BASE_URL = "http://localhost:5000"; // Use env in production

const FaqPage = () => {
  const [faqData, setFaqData] = useState([]);
  const [faqImage, setFaqImage] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/getallfaqs`);
        if (response.data.success) {
          setFaqData(response.data.data);
          setFaqImage(`${BASE_URL}${response.data.faqImage}`);
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="fw-bold mb-4 text-center">Frequently Asked Questions</h2>

        {/* FAQ Illustration */}
        {faqImage && (
          <div className="text-center mb-5 container">
            <img src={faqImage} alt="FAQ Illustration" className="img-fluid w-100 h-100" />
          </div>
        )}

        {/* FAQs */}
        {loading ? (
          <div className="text-center">Loading FAQs...</div>
        ) : (
          faqData.map((faq, index) => (
            <div
              key={faq._id}
              className={`col-12 border rounded mb-3 p-3 bg-${activeIndex === index ? "light" : "white"}`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleFAQ(index)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <strong>{faq.question}</strong>
                <span>{activeIndex === index ? "▲" : "▼"}</span>
              </div>
              {activeIndex === index && (
                <div className="mt-2 text-secondary">{faq.answer}</div>
              )}
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default FaqPage;
