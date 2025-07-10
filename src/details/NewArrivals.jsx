import { useNavigate } from "react-router-dom";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";

function NewArrivals() {
    const navigate = useNavigate();
    
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

    const handleProductClick = (id) => {
        navigate(`/dashboard/new-arrivals/${id}`);
    };

    return (
        <>
        <Navbar/>
        <div className="container py-5">
            <h2 className="text-center mb-4">New Arrivals</h2>
            <div className="row g-4">
                {products.map((product) => (
                    <div key={product.id} className="col-12 col-md-4">
                        <div className="card shadow-sm border-0 rounded" onClick={() => handleProductClick(product.id)}>
                            <img src={product.image} alt={product.name} className="card-img-top rounded-top" />
                            <div className="card-body">
                                <h5 className="card-title text-truncate" style={{ maxWidth: '200px' }}>{product.name}</h5>
                                <p className="card-text text-muted">{product.description}</p>
                                <p className="card-text fw-bold text-primary">${product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <Footer/>
        </>
    );
}

export default NewArrivals;
