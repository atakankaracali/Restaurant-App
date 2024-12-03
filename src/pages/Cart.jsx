import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import { Table, Button, InputNumber, Modal, Form, Input } from "antd";
import "../styles/Cart.css";
import { translate } from "../i18n";
import { addOrder } from "../redux/slices/orderSlice";

const Cart = ({ language }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isThankYouVisible, setIsThankYouVisible] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = totalPrice * 0.05;
  const finalPrice = totalPrice + tax;

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePayment = (values) => {
    const order = {
      items: cartItems,
      total: finalPrice,
      customer: values.name,
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    setIsModalVisible(false);
    setIsThankYouVisible(true);
  };

  const handleThankYouClose = () => {
    setIsThankYouVisible(false);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">{translate("cartTitle", language)}</h1>
      <div className="cart-summary">
        <h3>
          {translate("subtotal", language)}: ${totalPrice.toFixed(2)}
        </h3>
        <h3>
          {translate("tax", language)}: ${tax.toFixed(2)}
        </h3>
        <h2>
          {translate("total", language)}: ${finalPrice.toFixed(2)}
        </h2>
      </div>
      <Table
        className="cart-table"
        dataSource={cartItems.map((item) => ({ ...item, key: item.id }))}
        columns={[
          {
            title: translate("item", language),
            dataIndex: "title",
            key: "title",
          },
          {
            title: translate("Price", language),
            dataIndex: "price",
            key: "price",
            render: (price, record) =>
              `$${(price * record.quantity).toFixed(2)}`,
          },
          {
            title: translate("quantity", language),
            dataIndex: "quantity",
            key: "quantity",
            render: (text, record) => (
              <InputNumber
                min={1}
                value={record.quantity}
                onChange={(value) => handleQuantityChange(record.id, value)}
              />
            ),
          },
          {
            title: translate("actions", language),
            key: "actions",
            render: (text, record) => (
              <Button danger onClick={() => handleRemove(record.id)}>
                {translate("remove", language)}
              </Button>
            ),
          },
        ]}
        pagination={false}
      />
      <div className="cart-checkout">
        <Button
          className="cart-checkout-button"
          type="primary"
          onClick={handleCheckout}
        >
          {translate("proceedToCheckout", language)}
        </Button>
      </div>

      {/* Payment Modal */}
      <Modal
        title={<h1>{translate("paymentDetails", language)}</h1>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="payment-modal"
      >
        <Form layout="vertical" onFinish={handlePayment} className="payment-form">
          <Form.Item
            name="name"
            label={translate("name", language)}
            rules={[{ required: true, message: translate("nameRequired", language) }]}
          >
            <Input placeholder={translate("enterName", language)} />
          </Form.Item>
          <Form.Item
            name="cardNumber"
            label={translate("cardNumber", language)}
            rules={[
              { required: true, message: translate("cardNumberRequired", language) },
              { len: 16, message: translate("cardNumberLength", language) },
            ]}
          >
            <Input placeholder="1234 5678 9012 3456" maxLength={16} />
          </Form.Item>
          <Form.Item
            name="expiry"
            label={translate("expiryDate", language)}
            rules={[{ required: true, message: translate("expiryRequired", language) }]}
          >
            <Input placeholder="MM/YY" maxLength={5} />
          </Form.Item>
          <Form.Item
            name="cvv"
            label={translate("cvv", language)}
            rules={[
              { required: true, message: translate("cvvRequired", language) },
              { len: 3, message: translate("cvvLength", language) },
            ]}
          >
            <Input placeholder="123" maxLength={3} />
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              {translate("payNow", language)}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Thank You Modal */}
      <Modal
        title={translate("thankYou", language)}
        open={isThankYouVisible}
        onCancel={handleThankYouClose}
        footer={[
          <Button key="ok" type="primary" onClick={handleThankYouClose}>
            OK
          </Button>,
        ]}
      >
        <p>{translate("paymentSuccess", language)}</p>
        <p>{translate("thankYouMessage", language)}</p>
        <p>{translate("enjoyMeal", language)}</p>
      </Modal>
    </div>
  );
};

export default Cart;
