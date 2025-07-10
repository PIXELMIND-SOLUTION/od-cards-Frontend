import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../views/Navbar';
import Footer from '../views/Footer';

const ReadyMadeCards = () => {
  const navigate = useNavigate();
  const [selectedQuantity, setSelectedQuantity] = useState('Select Quantity & Price');
  const [cardDetails] = useState({
    id: 1,
    title: "One Side Trump Visiting Card's",
    price: 200,
    image: "https://img.freepik.com/free-vector/gradient-golden-floral-wedding-invitation_52683-60511.jpg",
    description: "Standard glossy or matte paper included"
  });
  const [uploadedDesign, setUploadedDesign] = useState(null);

  const handleProceed = () => {
    const [quantity, price] = selectedQuantity.includes('Select')
      ? [100, 200] // Default values if nothing selected
      : selectedQuantity.split(' - ').map(item => item.replace(' Cards', '').replace('₹', '').trim());

    const cartItem = {
      ...cardDetails,
      quantity: parseInt(quantity),
      price: parseInt(price)
    };

    navigate('/dashboard/mycart', { state: { newItem: cartItem } });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Optionally, check file type and size
      if (file.type.startsWith('image/')) {
        setUploadedDesign(URL.createObjectURL(file)); // Store the image URL for preview
        // You could also send the file to the server here if needed
      } else {
        alert('Please upload a valid image file');
      }
    }
  };

  return (
    <div>
      <Navbar />

      {/* PRODUCT DETAILS */}
      <section className="bg-light py-4">
        <div className="container">
          <div className="bg-white rounded shadow-sm p-4 d-md-flex">
            <div className="col-md-4 mb-3">
              <img src={cardDetails.image} alt="Card Sample" className="img-fluid rounded" />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <div className="col-md-8 ps-md-4">
                <h5 className="fw-bold">{cardDetails.title}</h5>
                <ul className="list-unstyled">
                  <li>📌 {cardDetails.description}</li>
                  <li>📌 Final card size will be 8.9 cm * 5.1 cm</li>
                  <li>📌 Design must stretch to the bleed area</li>
                </ul>
                <div className="position-relative">
                  <div className="d-flex gap-3 flex-wrap mt-3 justify-content-start">
                    {/* Upload Design Button */}
                    <button
                      className="btn btn-outline-danger px-4 py-2"
                      onClick={() => document.getElementById('upload-input').click()} // Triggers file input
                    >
                      Upload Design
                    </button>
                    {/* File input for design upload */}
                    <input
                      type="file"
                      id="upload-input"
                      className="d-none"
                      onChange={handleFileUpload}
                    />
                    {/* Display uploaded design (optional preview) */}
                    {uploadedDesign && (
                      <div className="mt-3">
                        <h6>Uploaded Design Preview:</h6>
                        <img src={uploadedDesign} alt="Design Preview" className="img-fluid" />
                      </div>
                    )}
                    <select
                      className="form-select w-auto"
                      value={selectedQuantity}
                      onChange={(e) => setSelectedQuantity(e.target.value)}
                    >
                      <option>Select Quantity & Price</option>
                      <option>100 Cards - ₹200</option>
                      <option>200 Cards - ₹380</option>
                      <option>500 Cards - ₹900</option>
                    </select>
                    <button
                      className="btn btn-danger px-4 py-2"
                      onClick={handleProceed}
                    >
                      Proceed
                    </button>
                  </div>
                  <button
                    className="btn ms-auto px-4 py-2 position-absolute top-0 end-0"
                    style={{
                      background: 'linear-gradient(to right, #F8483C, #DE2B59)', // Gradient background
                      color: 'white',
                      border: 'none' // Optional: removes the default border if needed
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Related Products</h4>
          <a href="#" className="text-decoration-none">View all →</a>
        </div>
        <div className="row g-4">
          {[1, 2, 3, 4].map((_, i) => (
            <div className="col-md-3" key={i}>
              <div className="card">
                <img
                  src="https://img.freepik.com/free-vector/floral-engagement-invitation-template_52683-44893.jpg"
                  className="card-img-top"
                  alt="Related Product"
                />
                <div className="card-body text-center">
                  <p className="card-text">Product {i + 1}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReadyMadeCards;
