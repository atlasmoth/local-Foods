import { createContext, useContext, useReducer } from "react";

const cartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      state.items = [...state.items, action.item];
      return { ...state };
    }

    case "delete": {
      state.items = state.items.filter(
        (i) => i.name !== action.name && i.creator !== action.userId
      );
      return { ...state };
    }
    default:
      break;
  }
}
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  return (
    <cartContext.Provider value={{ state, dispatch }}>
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(cartContext);
  return context;
}
