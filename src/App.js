import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import OrderHistory from "./pages/OrderHistory";
import "./index.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <Router>
      <Navbar
        toggleTheme={toggleTheme}
        setLanguage={setLanguage}
        language={language}
      />
      <Routes>
        <Route path="/" element={<Menu language={language} />} />
        <Route path="/cart" element={<Cart language={language} />} />
        <Route
          path="/order-history"
          element={<OrderHistory language={language} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
