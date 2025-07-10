import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../views/Navbar";
import Footer from "../views/Footer";

// Map query param to title
const sectionMap = {
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  refund: "Refund Policy",
};

const PoliciesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const section = queryParams.get("section");

  const [policies, setPolicies] = useState([]);
  const [activePolicy, setActivePolicy] = useState("Privacy Policy");
  const [loading, setLoading] = useState(true);

  const fetchPolicies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/policies/allpolicies");
      setPolicies(res.data || []);
      const defaultPolicy = sectionMap[section] || "Privacy Policy";

      // Set default active policy only after data is fetched
      const foundPolicy = res.data.find((p) => p.title === defaultPolicy);
      if (foundPolicy) setActivePolicy(foundPolicy.title);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch policies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  useEffect(() => {
    if (policies.length > 0 && sectionMap[section]) {
      const newPolicy = policies.find((p) => p.title === sectionMap[section]);
      if (newPolicy) {
        setActivePolicy(newPolicy.title);
      }
    }
  }, [section, policies]);

  const getPolicyContent = (title) => {
    const policy = policies.find((p) => p.title === title);
    return policy ? policy.content : "";
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid px-0">
        <div className="row m-0 flex-column flex-md-row">
          {/* Left Side - Buttons */}
          <div
            className="col-md-4 d-flex flex-column justify-content-center text-white p-5"
            style={{
              background: "linear-gradient(to right, #F8483C, #DE2B59)",
              minHeight: "400px",
            }}
          >
            <h4 className="mb-4 fw-bold">Our Policies</h4>
            {loading ? (
              <p>Loading policies...</p>
            ) : (
              policies.map((policy) => (
                <button
                  key={policy.title}
                  className={`btn btn-outline-light text-start mb-3 ${
                    activePolicy === policy.title ? "active fw-bold" : ""
                  }`}
                  onClick={() => setActivePolicy(policy.title)}
                >
                  {policy.title}
                </button>
              ))
            )}
          </div>

          {/* Right Side - Content */}
          <div className="col-md-8 bg-light p-5">
            {loading ? (
              <p>Loading content...</p>
            ) : (
              <>
                <h4 className="fw-bold mb-4 text-dark">{activePolicy}</h4>
                <p style={{ whiteSpace: "pre-line", fontSize: "1.1rem", lineHeight: "1.6" }}>
                  {getPolicyContent(activePolicy)}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PoliciesPage;
