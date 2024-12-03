import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useSelector } from "react-redux";
import { translate } from "../i18n";

const Navbar = ({ toggleTheme, setLanguage, language }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderLanguageButton = (lang, label) => (
    <button
      className={`language-button ${language === lang ? "active" : ""}`}
      onClick={() => setLanguage(lang)}
      style={{
        backgroundColor: language === lang ? "var(--highlight-color)" : "var(--button-background-color)",
        color: language === lang ? "var(--card-background-color)" : "var(--button-text-color)",
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link">
          {translate("Menu", language)}
        </Link>
        <Link to="/cart" className="navbar-link">
          {translate("Cart", language)}
          ({totalItems})
        </Link>
        <Link to="/order-history" className="navbar-link">
          {translate("orderHistory", language)}
        </Link>
      </div>
      <div className="navbar-right">
        <div className="language-buttons">
          {renderLanguageButton("en", "English")}
          {renderLanguageButton("lv", "Latvian")}
        </div>

        {/* Theme Toggle Button */}
        <label className="switch">
          <input type="checkbox" onChange={toggleTheme} />
          <span className="slider round">
            <span className="icon moon">🌙</span>
            <span className="icon sun">☀️</span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
