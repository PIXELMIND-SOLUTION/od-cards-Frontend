import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";
import OrderModal from "../details/orderModal";
import { useNavigate } from "react-router-dom";

const MixingJobs = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productSelections, setProductSelections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [numberOfOrders, setNumberOfOrders] = useState(1);

  // Define your backend base URL
  const BASE_URL = "https://od-cards-backend-z494.onrender.com";

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/products/get-cards`, {
          category: "Mixing Jobs"
        });
        
        const products = response.data.data;
        const transformedCategories = transformApiData(products);
        setCategories(transformedCategories);

        if (transformedCategories.length > 0) {
          setSelectedCategory(transformedCategories[0].category);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Transform API data into the required category-product structure
  const transformApiData = (products) => {
    const categoryMap = {};

    products.forEach(product => {
      if (!categoryMap[product.productCategory]) {
        categoryMap[product.productCategory] = {
          category: product.productCategory,
          products: []
        };
      }

      // Construct the full image URL
      let imageUrl = "https://via.placeholder.com/150";
      if (product.images && product.images.length > 0) {
        const imagePath = product.images[0];
        if (imagePath.startsWith("http")) {
          imageUrl = imagePath;
        } else {
          imageUrl = `${BASE_URL}/${imagePath.replace(/\\/g, '/')}`;
        }
      }

      // Format quantity options
      let quantityOptions = Array.isArray(product.quantity) ? product.quantity : [product.quantity];
      let quantityDisplay = quantityOptions.join(", ");
      if (quantityOptions.length > 1) {
        if (quantityOptions.includes(100) && quantityOptions.includes(1000)) {
          quantityDisplay = "100 To 1000";
        } else if (quantityOptions.includes(1000) && quantityOptions.includes(20000)) {
          quantityDisplay = "1000 To 20000";
        }
      }

      // Format card size multiplier options
      let cardSizeMultiplier = [1];
      let cardSizeMultiplierDisplay = "1";
      
      if (product.cardSizeMultiplier) {
        if (Array.isArray(product.cardSizeMultiplier)) {
          cardSizeMultiplier = product.cardSizeMultiplier;
          cardSizeMultiplierDisplay = product.cardSizeMultiplier.join(", ");
        } else if (typeof product.cardSizeMultiplier === 'number') {
          cardSizeMultiplier = [product.cardSizeMultiplier];
          cardSizeMultiplierDisplay = product.cardSizeMultiplier.toString();
        }
      }

      // Format array properties as arrays
      const formatArrayProperty = (prop) => {
        if (!prop) return [];
        if (Array.isArray(prop)) return prop;
        if (typeof prop === 'string' && prop.includes("/")) return prop.split("/").map(item => item.trim());
        return [prop];
      };

      categoryMap[product.productCategory].products.push({
        id: product._id,
        name: product.productName,
        description: `${product.productName} - ${product.productCategory}`,
        image: imageUrl,
        quantity: quantityOptions,
        quantityDisplay: quantityDisplay,
        boxPacking: product.boxPacking,
        roundCorners: product.roundCorners,
        bigSizeCard: product.bigSizeCard,
        cardSizeMultiplier: cardSizeMultiplier,
        cardSizeMultiplierDisplay: cardSizeMultiplierDisplay,
        printingType: formatArrayProperty(product.printingType),
        laminationType: formatArrayProperty(product.laminationType),
        size: formatArrayProperty(product.size),
        padding: product.padding,
        creasing: product.creasing,
        boardType: formatArrayProperty(product.boardType),
        boardThickness: formatArrayProperty(product.boardThickness),
        specialOptions: formatArrayProperty(product.specialOptions),
        paperType: formatArrayProperty(product.paperType),
        gsm: formatArrayProperty(product.gsm),
        notes: product.bigSizeCard
          ? `If Yes = Size of Card: ${cardSizeMultiplierDisplay} Card Size`
          : "Standard Size"
      });
    });

    return Object.values(categoryMap);
  };

  // Initialize selections when product changes
  useEffect(() => {
    if (selectedProduct && !productSelections[selectedProduct.id]) {
      const initialSelections = {
        quantity: selectedProduct.quantity[0]?.toString() || "",
        boxPacking: selectedProduct.boxPacking ? "Yes" : "No",
        roundCorners: selectedProduct.roundCorners ? "Yes" : "No",
        bigSizeCard: selectedProduct.bigSizeCard ? "Yes" : "No",
        cardSizeMultiplier: selectedProduct.cardSizeMultiplier[0]?.toString() || "1",
        printingType: selectedProduct.printingType[0] || "",
        laminationType: selectedProduct.laminationType[0] || "",
        size: selectedProduct.size[0] || "",
        padding: selectedProduct.padding[0] || "",
        creasing: selectedProduct.creasing ? "Yes" : "No",
        boardType: selectedProduct.boardType[0] || "",
        boardThickness: selectedProduct.boardThickness[0] || "",
        specialOptions: selectedProduct.specialOptions[0] || "",
        paperType: selectedProduct.paperType[0] || "",
        gsm: selectedProduct.gsm[0] || ""
      };

      setProductSelections(prev => ({
        ...prev,
        [selectedProduct.id]: initialSelections
      }));
    }
  }, [selectedProduct, productSelections]);

  const handleProceed = (numOrders) => {
    if (!selectedProduct) return;
    setNumberOfOrders(numOrders);

    const state = {
      product: {
        ...selectedProduct,
        selections: productSelections[selectedProduct.id] || {}
      },
      category: selectedCategory,
      numberOfOrders: numOrders
    };

    navigate("/dashboard/card-details", { state });
  };

  const handleSelectionChange = (productId, field, value) => {
    setProductSelections(prev => ({
      ...prev,
      [productId]: {
        ...(prev[productId] || {}),
        [field]: value
      }
    }));
  };

  const renderField = (product, key) => {
    // Skip these fields from rendering as form fields
    if (["name", "notes", "description", "image", "id", "quantityDisplay", "cardSizeMultiplierDisplay"].includes(key)) {
      return null;
    }

    // Boolean fields (Yes/No dropdown)
    if (["boxPacking", "roundCorners", "bigSizeCard", "creasing"].includes(key)) {
      return (
        <div className="mb-3">
          <label className="form-label fw-semibold">
            {key.replace(/([A-Z])/g, " $1").trim()}:
          </label>
          <select
            className="form-select form-select-sm"
            value={productSelections[product.id]?.[key] || "No"}
            onChange={(e) => handleSelectionChange(product.id, key, e.target.value)}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {key === "bigSizeCard" && productSelections[product.id]?.[key] === "Yes" && (
            <div className="mt-2">
              <label className="form-label fw-semibold">Card Size Multiplier:</label>
              <select
                className="form-select form-select-sm"
                value={productSelections[product.id]?.cardSizeMultiplier || "1"}
                onChange={(e) => handleSelectionChange(product.id, "cardSizeMultiplier", e.target.value)}
              >
                {Array.from({length: product.cardSizeMultiplier[product.cardSizeMultiplier.length - 1] - 1}, (_, i) => i + 2)
                  .filter(num => num <= product.cardSizeMultiplier[product.cardSizeMultiplier.length - 1])
                  .map(num => (
                    <option key={num} value={num}>{num} Cards Size</option>
                  ))}
              </select>
            </div>
          )}
        </div>
      );
    }

    // Array fields (dropdown)
    if (Array.isArray(product[key])) {
      // Skip empty arrays
      if (product[key].length === 0) return null;

      return (
        <div className="mb-3">
          <label className="form-label fw-semibold">
            {key.replace(/([A-Z])/g, " $1").trim()}:
          </label>
          <select
            className="form-select form-select-sm"
            value={productSelections[product.id]?.[key] || product[key][0]}
            onChange={(e) => handleSelectionChange(product.id, key, e.target.value)}
          >
            {product[key].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    }

    // Quantity field (special case)
    if (key === "quantity") {
      return (
        <div className="mb-3">
          <label className="form-label fw-semibold">Quantity:</label>
          <select
            className="form-select form-select-sm"
            value={productSelections[product.id]?.[key] || product.quantity[0]?.toString()}
            onChange={(e) => handleSelectionChange(product.id, key, e.target.value)}
          >
            {product.quantity.map(num => (
              <option key={num} value={num}>{num.toLocaleString()}</option>
            ))}
          </select>
        </div>
      );
    }

    // Simple display fields (readonly)
    return (
      <div className="mb-3">
        <label className="form-label fw-semibold">
          {key.replace(/([A-Z])/g, " $1").trim()}:
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          value={product[key] || ""}
          readOnly
        />
      </div>
    );
  };

  const currentCategoryProducts = categories.find(cat => cat.category === selectedCategory)?.products || [];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mx-auto mt-5" style={{ maxWidth: "500px" }}>
        Error loading products: {error}
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container my-3 my-md-5">
        <h2 className="text-center fw-bold mb-3 mb-md-4" style={{ color: "#DF2C58" }}>Mixing Jobs</h2>

        <div className="row">
          {/* Category List - Left Side */}
          <div className="col-12 col-md-4 mb-3 mb-md-4">
            <div className="card p-2 p-md-3 shadow-sm" style={{ borderColor: "#DF2C58" }}>
              <h5 className="fw-semibold text-center mb-2 mb-md-3 text-danger">Categories</h5>
              {isMobile ? (
                <div className="d-flex flex-wrap gap-2 mb-3 overflow-auto pb-2">
                  {categories.map((cat, idx) => {
                    const isActive = selectedCategory === cat.category;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedCategory(cat.category);
                          setSelectedProduct(null);
                        }}
                        className={`btn btn-sm rounded-pill ${
                          isActive ? 'active text-white' : 'text-danger'
                        }`}
                        style={{
                          whiteSpace: 'nowrap',
                          color: isActive ? 'white' : '#DF2C58',
                          background: isActive
                            ? "linear-gradient(to right, #DF2C58, #FF688D)"
                            : 'transparent',
                          border: '1px solid #DF2C58',
                          transition: "all 0.3s ease"
                        }}
                      >
                        {cat.category}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="d-flex flex-row flex-md-column gap-2 overflow-auto pb-2">
                  {categories.map((cat, idx) => {
                    const isActive = selectedCategory === cat.category;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedCategory(cat.category);
                          setSelectedProduct(null);
                        }}
                        className={`btn rounded-pill fw-semibold subcategory-btn ${
                          isActive ? "active text-white" : "text-danger"
                        }`}
                        style={{
                          whiteSpace: 'nowrap',
                          background: isActive
                            ? "linear-gradient(to right, #DF2C58, #FF688D)"
                            : "transparent",
                          borderColor: "#DF2C58",
                          transition: "all 0.3s ease"
                        }}
                      >
                        {cat.category}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Product Selection and Display - Right Side */}
          <div className="col-12 col-md-8">
            <div className="card shadow-sm" style={{ borderColor: "#DF2C58" }}>
              <div className="card-header bg-white">
                <h5 className="fw-bold mb-0" style={{ color: "#DF2C58" }}>
                  {selectedCategory || "Select a Category"}
                </h5>
              </div>
              <div className="card-body p-2 p-md-3">
                {/* Product Selection Tabs */}
                {selectedCategory && (
                  <div className="d-flex flex-wrap gap-2 mb-3 mb-md-4 overflow-auto pb-2">
                    {currentCategoryProducts.map((product, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-sm rounded-pill ${selectedProduct?.id === product.id ? 'active' : ''}`}
                        style={{
                          whiteSpace: 'nowrap',
                          color: selectedProduct?.id === product.id ? 'white' : '#DF2C58',
                          background: selectedProduct?.id === product.id
                            ? "linear-gradient(to right, #DF2C58, #FF688D)"
                            : 'transparent',
                          border: '1px solid #DF2C58',
                          transition: "all 0.3s ease",
                          fontWeight: '600'
                        }}
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Selected Product Details */}
                {selectedProduct ? (
                  <div className="card shadow-sm p-2 p-md-3 border-0">
                    <div className="row">
                      <div className="col-12 col-md-4 mb-3 mb-md-0">
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="img-fluid rounded w-100"
                          style={{
                            maxHeight: '200px',
                            objectFit: 'cover',
                            border: '1px solid #eee'
                          }}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </div>
                      <div className="col-12 col-md-8">
                        <h5 className="fw-bold mb-1 mb-md-2" style={{ color: "#DF2C58" }}>
                          {selectedProduct.name}
                        </h5>
                        <p className="text-muted mb-2 mb-md-3 small">{selectedProduct.description}</p>
                      </div>
                    </div>

                    <div className="row mt-2 mt-md-3">
                      <div className="col-12">
                        {/* Render only the fields that exist for this product */}
                        {Object.keys(selectedProduct)
                          .filter(key => {
                            // Skip these special fields
                            if (['name', 'padding', 'boxPacking', 'roundCorners', 'bigSizeCard', 'description', 'image', 'notes', 'id', 'quantityDisplay', 'cardSizeMultiplier'].includes(key)) {
                              return false;
                            }
                            // Only show fields that have values
                            const value = selectedProduct[key];
                            return (
                              (Array.isArray(value) && value.length > 0) ||
                              (typeof value === 'string' && value) ||
                              (typeof value === 'boolean') ||
                              (typeof value === 'number')
                            );
                          })
                          .map(key => (
                            renderField(selectedProduct, key)
                          ))}
                      </div>
                    </div>

                    {selectedProduct.notes && (
                      <div className="alert alert-info mt-2 mt-md-3 mb-0 p-2 small">
                        <strong>Note:</strong> {selectedProduct.notes}
                      </div>
                    )}

                    <div className="d-flex justify-content-end mt-2 mt-md-3">
                      <button
                        className="btn btn-sm rounded-pill px-3 px-md-4"
                        style={{
                          background: "linear-gradient(to right, #F8483C, #DE2B59)",
                          border: "none",
                          color: "white",
                          transition: "all 0.3s ease"
                        }}
                        onClick={() => setShowModal(true)}
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 py-md-5">
                    <p className="text-muted">Please select a product to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onProceed={handleProceed}
      />

      <Footer />
    </>
  );
};

export default MixingJobs;