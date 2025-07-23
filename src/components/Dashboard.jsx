import Navbar from "../views/Navbar";
import Footer from "../views/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import OrderModal from "../details/orderModal";
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [categoryError, setCategoryError] = useState(null);
    const [newArrivals, setNewArrivals] = useState([]);
    const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
    const [newArrivalsError, setNewArrivalsError] = useState(null);
    const [bannerData, setBannerData] = useState(null);
    const [marquees, setMarquees] = useState([]);

    useEffect(() => {
        axios.get('https://od-cards-backend-z494.onrender.com/api/marquees/getall')
            .then((response) => {
                if (response.data.marquees) {
                    setMarquees(response.data.marquees);
                }
            })
            .catch((error) => {
                console.error('Error fetching marquee items:', error);
            });
    }, []);


    useEffect(() => {
        axios.get('https://od-cards-backend-z494.onrender.com/api/banners/getallbanners')
            .then(response => {
                if (response.data.banners && response.data.banners.length > 0) {
                    setBannerData(response.data.banners[0]);
                }
            })
            .catch(error => {
                console.error('Error fetching banner data:', error);
            });
    }, []);

    const [reviewData, setReviewData] = useState([]);
    const scrollRef = useRef(null);

    // Fetch review data on mount
    useEffect(() => {
        axios.get('https://od-cards-backend-z494.onrender.com/api/reviews/allreviews')
            .then(response => {
                setReviewData(response.data || []);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    }, []);

    // Scroll handler
    const scrollByAmount = (amount) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://od-cards-backend-z494.onrender.com/api/categories/allcategories');
                const data = await response.json();
                if (response.ok) {
                    setCategories(data.categories);
                } else {
                    setCategoryError(data.message || 'Failed to fetch categories');
                }
            } catch (error) {
                setCategoryError('Network error while fetching categories');
                console.error('Category fetch error:', error);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    // Fetch new arrivals (latest 10 visiting cards)
    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await fetch('https://od-cards-backend-z494.onrender.com/api/products/allvisingcards');
                const data = await response.json();
                if (response.ok) {
                    // Get the latest 10 products by sorting based on createdAt date
                    const latestProducts = data.data
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 10)
                        .map(product => ({
                            id: product._id,
                            name: product.productName,
                            image: product.images && product.images.length > 0
                                ? `https://od-cards-backend-z494.onrender.com/${product.images[0].replace(/\\/g, '/')}`
                                : "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg",
                            description: product.productCategory,
                            price: product.cardSizeMultiplier ? product.cardSizeMultiplier * 10 : 15.00, // Example pricing logic
                            category: product.category
                        }));
                    setNewArrivals(latestProducts);
                } else {
                    setNewArrivalsError(data.message || 'Failed to fetch new arrivals');
                }
            } catch (error) {
                setNewArrivalsError('Network error while fetching new arrivals');
                console.error('New arrivals fetch error:', error);
            } finally {
                setLoadingNewArrivals(false);
            }
        };

        fetchNewArrivals();
    }, []);

    const [centerIndex, setCenterIndex] = useState(2);

    useEffect(() => {
        if (newArrivals.length > 0) {
            const interval = setInterval(() => {
                slide("next");
            }, 3000); // Change image every 3 seconds

            return () => clearInterval(interval); // Clear on unmount
        }
    }, [newArrivals]);

    const slide = (direction) => {
        if (newArrivals.length === 0) return;

        if (direction === "next") {
            setCenterIndex((prev) => (prev + 1) % newArrivals.length);
        } else {
            setCenterIndex((prev) => (prev - 1 + newArrivals.length) % newArrivals.length);
        }
    };

    const getImageClass = (offset) => {
        if (offset === 0) return "carousel-img center";
        if (offset === -1 || offset === 1) return "carousel-img medium";
        return "carousel-img small";
    };



    const offers = [
        {
            id: 1,
            title: "Wedding Invitation Classic",
            image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg",
            description: "Elegant and traditional Indian wedding invite",
            price: "₹199",
        },
        {
            id: 2,
            title: "Royal Wedding Invite",
            image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg",
            description: "Rich design with golden highlights",
            price: "₹249",
        },
        {
            id: 3,
            title: "Floral Theme Invite",
            image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg",
            description: "Soft floral wedding invitation",
            price: "₹179",
        },
        {
            id: 4,
            title: "Minimalistic Invite",
            image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg",
            description: "Simple and modern layout",
            price: "₹159",
        },
    ];

    const bestsellers = [
        {
            id: 1,
            title: "Traditional Royal Card",
            image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg",
            description: "Most loved royal invite for weddings",
            price: "₹229",
        },
        {
            id: 2,
            title: "Elegant Floral Card",
            image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg",
            description: "Top seller with floral elements",
            price: "₹189",
        },
        {
            id: 3,
            title: "Modern Style Invite",
            image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg",
            description: "Best for contemporary weddings",
            price: "₹209",
        },
        {
            id: 4,
            title: "Premium Handmade Invite",
            image: "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg",
            description: "Premium feel with handmade textures",
            price: "₹299",
        },
    ];


    // Auto scroll effect
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        const scrollInterval = setInterval(() => {
            if (scrollContainer) {
                scrollContainer.scrollBy({ left: 320, behavior: "smooth" });

                // Loop scroll
                if (
                    scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
                    scrollContainer.scrollWidth
                ) {
                    scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
                }
            }
        }, 3000);

        return () => clearInterval(scrollInterval);
    }, []);


    const handleCategoryClick = (category) => {
        const formattedName = category.toLowerCase().replace(/\s+/g, '-');
        navigate(`/dashboard/category/${formattedName}`);
    };

    const handleCardClick = (category, id) => {
        navigate(`/dashboard/category/weddingcarddetails/${category}/${id}`);
    };

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleProceed = () => {
        navigate('/dashboard/card-details');
    };

    const handleNewArrivals = () => {

    };

    const handleImageClick = (id, category) => {
        const formattedCategory = category.toLowerCase().replace(/\s+/g, '-');
        navigate(`/dashboard/category/${formattedCategory}`);
    };


    const [showAll, setShowAll] = useState(false);

    const visibleCategories = showAll ? categories : categories.slice(0, 4);

    return (
        <>
            <Navbar />

            <div className="container-fluid p-0 mt-0">
                <div className="bg-danger text-white py-2">
                    <marquee
                        behavior="scroll"
                        direction="left"
                        scrollAmount="6"
                        className="fw-semibold"
                    >
                        {marquees.map((item, index) => (
                            <span key={index}>
                                <i className={`fa-solid ${item.icon || 'fa-envelope'} me-2`}></i>
                                {item.text}
                                &nbsp;&nbsp;&nbsp;
                            </span>
                        ))}
                    </marquee>
                </div>
            </div>

            <div className="container-fluid p-0 position-relative">
                {/* Carousel */}
                <div
                    id="weddingCarousel"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                    data-bs-interval="3000"
                >
                    <div className="carousel-inner">
                        {bannerData?.images?.map((img, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            >
                                <img
                                    src={`https://od-cards-backend-z494.onrender.com/uploads/banners/${img}`}
                                    className="d-block w-100"
                                    alt={`Slide ${index + 1}`}
                                    style={{ height: '100vh', objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Overlay */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }}
                ></div>

                {/* Text Content */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                    style={{ zIndex: 2 }}
                >
                    <div className="container px-4">
                        <div className="row">
                            <div className="col-sm-12 text-white">
                                <h1 className="fw-bold mb-4">{bannerData?.title}</h1>
                                <p className="mb-4">{bannerData?.content}</p>
                                <button
                                    className="btn btn-lg"
                                    style={{
                                        background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                                        color: 'white',
                                    }}
                                    onClick={() => navigate('/dashboard/mycart')}
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid p-5 bg-light">
                <div className="row align-items-center text-center  text-md-start mb-4">
                    <div className="col-12 col-md-6 ">
                        <h2 className="fw-bold">Explore All Categories</h2>
                    </div>
                    <div className="col-12 col-md-6 text-md-end mt-3 mt-md-0">
                        {categories.length > 4 && (
                            <button
                                className="btn "
                                style={{
                                    background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                                    color: 'white',
                                }}
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? "Show Less" : "View All"}
                            </button>
                        )}
                    </div>
                </div>

                <div className="row g-4">
                    {visibleCategories.map((category) => (
                        <div key={category._id} className="col-12 col-sm-6 col-md-6 col-lg-3">
                            <div
                                className="card border-0 shadow"
                                style={{ cursor: "pointer", overflow: "hidden", position: "relative" }}
                                onClick={() => handleCategoryClick(category.category)}
                            >
                                <img
                                    src={
                                        category.image ||
                                        "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg"
                                    }
                                    alt={category.category}
                                    className="card-img img-fluid"
                                    style={{
                                        objectFit: "cover",
                                        height: "300px",
                                        width: "100%",
                                        filter: "brightness(0.6)",
                                        transition: "0.3s ease-in-out",
                                    }}
                                    onError={(e) => {
                                        e.target.src =
                                            "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg";
                                    }}
                                />
                                <div
                                    className="card-img-overlay d-flex justify-content-center align-items-center"
                                    style={{ background: "rgba(0,0,0,0.3)" }}
                                >
                                    <h5 className="text-white fw-bold text-center fs-5">
                                        {category.category}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* New Arrivals */}
            <div className="container-fluid py-5 bg-light">
                <div className="row justify-content-center text-start p-4 mb-4">
                    <div className="col-12">
                        <h2
                            className="fw-bold"
                            style={{ cursor: "pointer" }}
                            onClick={handleNewArrivals}
                        >
                            New Arrivals
                        </h2>
                    </div>
                </div>

                {loadingNewArrivals ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading new arrivals...</p>
                    </div>
                ) : newArrivalsError ? (
                    <div className="alert alert-danger text-center">{newArrivalsError}</div>
                ) : newArrivals.length > 0 ? (
                    <>
                        {/* For medium and larger screens (carousel view) */}
                        <div className="d-none d-md-flex justify-content-center align-items-center flex-wrap gap-3 px-2">
                            {[-2, -1, 0, 1, 2].map((offset) => {
                                const index = (centerIndex + offset + newArrivals.length) % newArrivals.length;
                                const product = newArrivals[index];

                                return (
                                    <div
                                        key={product.id}
                                        className={`carousel-product text-center ${getImageClass(offset)}`}
                                        onClick={offset === 0 ? () => handleImageClick(product.id, product.category) : undefined}
                                        style={{
                                            cursor: offset === 0 ? "pointer" : "default",
                                            flex: "0 0 auto",
                                            maxWidth: offset === 0 ? "300px" : "200px",
                                            transition: "transform 0.3s ease",
                                        }}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="img-fluid rounded shadow-sm"
                                            style={{
                                                height: offset === 0 ? "300px" : "200px",
                                                objectFit: "cover",
                                                width: "100%",
                                            }}
                                            onError={(e) => {
                                                e.target.src = "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg";
                                            }}
                                        />
                                        {offset === 0 && (
                                            <div className="mt-2">
                                                <h6 className="fw-bold mb-1 text-truncate">{product.name}</h6>
                                                <p className="text-primary mb-0">${product.price.toFixed(2)}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* For small devices (only center product) */}
                        <div className="d-block d-md-none text-center px-4">
                            {newArrivals.length > 0 && (() => {
                                const product = newArrivals[centerIndex];
                                return (
                                    <div
                                        className="carousel-product"
                                        onClick={() => handleImageClick(product.id, product.category)}
                                        style={{
                                            cursor: "pointer",
                                            maxWidth: "100%",
                                            margin: "0 auto",
                                        }}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="img-fluid rounded shadow-sm"
                                            style={{
                                                height: "280px",
                                                objectFit: "cover",
                                                width: "100%",
                                            }}
                                            onError={(e) => {
                                                e.target.src = "https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg";
                                            }}
                                        />
                                        <div className="mt-2">
                                            <h6 className="fw-bold mb-1">{product.name}</h6>
                                            <p className="text-primary mb-0">${product.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Carousel Controls (Visible on all devices) */}
                        <div className="text-center mt-4">
                            <button
                                onClick={() => slide("prev")}
                                className="btn mx-2 px-3"
                                style={{
                                    background: "linear-gradient(to right, #F8483C, #DE2B59)",
                                    color: "white",
                                }}
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <button
                                onClick={() => slide("next")}
                                className="btn mx-2 px-3"
                                style={{
                                    background: "linear-gradient(to right, #F8483C, #DE2B59)",
                                    color: "white",
                                }}
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="alert alert-info text-center">No new arrivals available</div>
                )}
            </div>





            {/* Offers */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h2 className="mb-4">Offers</h2>
                    </div>
                </div>
                <br />
                <div className="row g-4">
                    {offers.map((offer) => (
                        <div key={offer.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div
                                className="card position-relative border-0 premium-card"
                                style={{ overflow: "hidden", background: "#1e1e1e", borderRadius: "10px" }}
                            >
                                <img
                                    src={offer.image}
                                    className="card-img-top"
                                    alt={offer.title || "Offer Image"}
                                    style={{ height: "300px", objectFit: "cover", borderRadius: "10px" }}
                                />
                                <div className="p-3 text-white">
                                    <h6 className="card-title">{offer.title}</h6>
                                    <p className="text-warning fw-bold">{offer.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Best Sellers */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h2 className="mb-4">Best Sellers</h2>
                    </div>
                </div>
                <br />
                <div className="row g-4">
                    {bestsellers.map((card) => (
                        <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div
                                className="card position-relative border-0 premium-card"
                                style={{ overflow: "hidden", background: "#1e1e1e", borderRadius: "10px" }}
                            >
                                <img
                                    src={card.image}
                                    className="card-img-top"
                                    alt={card.title || "Card"}
                                    style={{ height: "300px", objectFit: "cover", borderRadius: "10px" }}
                                />
                                <div className="p-3 text-white">
                                    <h6 className="card-title">{card.title}</h6>
                                    <p className="text-warning fw-bold">{card.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container-fluid py-5 bg-light">
                <div className="container">
                    {/* Title */}
                    <div className="row justify-content-center mb-4">
                        <div className="col-12 text-center">
                            <h2 className="fw-bold">What Our Customers Say</h2>
                            <p className="text-muted">Hear from our satisfied customers</p>
                        </div>
                    </div>

                    {/* Scroll Buttons */}
                    <div className="text-end mb-2">
                        <button
                            className="btn me-2"
                            style={{
                                background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                                color: 'white',
                            }}
                            onClick={() => scrollByAmount(-320)}
                        >
                            &#8592;
                        </button>
                        <button
                            className="btn me-2"
                            style={{
                                background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                                color: 'white',
                            }}
                            onClick={() => scrollByAmount(320)}
                        >
                            &#8594;
                        </button>
                    </div>

                    {/* Review Cards */}
                    <div
                        ref={scrollRef}
                        className="d-flex overflow-auto gap-3 pb-3"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        {reviewData.map((review, index) => (
                            <div className="card flex-shrink-0" style={{ width: "300px" }} key={index}>
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <img
                                            src={`https://od-cards-backend-z494.onrender.com${review.image}`}
                                            alt={review.name}
                                            className="rounded-circle me-3"
                                            width="60"
                                            height="60"
                                        />
                                        <div>
                                            <h5 className="mb-0">{review.name}</h5>
                                            <div className="text-warning">
                                                {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
                                                    <i className="fas fa-star" key={i}></i>
                                                ))}
                                                {review.rating % 1 !== 0 && (
                                                    <i className="fas fa-star-half-alt"></i>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="card-text small">"{review.comment}"</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="row mt-4">
                        <div className="col-12 text-center">
                            <button
                                className="btn"
                                style={{
                                    background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                                    color: 'white',
                                }}
                                onClick={() => navigate('/dashboard/reviews')}
                            >
                                View All Reviews
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <OrderModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onProceed={handleProceed}
            />
            <Footer />
        </>
    );
}

export default Dashboard;