import useForm from "../hooks/useForm";
import Link from "next/link";
import authenticate from "./../utils/authenticate";

export default function login() {
  const [state, updateState] = useForm({ email: "", password: "" });
  function handleSubmit(e) {
    e.preventDefault();
    authenticate({ type: "google", ...state }).catch(console.log);
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
          <button type="submit">Log in</button>
        </div>
      </form>
      <div className="form-message">
        <p>
          Don't have an account?{" "}
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </p>
        <p>Or login with</p>
        <div className="login-icons">{/* incons go here son */}</div>
      </div>
    </div>
  );
}
