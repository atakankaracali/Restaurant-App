import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from "../../redux/slices/cartSlice";

describe("cartSlice", () => {
  const initialState = {
    items: [],
  };

  test("should handle addToCart", () => {
    const newState = cartReducer(initialState, addToCart({ id: 1, title: "Test Item", price: 10 }));
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].title).toBe("Test Item");
  });

  test("should handle removeFromCart", () => {
    const stateWithItem = {
      items: [{ id: 1, title: "Test Item", price: 10 }],
    };
    const newState = cartReducer(stateWithItem, removeFromCart({ id: 1 }));
    expect(newState.items).toHaveLength(0);
  });

  test("should handle updateQuantity", () => {
    const stateWithItem = {
      items: [{ id: 1, title: "Test Item", price: 10, quantity: 1 }],
    };
    const newState = cartReducer(stateWithItem, updateQuantity({ id: 1, quantity: 5 }));
    expect(newState.items[0].quantity).toBe(5);
  });
});
