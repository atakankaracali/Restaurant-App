import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Row, Col, Modal, Input } from "antd";
import { fetchMenuItems } from "../redux/slices/menuSlice";
import { addToCart } from "../redux/slices/cartSlice";
import "../styles/Menu.css";
import { translate } from "../i18n";

const Menu = ({ language }) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.menu);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationItem, setAnimationItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMenuItems());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredItems(
      items.filter(
        (item) =>
          translate(item.title, language)
            ?.toLowerCase()
            .includes(lowercasedQuery) ||
          translate(item.description, language)
            ?.toLowerCase()
            .includes(lowercasedQuery)
      )
    );
  }, [items, searchQuery, language]);

  const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredItems(
      items.filter(
        (item) =>
          translate(item.title, language)
            ?.toLowerCase()
            .includes(lowercasedQuery) ||
          translate(item.description, language)
            ?.toLowerCase()
            .includes(lowercasedQuery)
      )
    );
  };

  const handleAddToCart = (item) => {
    setAnimationItem(item);
    setIsAnimating(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  if (status === "loading") {
    return <div className="loading">{translate("loading", language)}</div>;
  }

  if (status === "failed") {
    return (
      <div className="error-message">
        {translate("errorLoading", language)}: {error || translate("unknownError", language)}
      </div>
    );
  }

  if (filteredItems.length === 0 && !searchQuery) {
    return <div className="empty-menu">{translate("noItems", language)}</div>;
  }

  if (filteredItems.length === 0 && searchQuery) {
    return <div className="no-results">{translate("noResults", language)}</div>;
  }

  return (
    <div className="menu-container">
      <h1 className="menu-title">{translate("menuTitle", language)}</h1>

      <div className="menu-search">
        <Input
          placeholder={translate("searchPlaceholder", language)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="menu-search-button" onClick={handleSearch}>
          {translate("searchButton", language)}
        </Button>
      </div>

      <Row gutter={[16, 16]} className="menu-row">
        {filteredItems.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <Card
              hoverable
              className={`menu-card ${
                isAnimating && animationItem?.id === item.id ? "animate" : ""
              }`}
              cover={
                <img
                  alt={translate(item.title, language) || "Image"}
                  src={item.img || "https://via.placeholder.com/150"}
                  className="menu-card-image"
                />
              }
              onClick={() => handleCardClick(item)}
            >
              <div className="menu-card-content">
                <h3 className="menu-card-title">
                  {translate(item.title, language) || "No Title"}
                </h3>
                <p className="menu-card-price">
                  {translate("priceLabel", language)}: ${item.price.toFixed(2)}
                </p>
                <p className="menu-card-description">
                  {translate(item.description, language) || "No Description"}
                </p>
              </div>
              <Button
                className="menu-card-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
              >
                {translate("addToCart", language)}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedItem && (
        <Modal
          title={translate(selectedItem.title, language) || "Details"}
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              {translate("closeButton", language)}
            </Button>,
          ]}
        >
          <p>
            <strong>{translate("description", language)}:</strong>{" "}
            {translate(selectedItem.description, language) ||
              translate("noDescription", language)}
          </p>
          <p>
            <strong>{translate("priceLabel", language)}:</strong> $
            {selectedItem.price.toFixed(2)}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Menu;
