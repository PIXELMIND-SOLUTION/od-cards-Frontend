import React, { useState, useEffect } from "react";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";
import { useNavigate } from "react-router-dom";

const itemsPerPage = 8;

const InvitationCards = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Cards");

  useEffect(() => {
    const fetchInvitationCards = async () => {
      try {
        const response = await fetch("https://od-cards-backend-z494.onrender.com/api/products/getallinvitaioncards");
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData || "Failed to fetch invitation cards");
        }
  
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Received non-JSON response');
        }
  
        const data = await response.json();
        
        if (data && data.products && data.products.length > 0) {
          setCards(data.products);
        } else {
          setCards([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchInvitationCards();
  }, []);

  // Extract unique categories from cards
  const categories = ["All Cards", ...new Set(cards.map(card => card.category))];

  // Filter cards by selected category
  const filteredCards = selectedCategory === "All Cards" 
    ? cards 
    : cards.filter(card => card.category === selectedCategory);

  // Calculate pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading invitation cards...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (cards.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-info" role="alert">
            There are currently no invitation cards available.
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4" style={{ color: "#DF2C58" }}>Invitation Cards</h2>

        <div className="row">
          {/* Left Side - Categories */}
          <div className="col-md-4 mb-4">
            <div className="card p-3 shadow-sm" style={{ borderColor: "#DF2C58" }}>
              <h5 className="fw-semibold text-center mb-3 text-danger">Categories</h5>
              <div className="d-flex flex-column gap-2">
                {categories.map((category, idx) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`btn rounded-pill fw-semibold ${
                        isActive ? "active text-white" : "text-danger"
                      }`}
                      style={{
                        background: isActive
                          ? "linear-gradient(to right, #DF2C58, #FF688D)"
                          : "transparent",
                        borderColor: "#DF2C58",
                      }}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Card Display */}
          <div className="col-md-8">
            <div className="card shadow-sm" style={{ borderColor: "#DF2C58" }}>
              <div className="card-header bg-white">
                <h5 className="fw-bold mb-0" style={{ color: "#DF2C58" }}>{selectedCategory}</h5>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  {currentCards.map((card) => (
                    <div key={card._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                      <div
                        className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden"
                        onClick={() => navigate(`/dashboard/category/invitation-cards/${card._id}`)}
                        style={{
                          cursor: "pointer",
                          transition: "transform 0.2s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                      >
                        <div className="ratio ratio-4x3">
                          <img
                            src={card.images?.[0] || "https://via.placeholder.com/300x225?text=Invitation+Card"}
                            className="card-img-top object-fit-cover"
                            alt={card.name}
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/300x225?text=Invitation+Card";
                            }}
                          />
                        </div>
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title text-truncate">{card.name}</h5>
                          <div className="d-flex align-items-center mb-2">
                            {card.offeredPrice && card.offeredPrice < card.price ? (
                              <>
                                <span className="text-success fw-bold me-2">${card.offeredPrice}</span>
                                <span className="text-muted text-decoration-line-through small">${card.price}</span>
                              </>
                            ) : (
                              <span className="text-success fw-bold">
                                {card.price === 0 || card.price === "0" ? "Free" : `$${card.price}`}
                              </span>
                            )}
                          </div>
                          <div className="mb-2">
                            <span className={`badge ${card.isInStock ? 'bg-success' : 'bg-danger'}`}>
                              {card.isInStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                            {card.quantity && (
                              <span className="badge bg-info ms-2">Qty: {card.quantity}</span>
                            )}
                          </div>
                          <p
                            className="card-text text-muted small flex-grow-1"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {card.description || "No description available"}
                          </p>
                          <button
                            className="btn btn-sm rounded-pill mt-auto"
                            style={{
                              background: "linear-gradient(to right, #F8483C, #DE2B59)",
                              border: "none",
                              color: "white"
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/dashboard/category/invitation-cards/${card._id}`);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav aria-label="Page navigation" className="mt-5">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          &laquo; Previous
                        </button>
                      </li>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <li
                          key={number}
                          className={`page-item ${currentPage === number ? "active" : ""}`}
                        >
                          <button className="page-link" onClick={() => paginate(number)}>
                            {number}
                          </button>
                        </li>
                      ))}

                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InvitationCards;