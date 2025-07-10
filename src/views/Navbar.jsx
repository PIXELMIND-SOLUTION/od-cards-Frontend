import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from './assets/odcards-logo.png';

const MegaMenuItem = ({ icon, label, link }) => {
  return (
    <div className="col">
      <Link to={link} className="text-decoration-none text-dark d-block p-3 rounded hover-shadow">
        <div className="d-flex align-items-center">
          <i className={`fas ${icon} fa-lg me-3 text-danger`}></i>
          <span style={{ fontWeight: 500 }}>{label}</span>
        </div>
      </Link>
    </div>
  );
};

function Navbar({ user, onLogout, onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const loginModalRef = useRef(null);
  const navbarRef = useRef(null);
  const [sessionUser, setSessionUser] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setSessionUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid user in sessionStorage", e);
      }
    }

    // Close navbar when clicking outside
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isUserLoggedIn = user || sessionUser;

  const handleLoginClick = () => {
    if (onLogin) {
      onLogin();
    } else if (loginModalRef.current) {
      const modal = new window.bootstrap.Modal(loginModalRef.current);
      modal.show();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setSessionUser(null);
    if (onLogout) onLogout();
    navigate('/');
  };

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {expanded && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          onClick={closeNavbar}
          style={{ zIndex: 1040 }}
        />
      )}

      {/* Navbar/Sidebar */}
      <nav
        className="navbar navbar-expand-lg bg-white shadow-sm sticky-top"
        ref={navbarRef}
        style={{ zIndex: 1050 }}
      >
        <div className="container-fluid px-3 px-md-5">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/dashboard" onClick={closeNavbar}>
            <img src={logo} alt="OdCards" style={{ height: '40px' }} />
          </Link>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarContent"
            aria-expanded={expanded}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content - Desktop */}
          <div
            className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}
            id="navbarContent"
            style={expanded ? {
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              maxWidth: '350px',
              height: '100vh',
              backgroundColor: 'white',
              padding: '1rem',
              zIndex: 1050,
              overflowY: 'auto',
              boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
            } : {}}
          >
            {/* Mobile Sidebar Header */}
            {expanded && (
              <div className="d-flex justify-content-between align-items-center mb-4 d-lg-none">
                <Link to="/dashboard" onClick={closeNavbar}>
                  <img src={logo} alt="OdCards" style={{ height: '40px' }} />
                </Link>
                <button
                  className="btn-close"
                  onClick={closeNavbar}
                  aria-label="Close"
                />
              </div>
            )}

            <ul className={`navbar-nav mx-auto gap-lg-3 gap-1 ${expanded ? 'text-start' : 'text-center'}`}>
              <li className="nav-item">
                <Link
                  className={`nav-link fs-5 ${location.pathname === "/dashboard" ? "active text-danger fw-bold" : "text-dark"}`}
                  to="/dashboard"
                  onClick={closeNavbar}
                >
                  Home
                </Link>
              </li>

              {/* Products Dropdown */}
              <li className="nav-item dropdown position-static">
                <a
                  className="nav-link dropdown-toggle fs-5"
                  href="#"
                  id="productsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    color: location.pathname.startsWith("/dashboard/category") ? "#DE2B59" : "#000",
                    fontWeight: location.pathname.startsWith("/dashboard/category") ? "600" : "400"
                  }}
                >
                  Products
                </a>
                <div
                  className={`dropdown-menu w-100 mt-0 border-0 shadow ${expanded ? 'd-lg-none position-static' : ''}`}
                  aria-labelledby="productsDropdown"
                  style={{
                    backgroundColor: "#fff",
                    left: expanded ? "0" : "",
                    right: expanded ? "0" : "",
                    top: "100%",
                    padding: "1.5rem"
                  }}
                >
                  <div className="container">
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                      <MegaMenuItem icon="fa-id-card" label="Visiting Cards" link="/dashboard/category/visiting-cards" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-layer-group" label="Readymade Cards" link="/dashboard/category/readymade-cards" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-heart" label="Wedding Cards" link="/dashboard/category/wedding-cards" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-envelope-open-text" label="Invitation Cards" link="/dashboard/category/invitation-cards" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-vial" label="Mixing Jobs" link="/dashboard/category/mixing-jobs" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-file-alt" label="Bond Papers" link="/dashboard/category/bond-papers" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-calendar" label="Pocket Calendars" link="/dashboard/category/pocket-calender-boards" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-print" label="Digital Prints" link="/dashboard/category/digital-prints" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-border-all" label="Flute Board Printing" link="/dashboard/category/flute-board-printing" onClick={closeNavbar} />
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link fs-5 text-dark"
                  to="/dashboard/myaccount"
                  onClick={closeNavbar}
                >
                  MyAccount
                </Link>
              </li>

              {/* Info Dropdown */}
              <li className="nav-item dropdown position-static">
                <a
                  className="nav-link dropdown-toggle fs-5"
                  href="#"
                  id="infoDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    color: ["/dashboard/contactus", "/dashboard/faqpage", "/dashboard/aboutus"].includes(location.pathname)
                      ? "#DE2B59"
                      : "#000",
                    fontWeight: ["/dashboard/contactus", "/dashboard/faqpage", "/dashboard/aboutus"].includes(location.pathname)
                      ? "600"
                      : "400"
                  }}
                >
                  Info
                </a>
                <div
                  className={`dropdown-menu w-100 mt-0 border-0 shadow ${expanded ? 'd-lg-none position-static' : ''}`}
                  aria-labelledby="infoDropdown"
                  style={{
                    backgroundColor: "#fff",
                    left: expanded ? "0" : "",
                    right: expanded ? "0" : "",
                    top: "100%",
                    padding: "1.5rem"
                  }}
                >
                  <div className="container">
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                      <MegaMenuItem icon="fa-envelope" label="Contact Us" link="/dashboard/contactus" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-question-circle" label="FAQs" link="/dashboard/faqpage" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-info-circle" label="About Us" link="/dashboard/aboutus" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-star" label="Reviews" link="/dashboard/reviews" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-shield-alt" label="Privacy Policy" link="/dashboard/policies?section=privacy" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-file-contract" label="Terms & Conditions" link="/dashboard/policies?section=terms" onClick={closeNavbar} />
                      <MegaMenuItem icon="fa-undo" label="Refund Policy" link="/dashboard/policies?section=refund" onClick={closeNavbar} />

                    </div>
                  </div>
                </div>
              </li>
            </ul>

            {/* Right Side */}
            <div className={`d-flex align-items-center justify-content-center mt-3 mt-lg-0 ${expanded ? 'justify-content-start' : ''}`}>
              {isUserLoggedIn ? (
                <>
                  <button
                    className="btn btn-link text-dark mx-2"
                    onClick={() => {
                      navigate('/dashboard/mycart');
                      closeNavbar();
                    }}
                  >
                    <i className="fa fa-shopping-cart fa-lg" style={{ color: location.pathname === "/dashboard/mycart" ? "#DE2B59" : "#000" }}></i>
                  </button>
                  <button
                    className="btn btn-link text-dark mx-2"
                    onClick={() => {
                      navigate('/dashboard/profile');
                      closeNavbar();
                    }}
                  >
                    <i className="fa-solid fa-user fa-lg" style={{ color: location.pathname === "/dashboard/profile" ? "#DE2B59" : "#000" }}></i>
                  </button>
                  <button
                    className="btn btn-link text-dark mx-2"
                    onClick={() => {
                      handleLogout();
                      closeNavbar();
                    }}
                  >
                    <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                  </button>
                </>
              ) : (
                <button
                  className="btn ms-2"
                  onClick={() => {
                    handleLoginClick();
                    closeNavbar();
                  }}
                  style={{
                    background: 'linear-gradient(to right, #F8483C, #DE2B59)',
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    color: 'white'
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;