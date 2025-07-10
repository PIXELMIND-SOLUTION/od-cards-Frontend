import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../views/Navbar';
import Footer from '../views/Footer';

const WeddingCards = () => {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('all'); // State to manage selected category

    const freeCards = [
        {
            id: 'free-1',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44899.jpg",
            name: "Floral Wedding Invitation",
            description: "Elegant wedding invitation with floral accents.",
            price: "Free",
            occasion: "Wedding",
            size: "5x7 inches",
            paperType: "Matte Finish",
            category: "free"
        },
        {
            id: 'free-2',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44898.jpg",
            name: "Elegant Wedding Card",
            description: "A classic design with gold borders and floral patterns.",
            price: "Free",
            occasion: "Wedding",
            size: "5x7 inches",
            paperType: "Glossy Finish",
            category: "free"
        },
        {
            id: 'free-3',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44897.jpg",
            name: "Modern Wedding Invitation",
            description: "Sleek, modern design with intricate detailing.",
            price: "Free",
            occasion: "Wedding",
            size: "5x7 inches",
            paperType: "Pearl Finish",
            category: "free"
        },
        {
            id: 'free-4',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44896.jpg",
            name: "Romantic Wedding Card",
            description: "A romantic theme with soft pastels and gold foil accents.",
            price: "Free",
            occasion: "Wedding",
            size: "5x7 inches",
            paperType: "Textured Finish",
            category: "free"
        }
    ];

    const premiumCards = [
        {
            id: 'premium-1',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44892.jpg",
            name: "Luxury Wedding Card",
            description: "Premium card with embossed design and gold foil.",
            price: "$10",
            occasion: "Wedding",
            size: "5x7 inches",
            paperType: "Silk Finish",
            category: "premium"
        },
        {
            id: 'premium-2',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44893.jpg",
            name: "Classic Premium Card",
            description: "Timeless design with elegant patterns and ribbons.",
            price: "$12",
            occasion: "Wedding",
            size: "5x7 inches",
            paperType: "Linen Finish",
            category: "premium"
        },
        {
            id: 'premium-3',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44894.jpg",
            name: "Modern Premium Invitation",
            description: "A clean and modern card with minimalistic details.",
            price: "$15",
            occasion: "Wedding",
            size: "5x7 inches",
            paperType: "Metallic Finish",
            category: "premium"
        },
        {
            id: 'premium-4',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44895.jpg",
            name: "Exquisite Wedding Card",
            description: "Exquisite design with hand-drawn details and gold accents.",
            price: "$18",
            occasion: "Wedding",
            size: "5x7 inches",
            paperType: "Vellum Finish",
            category: "premium"
        }
    ];

    const handleCardClick = (category, id) => {
        navigate(`/dashboard/category/weddingcarddetails/${category}/${id}`);
    };

    // Filter cards based on selected category
    const displayedCards = selectedCategory === 'all'
        ? [...freeCards, ...premiumCards]
        : selectedCategory === 'free'
            ? freeCards
            : premiumCards;

    return (
        <>
            <Navbar />
            {/* {<div className="container-fluid w-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-sm-6 p-3">
                        <h1><b>Wedding Cards</b></h1><br />
                        <p>Elevate your brand with premium card printing—custom designs, high-quality materials, and cutting-edge technology tailored to your needs. From offset to digital, we choose the ideal technique based on time, color, quantity, and finish for perfect, vibrant results every time.</p><br />
                        <button className="btn btn-dark btn-lg" style={{
                            background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                            color: 'white'
                        }}
                            onClick={() => { navigate('/dashboard') }}>Back to Dashboard</button>
                    </div>
                    <div className="col-sm-6 p-5">
                        <div id="weddingCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner rounded-5">
                                <div className="carousel-item active">
                                    <img src="https://img.freepik.com/free-vector/gradient-golden-floral-wedding-invitation_52683-60511.jpg" className="d-block w-100" alt="Slide 1" />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44893.jpg" className="d-block w-100" alt="Slide 2" />
                                </div>
                                <div className="carousel-item">
                                    <img src="https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg" className="d-block w-100" alt="Slide 3" />
                                </div>
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#weddingCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#weddingCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

            <h2 className="text-center fw-bold mb-4">Wedding Cards</h2>

            {/* Category Selector */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h3 className="text3" style={{ color: "#000" }}>Select Category</h3>
                        <div className="btn-group">
                            <button
                                className="btn"
                                onClick={() => setSelectedCategory('all')}
                                style={{ background: `${selectedCategory === 'all' ? 'linear-gradient(to right, #F8483C, #DE2B59)' : 'white'}`, color: "black" }}
                            >
                                All Cards
                            </button>
                            <button
                                className="btn"
                                onClick={() => setSelectedCategory('free')}
                                style={{ background: `${selectedCategory === 'free' ? 'linear-gradient(to right, #F8483C, #DE2B59)' : 'white'}`, color: "black" }}
                            >
                                Free Cards
                            </button>
                            <button
                                className="btn"
                                onClick={() => setSelectedCategory('premium')}
                                style={{ background: `${selectedCategory === 'premium' ? 'linear-gradient(to right, #F8483C, #DE2B59)' : 'white'}`, color: "black" }}
                            >
                                Premium Cards
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Cards based on selected category */}
            <div className="container-fluid p-5">
                <div className="row g-4">
                    {displayedCards.map((card) => (
                        <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3" onClick={() => handleCardClick(card.category, card.id)}>
                            <div className={`card position-relative border-0 shadow-sm ${card.category}-card`} style={{ overflow: 'hidden' }}>
                                {card.category === 'premium' && <div className="premium-ribbon">Premium</div>}
                                <img
                                    src={card.image}
                                    className="card-img-top"
                                    alt={card.name}
                                    style={{ height: "300px", objectFit: "cover", borderRadius: "10px" }}
                                />
                                <div className={`p-3 ${card.category === 'premium' ? 'text-white' : ''}`}>
                                    <h5 className="card-title">{card.name}</h5>
                                    <p className={`fw-bold ${card.category === 'premium' ? 'text-warning' : 'text-success'}`}>{card.price}</p>
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

export default WeddingCards;
