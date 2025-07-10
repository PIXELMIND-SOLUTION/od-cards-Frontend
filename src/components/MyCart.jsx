import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";
import axios from "axios";

const MyCart = () => {
  const location = useLocation();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    type: "Home",
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);

  const savedUser = JSON.parse(sessionStorage.getItem('user'));
  const userId = savedUser?.userId;

  // Fetch saved addresses from the API
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/addresses/${userId}`)
        .then((response) => {
          setSavedAddresses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching addresses:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (location.state?.newItem) {
      const newItem = { ...location.state.newItem, quantity: 1 };
      setCartItems((prevItems) => [...prevItems, newItem]);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) || 1 } : item
      )
    );
  };

  const priceDetails = {
    itemsPrice: cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0),
    discount: 500,
    delivery: 40,
  };
  priceDetails.total = priceDetails.itemsPrice - priceDetails.discount + priceDetails.delivery;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = () => {
    setShowAddressForm(true);
  };

  const handleAddAddress = () => {
    axios.post(`http://localhost:5000/api/addresses/${userId}`, address)
      .then((response) => {
        setSavedAddresses((prev) => [...prev, response.data]);
        setShowAddressForm(false);
        setAddress({
          name: "",
          email: "",
          mobileNumber: "",
          addressline1: "",
          addressline2: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
          type: "Home",
        });
      })
      .catch((error) => {
        console.error("Error adding address:", error);
      });
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleDeleteAddress = (id) => {
    axios.delete(`http://localhost:5000/api/addresses/${userId}/${id}`)
      .then(() => {
        setSavedAddresses(savedAddresses.filter((address) => address._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddress({ ...address });
    setShowAddressForm(true);
  };

  const handleUpdateAddress = () => {
    axios.put(`http://localhost:5000/api/addresses/${userId}/${editingAddress._id}`, address)
      .then((response) => {
        setSavedAddresses((prev) =>
          prev.map((addr) => (addr._id === editingAddress._id ? response.data : addr))
        );
        setEditingAddress(null);
        setShowAddressForm(false);
        setAddress({
          name: "",
          email: "",
          mobileNumber: "",
          addressline1: "",
          addressline2: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
          type: "Home",
        });
      })
      .catch((error) => {
        console.error("Error updating address:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h3 className="fw-bold mb-4">
          <i className="fa fa-shopping-cart me-2"></i>My Cart
        </h3>

        {cartItems.length === 0 ? (
          <p>No items in your cart</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={item.id || index} className="d-flex mb-4 border-bottom pb-4">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: 140, height: 140 }}
                className="me-3"
              />
              <div className="flex-grow-1">
                <h5 className="fw-bold">{item.title}</h5>
                <select
                  className="form-select w-auto my-2"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 10, 25, 50, 100].map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
                <p className="text-muted mb-2">Delivery by 26 Feb</p>
                <p className="fw-bold">
                  Total: ₹ {item.price * (item.quantity || 1)}
                </p>
                <button
                  className="btn me-2"
                  style={{
                    background: "linear-gradient(to right, #F8483C, #DE2B59)",
                    color: "white",
                  }}
                >
                  Buy this Now
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        <div className="row mt-5">
          <div className="col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Price Details</h5>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                Price ({cartItems.length} item)
                <span>₹ {priceDetails.itemsPrice}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Discount <span className="text-success">-₹ {priceDetails.discount}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                Delivery Charges <span>₹ {priceDetails.delivery}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between fw-bold">
                Total <span>₹ {priceDetails.total}</span>
              </li>
            </ul>
            <p className="text-success mt-2">You save ₹ 20 on this order</p>
          </div>

          <div className="col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Delivery Details</h5>

            {!showAddressForm ? (
              <>
                <div className="mb-3">
                  {savedAddresses.length === 0 ? (
                    <p>No saved addresses</p>
                  ) : (
                    savedAddresses.map((addr, index) => (
                      <div
                        key={addr._id || index}
                        className={`border p-3 mb-2 rounded`}
                        onClick={() => handleSelectAddress(addr)}
                        style={{
                          background: selectedAddress?._id === addr._id
                            ? "linear-gradient(to right, #F8483C, #DE2B59)"
                            : "",
                          color: selectedAddress?._id === addr._id ? "white" : "inherit",
                          cursor: "pointer",
                        }}
                      >

                        <div className="fw-bold">
                          {addr.name} ({addr.type})
                        </div>
                        <div>
                          {addr.addressline1}, {addr.city} - {addr.pincode}
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(addr._id);
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        <button
                          className="btn btn-outline-warning btn-sm mt-2 ms-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAddress(addr);
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleProceed}
                >
                  Add New Address
                </button>
              </>
            ) : (
              <>
                <h5 className="fw-bold">{editingAddress ? "Edit" : "Add New"} Address</h5>
                <form>
                  <input
                    type="text"
                    name="name"
                    className="form-control mb-3"
                    placeholder="Full Name"
                    value={address.name}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={address.email}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    type="tel"
                    name="mobileNumber"
                    className="form-control mb-3"
                    placeholder="Mobile Number"
                    value={address.mobileNumber}
                    onChange={handleAddressChange}
                    required
                  />
                  <textarea
                    name="addressline1"
                    className="form-control mb-3"
                    placeholder="Address Line 1"
                    value={address.addressline1}
                    onChange={handleAddressChange}
                    required
                  />
                  <textarea
                    name="addressline2"
                    className="form-control mb-3"
                    placeholder="Address Line 2 (Optional)"
                    value={address.addressline2}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    name="city"
                    className="form-control mb-3"
                    placeholder="City"
                    value={address.city}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    className="form-control mb-3"
                    placeholder="State"
                    value={address.state}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    type="text"
                    name="pincode"
                    className="form-control mb-3"
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    className="form-control mb-3"
                    placeholder="Country"
                    value={address.country}
                    onChange={handleAddressChange}
                    required
                  />
                  <select
                    name="type"
                    className="form-select mb-3"
                    value={address.type}
                    onChange={handleAddressChange}
                    required
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setShowAddressForm(false);
                        setEditingAddress(null);
                        setAddress({
                          name: "",
                          email: "",
                          mobileNumber: "",
                          addressline1: "",
                          addressline2: "",
                          city: "",
                          state: "",
                          pincode: "",
                          country: "India",
                          type: "Home",
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                    >
                      {editingAddress ? "Update" : "Add"} Address
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCart;