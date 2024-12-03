import menuReducer, { setMenuItems, fetchMenuItems } from "../../redux/slices/menuSlice";

describe("menuSlice", () => {
  const initialState = {
    items: [],
    status: "idle",
    error: null,
  };

  test("should handle setMenuItems", () => {
    const mockData = [
      { id: 1, title: "Pizza", price: 12 },
      { id: 2, title: "Burger", price: 8 },
    ];
    const newState = menuReducer(initialState, setMenuItems(mockData));
    expect(newState.items).toEqual(mockData);
  });

  test("should handle status transitions", () => {
    const loadingState = menuReducer(initialState, fetchMenuItems.pending());
    expect(loadingState.status).toBe("loading");

    const successState = menuReducer(initialState, fetchMenuItems.fulfilled([{ id: 1, title: "Pizza" }]));
    expect(successState.status).toBe("succeeded");
    expect(successState.items).toHaveLength(1);

    const failedState = menuReducer(initialState, fetchMenuItems.rejected(new Error("Unknown error occurred")));
    expect(failedState.status).toBe("failed");
    expect(failedState.error).toBe("Unknown error occurred");
  });
});
