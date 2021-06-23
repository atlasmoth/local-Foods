import useForm from "../hooks/useForm";
import Link from "next/link";

export default function login() {
  const [state, updateState] = useForm({ email: "", password: "" });

  return (
    <div className="signup-container">
      <form>
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
          <button>Log in</button>
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
