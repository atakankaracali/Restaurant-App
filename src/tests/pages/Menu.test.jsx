import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Menu from "../../pages/Menu";

test("renders Menu items", async () => {
  store.dispatch({
    type: "menu/setMenuItems",
    payload: [
      { id: 1, title: "Pizza", description: "Delicious pizza", price: 12 },
      { id: 2, title: "Burger", description: "Tasty burger", price: 8 },
    ],
  });
  store.dispatch({ type: "menu/setStatus", payload: "succeeded" });

  render(
    <Provider store={store}>
      <Menu language="en" />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  const pizzaItems = screen.getAllByText(/pizza/i);
  const burgerItems = screen.getAllByText(/burger/i);

  expect(pizzaItems.length).toBeGreaterThan(0);
  expect(burgerItems.length).toBeGreaterThan(0);

  expect(pizzaItems[0]).toHaveTextContent("Pizza");
});
