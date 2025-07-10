import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";
import axios from "axios";

const InvitationCardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/singleproduct/${id}`
        );
        setCard(response.data.product);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Card not found");
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  const handleAddToCart = () => {
    navigate('/dashboard/mycart', {
      state: {
        newItem: {
          id: card._id,
          title: card.name,
          image: card.images?.[0], // if `images` is an array
          price: card.price,
        }
      }
    });
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error || !card) {
    return (
      <div className="container text-center py-5">
        <h2>{error}</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/dashboard/category/invitation-cards')}
        >
          Back to Invitation Cards
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={card.images?.[0]}
              alt={card.name}
              className="img-fluid rounded shadow"
              style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <h2>{card.name}</h2>
            <p className="lead">{card.description}</p>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Details</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Price:</strong> {card.price === 0 ? "Free" : `$${card.price}`}</li>
                  <li className="list-group-item"><strong>Size:</strong> {card.size || "Standard"}</li>
                  <li className="list-group-item"><strong>Paper Type:</strong> {card.paperType || "N/A"}</li>
                </ul>
              </div>
            </div>
            {card.price === 0 ? (
              <a
                href={card.images?.[0]}
                download={`${card.name.replace(/\s+/g, '-')}.jpg`}
                className="btn btn-success btn-lg me-2"
              >
                <i className="fas fa-download me-2"></i>Download Now
              </a>
            ) : (
              <button className="btn btn-warning btn-lg me-2" onClick={handleAddToCart}>
                <i className="fas fa-cart-plus me-2"></i>Add to Cart
              </button>
            )}
            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={() => navigate('/dashboard/category/invitation-cards')}
            >
              Back to Invitations
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InvitationCardDetails;
