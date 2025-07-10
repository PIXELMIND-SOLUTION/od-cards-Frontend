import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <i key={i} className="fas fa-star text-warning"></i>
      ))}
      {halfStar && <i className="fas fa-star-half-alt text-warning"></i>}
    </>
  );
};

const ViewAllReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews/allreviews");
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="fw-bold text-center mb-4">Customer Reviews</h2>
        <div className="row g-4">
          {reviews.map((review, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={
                        review.image.startsWith("http")
                          ? review.image
                          : `http://localhost:5000${review.image}`
                      }
                      alt={review.name}
                      className="rounded-circle me-3"
                      width="60"
                      height="60"
                    />
                    <div>
                      <h5 className="mb-0">{review.name}</h5>
                      <div>{renderStars(review.rating)}</div>
                    </div>
                  </div>
                  <p className="card-text">{`"${review.comment}"`}</p>
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

export default ViewAllReviews;
