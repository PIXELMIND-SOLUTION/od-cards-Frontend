import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderModal = ({ isOpen, onClose, onProceed }) => {
    const navigate = useNavigate();
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const handleProceed = () => {
        onProceed(selectedQuantity);
        onClose();
    };

    return (
        <div
            className={`modal fade ${isOpen ? "show d-block" : "d-none"}`}
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ background: "linear-gradient(to right, #e0e0e0, #c2c2c2)" }}>
                    <div className="modal-header border-0">
                        <h5 className="modal-title fw-bold">No of Orders</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <select 
                            className="form-select mb-3" 
                            value={selectedQuantity}
                            onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                        <button
                            type="button"
                            className="btn w-100 text-white"
                            style={{ background: "linear-gradient(to right, #DF2C58, #FF688D)" }}
                            onClick={handleProceed}
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;