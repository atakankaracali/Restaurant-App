import React from "react";
import { useSelector } from "react-redux";
import { Card, List } from "antd";
import "../styles/OrderHistory.css";
import { translate } from "../i18n";

const OrderHistory = ({ language }) => {
  const orderHistory = useSelector((state) => state.order?.history || []);

  return (
    <div className="order-history-container">
      <h1 className="order-history-title">
        {translate("orderHistory", language)}
      </h1>
      {orderHistory.length > 0 ? (
        <List
          className="order-history-list"
          dataSource={orderHistory}
          renderItem={(order, index) => (
            <Card
              className="order-history-card"
              title={`${translate("order", language)} #${index + 1}`}
              bordered={true}
            >
              <List
                dataSource={order.items}
                renderItem={(item) => (
                  <List.Item className="order-item">
                    <div>{translate(item.title, language)}</div>
                    <div>
                      {translate("priceLabel", language)}: $
                      {item.price ? item.price.toFixed(2) : "0.00"}
                    </div>
                  </List.Item>
                )}
              />
              <p className="order-total">
                <strong>{translate("total", language)}:</strong> $
                {order.total ? order.total.toFixed(2) : "0.00"}
              </p>
            </Card>
          )}
        />
      ) : (
        <p className="no-order-history">
          {translate("noOrderHistory", language)}
        </p>
      )}
    </div>
  );
};

export default OrderHistory;
