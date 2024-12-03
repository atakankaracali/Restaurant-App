import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Cart from "../../pages/Cart";

test("renders checkout modal with input fields", () => {
  render(
    <Provider store={store}>
      <Cart language="en" />
    </Provider>
  );

  const checkoutButton = screen.getByText(/proceed to checkout/i);
  fireEvent.click(checkoutButton);

  const nameInput = screen.getByPlaceholderText(/please enter your name!/i);
  const inputs = screen.getAllByPlaceholderText(/123/i);
  const expiryInput = screen.getByPlaceholderText(/mm\/yy/i);

  expect(nameInput).toBeInTheDocument();
  expect(inputs[0].id).toBe("cardNumber");
  expect(inputs[1].id).toBe("cvv");
  expect(expiryInput).toBeInTheDocument();
});
