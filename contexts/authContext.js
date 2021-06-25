import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login": {
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
      .post("/api/create", {})
      .then((res) => {
        const {
          data: { user },
        } = res;

        dispatch({ type: "login", user });
      })
      .catch(console.log);
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
