import { useAuth } from "./../contexts/authContext";

export default function Navbar({ title }) {
  const context = useAuth();

  return (
    <div className="navbar">
      <div className="back">
        <span>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </span>
      </div>
      <div className="title">
        <p>{title || `Welcome ${context?.state?.user?.email}!`}</p>
      </div>
      <div className="icons">
        <span>
          <i
            className="fa fa-shopping-cart"
            aria-hidden="true"
            style={{
              color: "rgb(33, 158, 188)",
            }}
          ></i>
        </span>
        <span>
          <i
            className="fa fa-bell"
            aria-hidden="true"
            style={{
              color: "rgb(33, 158, 188)",
            }}
          ></i>
        </span>
      </div>
    </div>
  );
}
