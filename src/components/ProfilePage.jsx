import React, { useState, useEffect } from 'react';
import Navbar from '../views/Navbar';
import Footer from '../views/Footer';
import axios from 'axios';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    mobile: '',
    location: 'none'
  });

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    addressline1: '',
    addressline2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    type: 'Home'
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editAddress, setEditAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const savedUser = JSON.parse(sessionStorage.getItem('user'));
  const userId = savedUser?.userId;

  useEffect(() => {
    if (!userId) {
      setMessage('User not found in sessionStorage.');
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://od-cards-backend-z494.onrender.com/api/users/user/${userId}`);
        setUserInfo({
          name: res.data.user.name || '',
          email: res.data.user.email || '',
          mobile: res.data.user.mobile || '',
          location: res.data.user.location || 'none'
        });

        const addressesRes = await axios.get(`https://od-cards-backend-z494.onrender.com/api/addresses/${userId}`);
        setAddresses(addressesRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setMessage('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleAddAddress = async () => {
    if (
      newAddress.name && newAddress.email && newAddress.mobileNumber &&
      newAddress.addressline1 && newAddress.city && newAddress.state &&
      newAddress.pincode && newAddress.country
    ) {
      try {
        const res = await axios.post(`https://od-cards-backend-z494.onrender.com/api/addresses/${userId}`, newAddress);
        setAddresses([...addresses, res.data]);
        setShowAddressForm(false);
        setNewAddress({
          name: '',
          email: '',
          mobileNumber: '',
          addressline1: '',
          addressline2: '',
          city: '',
          state: '',
          pincode: '',
          country: 'India',
          type: 'Home'
        });
      } catch (err) {
        console.error('Add address error:', err);
        setMessage('Failed to add address.');
      }
    }
  };

  const handleEditAddressSave = async () => {
    try {
      const updated = await axios.put(
        `https://od-cards-backend-z494.onrender.com/api/addresses/${userId}/${addresses[editingIndex]._id}`,
        editAddress
      );
      const updatedAddresses = [...addresses];
      updatedAddresses[editingIndex] = updated.data;
      setAddresses(updatedAddresses);
      setEditAddress(null);
      setEditingIndex(null);
    } catch (err) {
      console.error('Edit address error:', err);
      setMessage('Failed to update address.');
    }
  };

  const handleDeleteAddress = async (index) => {
    try {
      const idToDelete = addresses[index]._id;
      await axios.delete(`https://od-cards-backend-z494.onrender.com/api/addresses/${userId}/${idToDelete}`);
      const updated = addresses.filter((_, idx) => idx !== index);
      setAddresses(updated);
    } catch (err) {
      console.error('Delete address error:', err);
      setMessage('Failed to delete address.');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://od-cards-backend-z494.onrender.com/api/users/updateuser/${userId}`, userInfo);
      setUserInfo(res.data.user);
      setMessage('User updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Update error:', err);
      setMessage(err.response?.data?.message || 'Failed to update user.');
    }
  };

  if (loading) return <div>Loading user...</div>;

  return (
    <>
      <Navbar />
      <div className="container py-5">
        {message && <div className="alert alert-info mb-4">{message}</div>}
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-4 mb-4">
            <div className="card p-4 shadow-sm rounded-4 text-center mb-4">
              <div className="bg-light rounded-circle p-3 mb-3">
                <i className="fa fa-user fa-2x text-secondary"></i>
              </div>
              <h5 className="fw-bold">{userInfo.name}</h5>
              <p className="text-muted small mb-0">{userInfo.email}</p>
            </div>
            <div className="card shadow-sm rounded-4">
              <ul className="nav flex-column p-3">
                {['profile', 'address'].map((tab) => (
                  <li key={tab} className="nav-item mb-2">
                    <button
                      className={`nav-link w-100 text-start ${activeTab === tab ? 'active' : ''}`}
                      style={{
                        background: activeTab === tab ? 'linear-gradient(to right, #F8483C, #DE2B59)' : '',
                        color: activeTab === tab ? 'white' : 'black',
                        fontWeight: '500',
                        borderRadius: '8px'
                      }}
                      onClick={() => {
                        setActiveTab(tab);
                        setShowAddressForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      <i className={`me-2 ${tab === 'profile' ? 'fa fa-user' : 'fa fa-map-marker-alt'}`}></i>
                      {tab === 'profile' ? 'Profile Info' : 'My Addresses'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="col-md-8">
            <div className="card p-4 shadow-sm rounded-4">
              {activeTab === 'profile' && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold">Profile Information</h5>
                    <button
                      className={`btn btn-sm ${isEditing ? '' : 'btn-outline-secondary'}`}
                      onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                      style={isEditing ? { background: 'linear-gradient(to right, #F8483C, #DE2B59)', color: 'white' } : {}}
                    >
                      {isEditing ? 'Save' : 'Edit'}
                    </button>
                  </div>
                  <form className="row g-3">
                    {['name', 'email', 'mobile'].map((field) => (
                      <div key={field} className="col-12">
                        <label className="form-label small text-muted">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          className="form-control rounded-3"
                          value={userInfo[field]}
                          disabled={!isEditing}
                          onChange={(e) => setUserInfo({ ...userInfo, [field]: e.target.value })}
                        />
                      </div>
                    ))}
                    <div className="col-12">
                      <label className="form-label small text-muted">Location</label>
                      <select
                        className="form-control rounded-3"
                        value={userInfo.location}
                        disabled={!isEditing}
                        onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                      >
                        <option value="none" disabled>Select Location</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Chennai">Chennai</option>
                      </select>
                    </div>
                  </form>
                </>
              )}

              {activeTab === 'address' && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold">Saved Addresses</h5>
                    {!showAddressForm && editingIndex === null && (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          setShowAddressForm(true);
                          setNewAddress({
                            ...newAddress,
                            name: userInfo.name,
                            email: userInfo.email,
                            mobileNumber: userInfo.mobile
                          });
                        }}
                      >
                        <i className="fa fa-plus me-2"></i>Add Address
                      </button>
                    )}
                  </div>

                  {addresses.length > 0 ? (
                    addresses.map((addr, idx) => (
                      <div key={addr._id || idx} className="border p-3 rounded-3 mb-3 bg-light position-relative">
                        <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
                          <button className="btn btn-sm btn-outline-warning" onClick={() => {
                            setEditAddress({ ...addr });
                            setEditingIndex(idx);
                            setShowAddressForm(false);
                          }}>
                            <i className="fa fa-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteAddress(idx)}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                        <h6 className="fw-bold">{addr.type}</h6>
                        <p className="text-muted">{`${addr.addressline1}, ${addr.addressline2}, ${addr.city}, ${addr.state}, ${addr.pincode}, ${addr.country}`}</p>
                        <p className="text-muted">{`${addr.name} | ${addr.mobileNumber} | ${addr.email}`}</p>
                      </div>
                    ))
                  ) : (
                    <p>No addresses found. Please add a new address.</p>
                  )}

                  {showAddressForm && (
                    <div className="mb-3">
                      <h6>New Address</h6>
                      <form className="row g-3">
                        {Object.entries(newAddress).map(([key, value]) => (
                          <div key={key} className="col-12">
                            <label className="form-label small text-muted">
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/[A-Z]/g, ' $&')}
                            </label>
                            {key === 'type' ? (
                              <select
                                className="form-select rounded-3"
                                value={value}
                                onChange={(e) => setNewAddress({ ...newAddress, [key]: e.target.value })}
                              >
                                <option value="Home">Home</option>
                                <option value="Office">Office</option>
                                <option value="Other">Other</option>
                              </select>
                            ) : (
                              <input
                                type="text"
                                className="form-control rounded-3"
                                value={value}
                                onChange={(e) => setNewAddress({ ...newAddress, [key]: e.target.value })}
                              />
                            )}
                          </div>
                        ))}
                      </form><br/>
                      <div className="text-end">
                        <button className="btn btn-md" style={{background: 'linear-gradient(to right, #F8483C, #DE2B59)'}} onClick={handleAddAddress}>Save Address</button>
                        <button className="btn btn-outline-dark ms-2" onClick={() => setShowAddressForm(false)}>Cancel</button>
                      </div>
                    </div>
                  )}

                  {editingIndex !== null && editAddress && (
                    <div className="mb-3">
                      <h6>Edit Address</h6>
                      <form className="row g-3">
                        {Object.entries(editAddress)
                          .filter(([key]) => !['_id', 'id', 'userId', '__v', 'createdAt', 'updatedAt'].includes(key))
                          .map(([key, value]) => (
                            <div key={key} className="col-12">
                              <label className="form-label small text-muted">
                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/[A-Z]/g, ' $&')}
                              </label>
                              {key === 'type' ? (
                                <select
                                  className="form-select rounded-3"
                                  value={value}
                                  onChange={(e) => setEditAddress({ ...editAddress, [key]: e.target.value })}
                                >
                                  <option value="Home">Home</option>
                                  <option value="Office">Office</option>
                                  <option value="Other">Other</option>
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  className="form-control rounded-3"
                                  value={value}
                                  onChange={(e) => setEditAddress({ ...editAddress, [key]: e.target.value })}
                                />
                              )}
                            </div>
                          ))}
                      </form>
                      <div className="text-end">
                        <button className="btn btn-primary" onClick={handleEditAddressSave}>Update Address</button>
                        <button
                          className="btn btn-outline-secondary ms-2"
                          onClick={() => {
                            setEditingIndex(null);
                            setEditAddress(null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;