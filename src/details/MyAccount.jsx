import React, { useState } from "react";
import { Modal, Button, Tab, Tabs } from "react-bootstrap";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";

const mockOrders = [
  {
    id: "ORD001",
    product: "Wedding Invitation Card",
    quantity: 100,
    date: "2025-07-02",
    total: "₹2500",
    status: "Processing",
    details: "Matte finish, Golden foil, Box packing",
  },
  {
    id: "ORD002",
    product: "Business Card",
    quantity: 200,
    date: "2025-06-29",
    total: "₹1800",
    status: "Delivered",
    details: "Glossy print, Round corner",
  },
  {
    id: "ORD003",
    product: "Flyers",
    quantity: 500,
    date: "2025-06-25",
    total: "₹3200",
    status: "Pending",
    details: "A5 Size, Front & Back Print",
  },
];

const mockPayments = [
  {
    id: "PAY001",
    orderId: "ORD001",
    amount: "₹2500",
    date: "2025-07-01",
    method: "Credit Card",
    status: "Completed",
  },
  {
    id: "PAY002",
    orderId: "ORD002",
    amount: "₹1800",
    date: "2025-06-28",
    method: "UPI",
    status: "Completed",
  },
  {
    id: "PAY003",
    orderId: "ORD003",
    amount: "₹3200",
    date: "2025-06-24",
    method: "Net Banking",
    status: "Pending",
  },
];

const statusOptions = ["All", "Pending", "Processing", "Delivered"];

