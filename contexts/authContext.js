import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login": {
      document.cookie = `foodsUser=${JSON.stringify(action.user)}`;
      return { ...state, auth: true, user: action.user };
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
  useEffect(() => {
    axios
      .get("/api/create", {})
      .then((res) => {
        const {
          data: { user },
        } = res;

        dispatch({ type: "login", user });
      })
      .catch(() => {
        dispatch({ type: "logout" });
      });
  }, []);
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
