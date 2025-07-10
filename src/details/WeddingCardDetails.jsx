import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../views/Navbar';
import Footer from '../views/Footer';

// Move this to a separate file if reused
const cardData = {
  free: [
    {
      id: 'free-1',
      image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44899.jpg",
      name: "Floral Wedding Invitation",
      description: "Elegant wedding invitation with floral accents. Perfect for traditional and garden weddings. The design features delicate rose patterns with gold foil detailing.",
      price: "Free",
      occasion: "Wedding",
      size: "5x7 inches",
      paperType: "Matte Finish",
      category: "free",
      features: ["High-resolution print", "Digital download", "Customizable text", "Print-ready PDF"]
    },
    {
      id: 'free-2',
      image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44898.jpg",
      name: "Elegant Wedding Card",
      description: "A classic design with gold borders and floral patterns. Suitable for formal weddings with its sophisticated layout and timeless appeal.",
      price: "Free",
      occasion: "Wedding",
      size: "5x7 inches",
      paperType: "Glossy Finish",
      category: "free",
      features: ["Editable template", "CMYK color mode", "300 DPI resolution", "Bleed included"]
    },
    {
      id: 'free-3',
      image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44897.jpg",
      name: "Modern Wedding Invitation",
      description: "Sleek, modern design with intricate detailing. Features geometric patterns with a contemporary color palette for stylish couples.",
      price: "Free",
      occasion: "Wedding",
      size: "5x7 inches",
      paperType: "Pearl Finish",
      category: "free",
      features: ["Vector file included", "Fully layered PSD", "Easy to customize", "Print and digital versions"]
    },
    {
      id: 'free-4',
      image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44896.jpg",
      name: "Romantic Wedding Card",
      description: "A romantic theme with soft pastels and gold foil accents. Ideal for romantic and vintage-inspired weddings with its delicate watercolor effects.",
      price: "Free",
      occasion: "Wedding",
      size: "5x7 inches",
      paperType: "Textured Finish",
      category: "free",
      features: ["Multiple file formats", "CMYK & RGB versions", "Help guide included", "Fast digital delivery"]
    }
  ],
  premium: [
    {
      id: 'premium-1',
      image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44892.jpg",
      name: "Luxury Wedding Card",
      description: "Premium card with embossed design and gold foil. Handcrafted with premium materials for an exquisite tactile experience.",
      price: "$10",
      occasion: "Wedding",
      size: "5x7 inches",
      paperType: "Silk Finish",
      category: "premium",
      features: ["Premium 300gsm paper", "Gold foil stamping", "Embossed details", "Eco-friendly materials"]
    },
    {
      id: 'premium-2',
      image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44893.jpg",
      name: "Classic Premium Card",
      description: "Timeless design with elegant patterns and ribbons. Features a satin ribbon accent and letterpress printing for a luxurious feel.",
      price: "$12",
      occasion: "Wedding",
      size: "5x7 inches",
      paperType: "Linen Finish",
      category: "premium",
      features: ["Letterpress printing", "Satin ribbon accent", "Luxury envelope", "Custom wax seal option"]
    },
    {
      id: 'premium-3',
      image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44894.jpg",
      name: "Modern Premium Invitation",
      description: "A clean and modern card with minimalistic details. Features spot UV coating for a contemporary look with subtle shine.",
      price: "$15",
      occasion: "Wedding",
      size: "5x7 inches",
      paperType: "Metallic Finish",
      category: "premium",
      features: ["Spot UV coating", "Die-cut elements", "Hand-torn edges", "Recycled paper option"]
    },
    {
      id: 'premium-4',
      image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44895.jpg",
      name: "Exquisite Wedding Card",
      description: "Exquisite design with hand-drawn details and gold accents. Each card is individually inspected for quality assurance.",
      price: "$18",
      occasion: "Wedding",
      size: "5x7 inches",
      paperType: "Vellum Finish",
      category: "premium",
      features: ["Hand-calligraphed option", "Vellum overlay", "Custom monogram", "Presentation box"]
    }
  ]
};

const WeddingCardDetails = () => {
  const { category, cardId } = useParams();
  const navigate = useNavigate();

  const allCards = [...cardData.free, ...cardData.premium];
  const selectedCard = allCards.find(card => card.id === cardId && card.category === category);

  if (!selectedCard) {
    return (
      <div className="container text-center py-5">
        <h2>Card not found</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Back to Wedding Cards
        </button>
      </div>
    );
  }

  const relatedCards = allCards.filter(card => card.id !== selectedCard.id && card.category === selectedCard.category).slice(0, 4);

  const handleAddToCart=()=>{
    console.log(selectedCard);
  }

  const handleProceed = () => {
    navigate('/dashboard/mycart', {
      state: {
        newItem: {
          id: selectedCard.id,
          title: selectedCard.title,
          image: selectedCard.image,
          price: selectedCard.price.replace('$', ''), // Convert "$20" to "20" for consistency
        }
      }
    });
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <img
              src={selectedCard.image}
              alt={selectedCard.name}
              className="img-fluid rounded shadow"
              style={{ maxHeight: '600px', objectFit: 'cover', width: '100%' }}
              onError={(e) => e.target.src = '/fallback-image.jpg'} // Optional fallback image
            />
          </div>
          <div className="col-md-6">
            <h1 className="mb-3">{selectedCard.name}</h1>
            <p className="lead">{selectedCard.description}</p>
            <h4 className={selectedCard.price === "Free" ? "text-success" : "text-primary"}>
              {selectedCard.price === "Free" ? "Free Download" : `Price: ${selectedCard.price}`}
            </h4>
            <div className="card my-4">
              <div className="card-body">
                <h5 className="card-title">Specifications</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Occasion:</strong> {selectedCard.occasion}</li>
                  <li className="list-group-item"><strong>Size:</strong> {selectedCard.size}</li>
                  <li className="list-group-item"><strong>Paper Type:</strong> {selectedCard.paperType}</li>
                  <li className="list-group-item">
                    <strong>Features:</strong>
                    <ul className="mt-2">
                      {selectedCard.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="d-flex gap-3">
              <button className="btn btn-lg text-white"
                style={{
                  background: selectedCard.price === "Free"
                    ? 'linear-gradient(135deg, #28a745, #20c997)'
                    : 'linear-gradient(135deg, #DF2C58, #FF688D)',
                  border: 'none'
                }}
                onClick={handleAddToCart}
              >
                {selectedCard.price === "Free" ? "Download Now" : "Add to Cart"}
              </button>
              <button className="btn btn-lg text-light" onClick={handleProceed}  style={{background: "linear-gradient(to right, #DF2C58, #FF688D)"}}>Proceed</button>
            </div>
          </div>
        </div>

        {relatedCards.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-4">You Might Also Like</h3>
            <div className="row">
              {relatedCards.map(card => (
                <div key={card.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div
                    className="card h-100 hover-shadow"
                    onClick={() => navigate(`/dashboard/category/weddingcarddetails/${card.category}/${card.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={card.image} className="card-img-top" alt={card.name} style={{ height: '200px', objectFit: 'cover' }} />
                    <div className="card-body">
                      <h5 className="card-title">{card.name}</h5>
                      <p className="card-text text-success">{card.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WeddingCardDetails;
