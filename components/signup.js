import useForm from "../hooks/useForm";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "./../contexts/authContext";

export default function login() {
  const [state, updateState] = useForm({ email: "", password: "" });
  const context = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/create", { ...state })
      .then((res) => {
        const {
          data: { user },
        } = res;

        context.dispatch({ type: "login", user });
      })
      .catch(console.log);
  }
  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <header>
          <h2>Logo goes here</h2>
        </header>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={state.email}
            name="email"
            required
            onChange={updateState}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={state.password}
            name="password"
            required
            onChange={updateState}
          />
        </div>
        <div>
          <button>Sign up</button>
        </div>
      </form>
      <div className="form-message">
        <p>
          Already have an account?{" "}
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </p>
        <p>Or login with</p>
        <div className="login-icons">{/* incons go here son */}</div>
      </div>
    </div>
  );
}
