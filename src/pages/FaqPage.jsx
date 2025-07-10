import React, { useState } from "react";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";

// 🔹 Full Mock Data (including image)
const mockFaqData = {
  image: "https://img.freepik.com/free-vector/people-ask-frequently-asked-questions_102902-2339.jpg",
  faqs: [
    {
      question: "We provide fast on-demand printing",
      answer:
        "Communications det, consectetur adipiscing elit. We build and activate brands through cultural insight and strategy.",
    },
    {
      question: "What is the purpose of a visiting card?",
      answer:
        "A visiting card provides essential contact information to grow your professional or business network.",
    },
    {
      question: "How quickly can you deliver prints?",
      answer:
        "Our services ensure your products are made and shipped quickly, often within the same day.",
    },
    {
      question: "Why use printed invitation cards?",
      answer:
        "They leave a tangible impression and offer a personalized, elegant way to invite guests.",
    },
    {
      question: "What finishes are available?",
      answer:
        "We offer matte, glossy, textured, UV spot, and more — tailored to your brand style.",
    },
  ],
};

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="fw-bold mb-4 text-center">Frequently Asked Questions</h2>

        {/* 🔹 FAQ Illustration Image from Mock Data */}
        <div className="text-center mb-5">
          <img
            src={mockFaqData.image}
            alt="FAQ Illustration"
            className="img-fluid"
          />
        </div>

        {/* 🔹 FAQ Items from Mock Data */}
        {mockFaqData.faqs.map((faq, index) => (
          <div
            key={index}
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
        ))}
      </div>

      <Footer />
    </>
  );
};

export default FaqPage;