const MyAccount = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");

  const filteredOrders =
    selectedStatus === "All"
      ? mockOrders
      : mockOrders.filter((order) => order.status === selectedStatus);

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleViewPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="fw-bold" style={{ color: "#DE2B59" }}>
              My Account
            </h2>
            <p className="text-muted">Manage your orders and payment history</p>
          </div>
        </div>

        <div className="row">
          {/* Left side - Navigation */}
          <div className="col-lg-3 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  <button
                    className={`list-group-item list-group-item-action border-0 py-3 ${
                      activeTab === "orders" ? "active" : ""
                    }`}
                    style={{
                      backgroundColor: activeTab === "orders" ? "#DE2B59" : "transparent",
                      color: activeTab === "orders" ? "white" : "#333",
                      fontWeight: activeTab === "orders" ? "500" : "400",
                      borderLeft: activeTab === "orders" ? "4px solid #DE2B59" : "4px solid transparent"
                    }}
                    onClick={() => setActiveTab("orders")}
                  >
                    <i className="fas fa-shopping-bag me-2"></i> My Orders
                  </button>
                  <button
                    className={`list-group-item list-group-item-action border-0 py-3 ${
                      activeTab === "payments" ? "active" : ""
                    }`}
                    style={{
                      backgroundColor: activeTab === "payments" ? "#DE2B59" : "transparent",
                      color: activeTab === "payments" ? "white" : "#333",
                      fontWeight: activeTab === "payments" ? "500" : "400",
                      borderLeft: activeTab === "payments" ? "4px solid #DE2B59" : "4px solid transparent"
                    }}
                    onClick={() => setActiveTab("payments")}
                  >
                    <i className="fas fa-credit-card me-2"></i> Payments
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="col-lg-9">
            {activeTab === "orders" && (
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold" style={{ color: "#DE2B59" }}>My Orders</h5>
                  <div className="dropdown">
                    <button
                      className="btn btn-sm dropdown-toggle"
                      type="button"
                      id="orderFilterDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        border: "1px solid #dee2e6",
                        color: "#495057"
                      }}
                    >
                      Filter: {selectedStatus}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="orderFilterDropdown">
                      {statusOptions.map((status) => (
                        <li key={status}>
                          <button
                            className="dropdown-item"
                            onClick={() => setSelectedStatus(status)}
                          >
                            {status}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead style={{ backgroundColor: "#f8f9fa" }}>
                        <tr>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Order ID</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Product</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Qty</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Date</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Total</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Status</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.length > 0 ? (
                          filteredOrders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>{order.id}</td>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>{order.product}</td>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>{order.quantity}</td>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>{order.date}</td>
                              <td style={{ padding: "1rem", verticalAlign: "middle", fontWeight: "500" }}>{order.total}</td>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                                <span
                                  className="badge rounded-pill"
                                  style={{
                                    backgroundColor:
                                      order.status === "Delivered"
                                        ? "#28a745"
                                        : order.status === "Processing"
                                        ? "#ffc107"
                                        : "#6c757d",
                                    color: order.status === "Processing" ? "#000" : "#fff",
                                    padding: "0.5rem 0.75rem",
                                    fontSize: "0.85rem",
                                    fontWeight: "500"
                                  }}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                                <button
                                  className="btn btn-sm"
                                  onClick={() => handleViewOrderDetails(order)}
                                  style={{
                                    background: "linear-gradient(to right, #F8483C, #DE2B59)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "0.375rem 0.75rem"
                                  }}
                                >
                                  <i className="fas fa-eye me-1"></i> View
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center py-4" style={{ color: "#6c757d" }}>
                              No orders found for this status.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-0">
                  <h5 className="mb-0 fw-bold" style={{ color: "#DE2B59" }}>Payment History</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead style={{ backgroundColor: "#f8f9fa" }}>
                        <tr>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Payment ID</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Order ID</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Amount</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Date</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Method</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>Status</th>
                          <th style={{ padding: "1rem", color: "#495057", fontWeight: "600" }}>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockPayments.length > 0 ? (
                          mockPayments.map((payment) => (
                            <tr key={payment.id} style={{ borderBottom: "1px solid #eee" }}>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>{payment.id}</td>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>{payment.orderId}</td>
                              <td style={{ padding: "1rem", verticalAlign: "middle", fontWeight: "500" }}>{payment.amount}</td>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>{payment.date}</td>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>{payment.method}</td>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                                <span
                                  className="badge rounded-pill"
                                  style={{
                                    backgroundColor:
                                      payment.status === "Completed"
                                        ? "#28a745"
                                        : "#ffc107",
                                    color: payment.status === "Completed" ? "#fff" : "#000",
                                    padding: "0.5rem 0.75rem",
                                    fontSize: "0.85rem",
                                    fontWeight: "500"
                                  }}
                                >
                                  {payment.status}
                                </span>
                              </td>
                              <td style={{ padding: "1rem", verticalAlign: "middle" }}>
                                <button
                                  className="btn btn-sm"
                                  onClick={() => handleViewPaymentDetails(payment)}
                                  style={{
                                    background: "linear-gradient(to right, #F8483C, #DE2B59)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "0.375rem 0.75rem"
                                  }}
                                >
                                  <i className="fas fa-eye me-1"></i> View
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center py-4" style={{ color: "#6c757d" }}>
                              No payment history found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <Modal
        show={showOrderModal}
        onHide={() => setShowOrderModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton style={{ borderBottom: "1px solid #eee" }}>
          <Modal.Title style={{ color: "#DE2B59", fontWeight: "600" }}>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <p>
                  <strong style={{ color: "#495057" }}>Order ID:</strong> {selectedOrder.id}
                </p>
                <p>
                  <strong style={{ color: "#495057" }}>Product:</strong> {selectedOrder.product}
                </p>
                <p>
                  <strong style={{ color: "#495057" }}>Quantity:</strong> {selectedOrder.quantity}
                </p>
              </div>
              <div className="col-md-6 mb-3">
                <p>
                  <strong style={{ color: "#495057" }}>Date:</strong> {selectedOrder.date}
                </p>
                <p>
                  <strong style={{ color: "#495057" }}>Total:</strong> {selectedOrder.total}
                </p>
                <p>
                  <strong style={{ color: "#495057" }}>Status:</strong>{" "}
                  <span
                    className="badge rounded-pill"
                    style={{
                      backgroundColor:
                        selectedOrder.status === "Delivered"
                          ? "#28a745"
                          : selectedOrder.status === "Processing"
                          ? "#ffc107"
                          : "#6c757d",
                      color: selectedOrder.status === "Processing" ? "#000" : "#fff",
                      padding: "0.35rem 0.65rem",
                      fontSize: "0.85rem",
                      fontWeight: "500"
                    }}
                  >
                    {selectedOrder.status}
                  </span>
                </p>
              </div>
              <div className="col-12">
                <div className="card border-0" style={{ backgroundColor: "#f8f9fa" }}>
                  <div className="card-body">
                    <h6 style={{ color: "#DE2B59", fontWeight: "600" }}>Order Details</h6>
                    <p className="mb-0" style={{ color: "#495057" }}>{selectedOrder.details}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "1px solid #eee" }}>
          <Button 
            variant="secondary" 
            onClick={() => setShowOrderModal(false)}
            style={{
              background: "#6c757d",
              border: "none",
              borderRadius: "6px",
              padding: "0.5rem 1.25rem"
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Payment Details Modal */}
      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton style={{ borderBottom: "1px solid #eee" }}>
          <Modal.Title style={{ color: "#DE2B59", fontWeight: "600" }}>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <p>
                  <strong style={{ color: "#495057" }}>Payment ID:</strong> {selectedPayment.id}
                </p>
                <p>
                  <strong style={{ color: "#495057" }}>Order ID:</strong> {selectedPayment.orderId}
                </p>
                <p>
                  <strong style={{ color: "#495057" }}>Amount:</strong> {selectedPayment.amount}
                </p>
              </div>
              <div className="col-md-6 mb-3">
                <p>
                  <strong style={{ color: "#495057" }}>Date:</strong> {selectedPayment.date}
                </p>
                <p>
                  <strong style={{ color: "#495057" }}>Method:</strong> {selectedPayment.method}
                </p>
                <p>
                  <strong style={{ color: "#495057" }}>Status:</strong>{" "}
                  <span
                    className="badge rounded-pill"
                    style={{
                      backgroundColor:
                        selectedPayment.status === "Completed"
                          ? "#28a745"
                          : "#ffc107",
                      color: selectedPayment.status === "Completed" ? "#fff" : "#000",
                      padding: "0.35rem 0.65rem",
                      fontSize: "0.85rem",
                      fontWeight: "500"
                    }}
                  >
                    {selectedPayment.status}
                  </span>
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "1px solid #eee" }}>
          <Button 
            variant="secondary" 
            onClick={() => setShowPaymentModal(false)}
            style={{
              background: "#6c757d",
              border: "none",
              borderRadius: "6px",
              padding: "0.5rem 1.25rem"
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default MyAccount;