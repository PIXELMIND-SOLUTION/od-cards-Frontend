import { useState, useEffect, useRef } from "react";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";
import { useNavigate } from "react-router-dom";
import loginpng from '../assets/login.png';
import 'bootstrap/dist/css/bootstrap.min.css'; // for styles
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // for JS
import * as bootstrap from 'bootstrap';


function Home() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [resendDisabled, setResendDisabled] = useState(true);
    const [mobileNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [centerIndex, setCenterIndex] = useState(2);
    const [errors, setErrors] = useState({
        mobile: "",
        otp: "",
        name: "",
        email: "",
        location: "",
        terms: ""
    });
    const [user, setUser] = useState(null);
    const [generatedOTP, setGeneratedOTP] = useState("");
    const loginModalRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [categoryError, setCategoryError] = useState(null);
    const [newArrivals, setNewArrivals] = useState([]);
    const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
    const [newArrivalsError, setNewArrivalsError] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories/allcategories');
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
                const response = await fetch('http://localhost:5000/api/products/allvisingcards');
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
                                ? `http://localhost:5000/${product.images[0].replace(/\\/g, '/')}`
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


    // Timer effect for OTP resend
    useEffect(() => {
        let interval;
        if (timer > 0 && resendDisabled) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [timer, resendDisabled]);

    // Auto-slide carousel effect
    useEffect(() => {
        const interval = setInterval(() => {
            slide("next");
        }, 3000);
        return () => clearInterval(interval);
    }, [centerIndex]);

    // Check for existing session on component mount
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Redirect to dashboard if user is logged in
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const products = [
        {
            id: 1,
            name: "Business Card - Abstract Design",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44899.jpg",
            description: "A sleek and creative business card design with a modern abstract polygon style.",
            price: 20.00,
            category: "Business Cards"
        },
        {
            id: 2,
            name: "Classic Business Card",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44898.jpg",
            description: "A timeless and professional business card design.",
            price: 15.00,
            category: "Business Cards"
        },
        {
            id: 3,
            name: "Category Icon Card",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44897.jpg",
            description: "A business card design featuring a category icon for easy identification.",
            price: 18.00,
            category: "Business Cards"
        },
        {
            id: 4,
            name: "Cards Collection",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44896.jpg",
            description: "A set of various business card designs, perfect for different industries.",
            price: 50.00,
            category: "Business Cards"
        },
        {
            id: 5,
            name: "Wedding Invitation Card",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44895.jpg",
            description: "Elegant and romantic wedding invitation card design.",
            price: 30.00,
            category: "Wedding Cards"
        }
    ];

    const freeCards = [
        {
            id: 'free-1',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44899.jpg",
            name: "Floral Wedding Invitation",
            price: "Free",
            category: "free"
        },
        {
            id: 'free-2',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44898.jpg",
            name: "Elegant Wedding Card",
            price: "Free",
            category: "free"
        },
        {
            id: 'free-3',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44897.jpg",
            name: "Modern Wedding Invitation",
            price: "Free",
            category: "free"
        },
        {
            id: 'free-4',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44896.jpg",
            name: "Romantic Wedding Card",
            price: "Free",
            category: "free"
        }
    ];

    const premiumCards = [
        {
            id: 'premium-1',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44892.jpg",
            name: "Luxury Wedding Card",
            price: "₹10",
            category: "premium"
        },
        {
            id: 'premium-2',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44893.jpg",
            name: "Classic Premium Card",
            price: "₹12",
            category: "premium"
        },
        {
            id: 'premium-3',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44894.jpg",
            name: "Modern Premium Invitation",
            price: "₹15",
            category: "premium"
        },
        {
            id: 'premium-4',
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44895.jpg",
            name: "Exquisite Wedding Card",
            price: "₹18",
            category: "premium"
        }
    ];
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


    const reviewData = [
        {
            name: "Priya Sharma",
            image: "https://randomuser.me/api/portraits/women/32.jpg",
            rating: 5,
            text: "The wedding cards I ordered were absolutely stunning! The quality exceeded my expectations and the customization options were fantastic. Highly recommend!"
        },
        {
            name: "Rahul Patel",
            image: "https://randomuser.me/api/portraits/men/45.jpg",
            rating: 4.5,
            text: "Excellent service! The business cards I got really stand out and have helped me make great first impressions. Fast delivery and great customer support."
        },
        {
            name: "Ananya Gupta",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            rating: 5,
            text: "The invitation cards for my daughter's birthday were perfect! The design team helped me create exactly what I envisioned. Will definitely order again."
        },
        {
            name: "Amit Verma",
            image: "https://randomuser.me/api/portraits/men/12.jpg",
            rating: 4,
            text: "Great print quality and reasonable pricing. Customer service was helpful throughout."
        },
        {
            name: "Sneha Reddy",
            image: "https://randomuser.me/api/portraits/women/54.jpg",
            rating: 5,
            text: "Impressed with the variety of designs and timely delivery. Smooth process from start to end."
        },
    ];


    const scrollRef = useRef();

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

    const scrollByAmount = (amount) => {
        scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    };


    // Carousel functions
    const slide = (direction) => {
        if (direction === "next") {
            setCenterIndex((prev) => (prev + 1) % products.length);
        } else {
            setCenterIndex((prev) => (prev - 1 + products.length) % products.length);
        }
    };

    const getImageClass = (offset) => {
        if (offset === 0) return "carousel-img center";
        if (offset === -1 || offset === 1) return "carousel-img medium";
        return "carousel-img small";
    };

    // Modal functions
    const loginModal = () => {
        if (loginModalRef.current) {
            const modalInstance = new bootstrap.Modal(loginModalRef.current);
            modalInstance.show(); // when you want to open

            resetForm();
        }
    };

    const resetForm = () => {
        setStep(1);
        setMobileNumber("");
        setOtp(["", "", "", ""]);
        setName("");
        setEmail("");
        setLocation("");
        setErrors({
            mobile: "",
            otp: "",
            name: "",
            email: "",
            location: "",
            terms: ""
        });
    };

    // OTP functions
    const handleOtpChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const generateOTP = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    const handleRequestOTP = (e) => {
        e.preventDefault();
        if (validateMobile() && termsAccepted) {
            const otp = generateOTP();
            setGeneratedOTP(otp);
            console.log(`Demo OTP: ${otp}`);
            alert(`Your Demo OTP: ${otp}`);
            setStep(2);
            setTimer(30);
            setResendDisabled(true);
        }
    };

    const handleResendOTP = () => {
        const newOTP = generateOTP();
        setGeneratedOTP(newOTP);
        console.log(`New Demo OTP: ${newOTP}`);
        alert(`Your Demo OTP: ${newOTP}`);
        setTimer(30);
        setResendDisabled(true);
        setOtp(["", "", "", ""]);
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        const enteredOTP = otp.join("");

        if (!enteredOTP) {
            setErrors({ ...errors, otp: "OTP is required" });
            return;
        }

        if (enteredOTP.length !== 4) {
            setErrors({ ...errors, otp: "Enter a valid 4-digit OTP" });
            return;
        }

        if (enteredOTP === generatedOTP) {
            setErrors({ ...errors, otp: "" });
            setStep(3);
        } else {
            setErrors({ ...errors, otp: "Invalid OTP. Please try again." });
        }
    };

    // Validation functions
    const validateMobile = () => {
        if (!mobileNumber) {
            setErrors({ ...errors, mobile: "Mobile number is required" });
            return false;
        }
        if (mobileNumber.length !== 10) {
            setErrors({ ...errors, mobile: "Enter a valid 10-digit mobile number" });
            return false;
        }
        setErrors({ ...errors, mobile: "" });
        return true;
    };

    const validateSignUp = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!name) {
            newErrors.name = "Name is required";
            valid = false;
        } else {
            newErrors.name = "";
        }

        if (!email) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Enter a valid email address";
            valid = false;
        } else {
            newErrors.email = "";
        }

        if (!location) {
            newErrors.location = "Location is required";
            valid = false;
        } else {
            newErrors.location = "";
        }

        setErrors(newErrors);
        return valid;
    };

    // API functions
    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validateSignUp()) return;

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobile: mobileNumber,
                    location
                }),
            });

            const data = await response.json();
            console.log("Full signup response:", data); // ✅

            if (!response.ok && response.status !== 200) {
                throw new Error(data.message || 'Registration failed');
            }


            sessionStorage.setItem('user', JSON.stringify({
                userId: data.user._id,
                Name: data.user.name,
                Mobile: data.user.mobile
            }));
            setUser(data.user);

            const modalEl = loginModalRef.current;
            if (modalEl) {
                let modalInstance = bootstrap.Modal.getInstance(modalEl);
                if (!modalInstance) {
                    modalInstance = new bootstrap.Modal(modalEl);
                }
                modalInstance.hide();
            }


            navigate('/dashboard');


        } catch (error) {
            setErrors(prev => ({
                ...prev,
                form: error.message
            }));
            console.error('Registration error:', error);
        }
    };

    // UI handlers
    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const handleImageClick = () => {
        alert('Clicked New Arrival Product!!!!');
    };

    const handleNewArrivals = () => {
        alert('Clicked on New Arrivals Page!!!');
    };



    const [showAll, setShowAll] = useState(false);

    const visibleCategories = showAll ? categories : categories.slice(0, 4);

    return (
        <>
            <Navbar user={user} onLogin={loginModal} onLogout={handleLogout} />

            <div className="container-fluid p-0 mt-0">
                <div className="bg-danger text-white py-2  ">
                    <marquee behavior="scroll" direction="left" scrollamount="6" className="fw-semibold">
                        <i className="fa-solid fa-envelope me-2"></i>20+ Visiting Cards &nbsp;&nbsp;&nbsp;
                        <i className="fa-solid fa-envelope me-2"></i>30+ Wedding Cards &nbsp;&nbsp;&nbsp;
                        <i className="fa-solid fa-envelope me-2"></i>20+ Invitation Cards &nbsp;&nbsp;&nbsp;
                        <i className="fa-solid fa-envelope me-2"></i>10+ Mixing Job Cards &nbsp;&nbsp;&nbsp;
                        <i className="fa-solid fa-envelope me-2"></i>20+ Flute Board Printing Cards &nbsp;&nbsp;&nbsp;
                        <i className="fa-solid fa-envelope me-2"></i>30+ Special Cards
                    </marquee>
                </div>
            </div>

            <div className="container-fluid p-0 position-relative">
                {/* Carousel Background with Auto Scroll */}
                <div
                    id="weddingCarousel"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                    data-bs-interval="3000"   // Auto-scroll every 3 seconds
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="https://img.freepik.com/free-vector/gradient-golden-floral-wedding-invitation_52683-60511.jpg"
                                className="d-block w-100"
                                alt="Slide 1"
                                style={{ height: '100vh', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44893.jpg"
                                className="d-block w-100"
                                alt="Slide 2"
                                style={{ height: '100vh', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://img.freepik.com/free-vector/indian-wedding-invitation_52683-44378.jpg"
                                className="d-block w-100"
                                alt="Slide 3"
                                style={{ height: '100vh', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Dark Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }}></div>

                {/* Text Content Left-Aligned */}
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ zIndex: 2 }}>
                    <div className="container px-4">
                        <div className="row">
                            <div className="col-sm-12 text-white">
                                <h1 className="fw-bold mb-4">Find The Best Frame For Treasured Moments.</h1>
                                <p className="mb-4">
                                    Elevate your brand with premium card printing—custom designs, high-quality materials, and cutting-edge technology tailored to your needs.
                                    From offset to digital, we choose the ideal technique based on time, color, quantity, and finish for perfect, vibrant results every time.
                                </p>
                                <button
                                    className="btn btn-lg"
                                    style={{
                                        background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                                        color: 'white',
                                    }}
                                    onClick={loginModal}
                                >
                                    Login Now
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
                                onClick={loginModal}
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
                            onClick={loginModal}
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
                                        onClick={offset === 0 ? loginModal : undefined}
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

            {/* Free Cards */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h2 className="mb-4" style={{ cursor: "pointer" }}>Free Wedding Cards</h2>
                    </div>
                </div>
                <br />
                <div className="row g-4">
                    {freeCards.map((card) => (
                        <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3" onClick={loginModal}>
                            <div className="card position-relative border-0 shadow-sm free-card" style={{ overflow: 'hidden' }}>
                                <img
                                    src={card.image}
                                    className="card-img-top"
                                    alt={card.name}
                                    style={{ height: "300px", objectFit: "cover", borderRadius: "10px" }}
                                />
                                <div className="p-3">
                                    <h5 className="card-title">{card.name}</h5>
                                    <p className="text-success fw-bold">{card.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Cards */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h2 className="mb-4" style={{ cursor: "pointer" }}>Premium Wedding Cards</h2>
                    </div>
                </div>
                <br />
                <div className="row g-4">
                    {premiumCards.map((card) => (
                        <div key={card.id} className="col-12 col-sm-6 col-md-4 col-lg-3" onClick={loginModal}>
                            <div className="card position-relative border-0 premium-card" style={{ overflow: 'hidden', background: '#1e1e1e' }}>
                                <div className="premium-ribbon">Premium</div>
                                <img
                                    src={card.image}
                                    className="card-img-top"
                                    alt={card.name}
                                    style={{ height: "300px", objectFit: "cover", borderRadius: "10px" }}
                                />
                                <div className="p-3 text-white">
                                    <h5 className="card-title">{card.name}</h5>
                                    <p className="text-warning fw-bold">{card.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Offers */}
            <div className="container-fluid p-5">
                <div className="row align-items-center text-center text-md-start">
                    <div className="col-12 col-md-4">
                        <h3 className="mb-4">Offers</h3>
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
                                    <h5 className="card-title">{offer.title}</h5>
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
                        <h3 className="mb-4">Best Sellers</h3>
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
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="text-warning fw-bold">{card.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/*Reviews Section */}
            <div className="container-fluid py-5 bg-light">
                <div className="container">
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
                            onClick={() => scrollByAmount(-320)}>
                            &#8592;
                        </button>
                        <button
                            className="btn me-2"
                            style={{
                                background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                                color: 'white',
                            }}
                            onClick={() => scrollByAmount(320)}>
                            &#8594;
                        </button>
                    </div>

                    {/* Horizontal Scroll Container */}
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
                                            src={review.image}
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
                                    <p className="card-text small">"{review.text}"</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Reviews Button */}
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


            {/* Login Modal */}
            <div className="modal fade" id="loginModal" ref={loginModalRef} tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content" style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        overflow: 'hidden'
                    }}>
                        {/* SIGN-IN FORM */}
                        {step === 1 && (
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-start text-white justify-content-center min-vh-100 p-4 home1">
                                        <h2>Login</h2>
                                        <p>Get access to your Orders, Wishlist and Recommendations</p>
                                        <img src={loginpng} className="img-fluid" alt="Login" />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center min-vh-100 text-white p-4 text-center"
                                        style={{ backgroundColor: "Transparent" }}>
                                        <form className="w-75" onSubmit={handleRequestOTP}>
                                            <label htmlFor="mobile" className="form-label">Enter Your Mobile Number</label>
                                            <input
                                                type="tel"
                                                className="form-control mb-3 w-100"
                                                placeholder="Mobile"
                                                name="mobile"
                                                maxLength={10}
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                                required
                                            />
                                            {errors.mobile && <div className="text-danger mb-3">{errors.mobile}</div>}

                                            <button
                                                className="btn btn-success btn-lg w-100"
                                                style={{ background: "linear-gradient(45deg, #DE2B59, #F8483C)" }}
                                                type="submit"
                                            >
                                                Request OTP
                                            </button>
                                            <br />
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="termsCheckbox"
                                                    checked={termsAccepted}
                                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="termsCheckbox">
                                                    By continuing, you agree to OD Card's <a href="#" target="_blank">Terms & Conditions</a> and <a href="#" target="_blank">Privacy Policy</a>
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* OTP VERIFICATION */}
                        {step === 2 && (
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-start text-white justify-content-center min-vh-100 p-4 home1">
                                        <h2>Verify OTP</h2>
                                        <p>Get access to your Orders, Wishlist and Recommendations</p>
                                        <img src={loginpng} className="img-fluid" alt="OTP Verification" />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center min-vh-100 text-white p-4 text-center"
                                        style={{ background: 'transparent' }}>
                                        <form className="w-75" onSubmit={handleVerifyOTP}>
                                            <label htmlFor="otp" className="form-label">Enter OTP</label>
                                            <div className="d-flex justify-content-between mb-3">
                                                {otp.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        id={`otp-${index}`}
                                                        type="text"
                                                        className="form-control text-center mx-1"
                                                        style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}
                                                        maxLength={1}
                                                        value={digit}
                                                        onChange={(e) => handleOtpChange(index, e)}
                                                        required
                                                    />
                                                ))}
                                            </div>
                                            {errors.otp && <div className="text-danger mb-3">{errors.otp}</div>}

                                            <div className="mb-3">
                                                {resendDisabled ? (
                                                    <span>Resend OTP in {timer} seconds</span>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="btn btn-link"
                                                        onClick={handleResendOTP}
                                                    >
                                                        Resend OTP
                                                    </button>
                                                )}
                                            </div>

                                            <button
                                                className="btn btn-success btn-lg w-100"
                                                style={{ background: "linear-gradient(45deg, #DE2B59, #F8483C)" }}
                                                type="submit"
                                            >
                                                Verify OTP
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SIGN-UP FORM */}
                        {step === 3 && (
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-start text-white justify-content-center min-vh-100 p-4 home1">
                                        <h2>Sign Up</h2>
                                        <p>Get access to your Orders, Wishlist and Recommendations</p>
                                        <img src={loginpng} className="img-fluid" alt="Sign Up" />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center min-vh-100 text-white p-4 text-center"
                                        style={{ background: 'transparent' }}>
                                        <form className="w-75" onSubmit={handleSignUp}>
                                            <label htmlFor="signup" className="form-label">Enter Your Details</label>
                                            <input
                                                type="text"
                                                className="form-control mb-3 w-100"
                                                placeholder="Name"
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                            {errors.name && <div className="text-danger mb-3">{errors.name}</div>}

                                            <input
                                                type="email"
                                                className="form-control mb-3 w-100"
                                                placeholder="Email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            {errors.email && <div className="text-danger mb-3">{errors.email}</div>}

                                            <input
                                                type="tel"
                                                className="form-control mb-3 w-100"
                                                placeholder="Mobile Number"
                                                name="mobile"
                                                value={mobileNumber}
                                                readOnly
                                                maxLength={10}
                                                required
                                            />

                                            <select
                                                className="form-select mb-3 w-100"
                                                name="location"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                required
                                            >
                                                <option value="">Select Location</option>
                                                <option value="hyderabad">Hyderabad</option>
                                                <option value="bengaluru">Bengaluru</option>
                                                <option value="chennai">Chennai</option>
                                            </select>
                                            {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                                            <button
                                                className="btn btn-success btn-lg w-100"
                                                style={{ background: "linear-gradient(45deg, #DE2B59, #F8483C)" }}
                                                type="submit"
                                            >
                                                Sign Up
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Home;