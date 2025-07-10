import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const products = [
        {
            id: 1,
            name: "Business Card - Abstract Design",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44899.jpg",
            description: "A sleek and creative business card design with a modern abstract polygon style. Perfect for creative professionals who want to make a bold statement. The design features a vibrant color gradient that catches the eye while maintaining professionalism.",
            price: 20.00,
            category: "Business Cards",
            features: [
                "Premium matte finish",
                "Standard size: 3.5 × 2 inches",
                "Printed on 300gsm card stock",
                "UV spot coating available"
            ]
        },
        {
            id: 2,
            name: "Classic Business Card",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44898.jpg",
            description: "A timeless and professional business card design suitable for any industry. The clean layout and elegant typography ensure your contact information is easily readable while projecting confidence and reliability.",
            price: 15.00,
            category: "Business Cards",
            features: [
                "Classic white or ivory stock",
                "Optional rounded corners",
                "Available in matte or glossy finish",
                "Quick turnaround printing"
            ]
        },
        {
            id: 3,
            name: "Luxury Gold Business Card",
            image: "https://img.freepik.com/free-vector/elegant-wedding-invitation-template_52683-44897.jpg",
            description: "A luxurious business card with gold foil accents, perfect for high-end professionals and businesses. This design stands out with a sophisticated touch, ideal for making an unforgettable first impression.",
            price: 40.00,
            category: "Business Cards",
            features: [
                "Gold foil accents",
                "Customizable with logos",
                "High-quality 400gsm card stock",
                "Available with matte or gloss finish"
            ]
        },
        {
            id: 4,
            name: "Minimalist Business Card",
            image: "https://img.freepik.com/free-vector/modern-business-card-template_52683-44896.jpg",
            description: "A clean and minimalist business card design that focuses on the essentials. Ideal for professionals who appreciate simplicity and elegance in their brand presentation.",
            price: 12.00,
            category: "Business Cards",
            features: [
                "Simple and clean design",
                "Customizable font and color options",
                "Printed on premium 350gsm cardstock",
                "Available with matte or glossy finish"
            ]
        },
        {
            id: 5,
            name: "Wedding Invitation Card",
            image: "https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44895.jpg",
            description: "Elegant and romantic wedding invitation card design. Featuring delicate floral motifs, this card exudes charm and sophistication for a memorable wedding invitation.",
            price: 30.00,
            category: "Wedding Cards",
            features: [
                "High-quality paper with floral print",
                "Customizable text options",
                "Matching envelopes included",
                "Available in both glossy and matte finishes"
            ]
        }
    ];

    const product = products.find(p => p.id === parseInt(id)) || {
        id: id,
        name: `Product ${id}`,
        description: "This is a detailed description of the product.",
        price: 20.00,
        category: "Generic",
        features: [
            "Standard quality",
            "Various customization options",
            "Fast delivery"
        ]
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            title: product.name,
            image: product.image,
            price: product.price,
            quantity
        };
        navigate('/dashboard/mycart', { state: { newItem: cartItem } });
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <button 
                    onClick={handleBackClick} 
                    className="btn btn-outline-secondary mb-4"
                >
                    ← Back to New Arrivals
                </button>

                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="card shadow-sm border-0 rounded">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="card-img-top rounded-top img-fluid"
                                style={{ maxHeight: "500px", objectFit: "cover" }}
                            />
                        </div>
                    </div>
                    
                    <div className="col-lg-6">
                        <div className="card shadow-sm border-0 rounded p-4">
                            <h2 className="mb-3">{product.name}</h2>
                            <p className="text-muted mb-4">{product.category}</p>
                            
                            <h4 className="text-primary mb-4">${product.price.toFixed(2)}</h4>
                            
                            <h5 className="mb-3">Description</h5>
                            <p className="mb-4">{product.description}</p>
                            
                            <h5 className="mb-3">Features</h5>
                            <ul className="mb-4">
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>

                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="form-control"
                                    style={{ maxWidth: "120px" }}
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                />
                            </div>
                            
                            <div className="d-flex gap-3">
                                <button 
                                    onClick={handleAddToCart}
                                    className="btn btn-lg flex-grow-1 py-3"
                                    style={{background: 'linear-gradient(to right, #F8483C, #DE2B59)'}}
                                >
                                    Add to Cart
                                </button>
                                <button className="btn btn-lg btn-outline-danger flex-grow-1 py-3">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductDetail;
