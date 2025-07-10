import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";

const CardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadFields, setUploadFields] = useState([]);
  const [numberOfOrders, setNumberOfOrders] = useState(1);
  const [selections, setSelections] = useState({});

  // Initialize data from location state
  useEffect(() => {
    if (location.state?.product) {
      const orders = location.state.numberOfOrders || 1;
      setNumberOfOrders(orders);
      initializeUploadFields(orders);
      setSelections(location.state.product.selections || {});
      setCardData(location.state.product);
      setLoading(false);
    } else {
      navigate("/dashboard/visiting-cards");
    }
  }, [location.state, navigate]);

  const initializeUploadFields = (count) => {
    setUploadFields(
      Array(count)
        .fill()
        .map((_, index) => ({
          id: index,
          file: null,
          fileName: "",
          instructions: "",
        }))
    );
  };

  const handleFileChange = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? {
              ...field,
              file,
              fileName: file.name,
            }
          : field
      )
    );
  };

  const handleInstructionChange = (id, value) => {
    setUploadFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? {
              ...field,
              instructions: value,
            }
          : field
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all required uploads
    const hasMissingUploads = uploadFields.some(
      (field) => field.id < numberOfOrders && !field.file
    );

    if (hasMissingUploads) {
      alert(`Please upload design files for all ${numberOfOrders} order(s)`);
      return;
    }

    navigate("/dashboard/mycart", {
      state: {
        newItem: {
          id: cardData.id,
          title: cardData.name,
          image: cardData.image,
          price: calculatePrice(),
          quantity: selections.quantity || 1,
          uploads: uploadFields
            .slice(0, numberOfOrders)
            .map((field) => field.file),
          instructions: uploadFields
            .slice(0, numberOfOrders)
            .map((field) => field.instructions),
          productData: cardData,
          selections: selections,
          numberOfOrders: numberOfOrders,
        },
      },
    });
  };

  const calculatePrice = () => {
    let basePrice = 20; // Base price

    if (selections.bigSizeCard === "Yes") {
      basePrice += 10 * parseInt(selections.cardSizeMultiplier || 1);
    }
    if (selections.boxPacking === "Yes") {
      basePrice += 5;
    }

    return (basePrice * numberOfOrders).toFixed(2);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container my-4 my-md-5">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="text-center fw-bold" style={{ color: "#DF2C58" }}>
              {cardData.name} - Finalize Your Order
            </h2>
            <p className="text-center text-muted">
              {numberOfOrders > 1
                ? `You are placing ${numberOfOrders} separate orders`
                : "Please upload your design file"}
            </p>
          </div>
        </div>

        <div className="row">
          {/* Product Summary */}
          <div className="col-md-5 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="text-center mb-3">
                  <img
                    src={cardData.image}
                    alt={cardData.name}
                    className="img-fluid rounded"
                    style={{
                      maxHeight: "250px",
                      width: "auto",
                      objectFit: "contain",
                      border: "1px solid #eee",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300";
                    }}
                  />
                </div>

                <h4 className="text-center">{cardData.name}</h4>
                <p className="text-muted text-center mb-4">
                  {cardData.description}
                </p>

                <div className="card bg-light">
                  <div className="card-body">
                    <h5 className="card-title">Selected Options</h5>
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <tbody>
                          {Object.entries(selections).map(([key, value]) => (
                            <tr key={key}>
                              <td className="fw-semibold">
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </td>
                              <td className="text-end">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Sections */}
          <div className="col-md-7">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h4 className="mb-0">
                  <i className="fas fa-cloud-upload-alt text-danger me-2"></i>
                  Design Upload ({numberOfOrders} required)
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {uploadFields.slice(0, numberOfOrders).map((field) => (
                    <div key={field.id} className="mb-4">
                      <div className="card border-0 shadow-sm mb-3">
                        <div className="card-body">
                          <h5 className="card-title">
                            Design {numberOfOrders > 1 ? `#${field.id + 1}` : ""}
                          </h5>

                          <div className="mb-3">
                            <label className="btn btn-outline-primary w-100">
                              <i className="fas fa-upload me-2"></i>
                              {field.fileName
                                ? "Change Design File"
                                : "Select Design File"}
                              <input
                                type="file"
                                className="d-none"
                                onChange={(e) => handleFileChange(field.id, e)}
                                required
                                accept="image/*,.pdf,.psd,.ai,.eps,.cdr"
                              />
                            </label>
                            {field.fileName && (
                              <div className="mt-2 small">
                                <span className="badge bg-success me-2">
                                  <i className="fas fa-check me-1"></i>
                                  Selected
                                </span>
                                {field.fileName}
                              </div>
                            )}
                          </div>

                          <div className="mb-3">
                            <label className="form-label">
                              Special Instructions
                            </label>
                            <textarea
                              className="form-control"
                              rows="3"
                              value={field.instructions}
                              onChange={(e) =>
                                handleInstructionChange(field.id, e.target.value)
                              }
                              placeholder="Any special requirements for this design..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn btn-lg text-white py-3"
                      style={{
                        background: "linear-gradient(to right, #DF2C58, #FF688D)",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      {numberOfOrders > 1
                        ? `Add ${numberOfOrders} Items to Cart`
                        : "Add to Cart"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CardDetails;