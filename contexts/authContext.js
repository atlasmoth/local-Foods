import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login": {
      return { ...state };
    }
    case "logout": {
      return { ...state, auth: false, user: null };
    }
    default: {
      return { ...state };
    }
  }
}
function Auth({ children }) {
  const [state, dispatch] = useReducer(reducer, { user: null, auth: false });
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { Auth, useAuth };
