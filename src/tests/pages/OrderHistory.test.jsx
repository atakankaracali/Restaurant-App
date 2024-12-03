import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import OrderHistory from "../../pages/OrderHistory";

test("renders Order History with orders", () => {
  store.dispatch({
    type: "order/addOrder",
    payload: {
      items: [
        { id: 1, title: "Pizza", price: 12 },
        { id: 2, title: "Burger", price: 8 },
      ],
      total: 20,
    },
  });

  render(
    <Provider store={store}>
      <OrderHistory language="en" />
    </Provider>
  );

  expect(screen.getByText((content) => content.startsWith("order #1"))).toBeInTheDocument();
  expect(screen.getByText(/pizza/i)).toBeInTheDocument();
  expect(screen.getByText(/burger/i)).toBeInTheDocument();
});
