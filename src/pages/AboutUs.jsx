import React, { useEffect, useState } from "react";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";
import axios from "axios";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);
  const [cardCategories, setCardCategories] = useState([]);

  useEffect(() => {
    // Fetch About section data
    axios
      .get("https://od-cards-backend-z494.onrender.com/api/aboutus/about")
      .then((res) => {
        if (res.data.length > 0) {
          setAboutData(res.data[0]);
        }
      })
      .catch((err) => console.error("Error fetching about data:", err));

    // Fetch Card Categories data
    axios
      .get("https://od-cards-backend-z494.onrender.com/api/aboutcard/getallcards")
      .then((res) => {
        setCardCategories(res.data);
      })
      .catch((err) => console.error("Error fetching card categories:", err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="fw-bold mb-4 text-center">About Us</h2>

        {/* 🔹 Image + Description Section */}
        {aboutData && (
          <div className="row align-items-center mb-5">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={`https://od-cards-backend-z494.onrender.com${aboutData.image}`}
                alt="About Card Printing"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold mb-3">Why Choose Us</h4>
              <p>{aboutData.description}</p>
            </div>
          </div>
        )}

        {/* 🔹 Categories Section */}
        <div className="row g-4">
          {cardCategories.map((category) => (
            <div key={category._id} className="col-md-6">
              <div className="card h-100 shadow-sm p-3">
                <div className="row align-items-center">
                  {/* Circular Image */}
                  <div className="col-md-6 text-center">
                    <img
                      src={`https://od-cards-backend-z494.onrender.com${category.image}`}
                      alt={category.title}
                      className="rounded-circle img-fluid"
                      style={{ width: 150, height: 150, objectFit: "cover" }}
                    />
                  </div>

                  {/* Text Section */}
                  <div className="col-md-6">
                    <h5 className="fw-bold mb-2">
                      {category.count}<b>+</b>  {category.title}
                    </h5>
                    <p className="text-muted mb-0">{category.description}</p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
