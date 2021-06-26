import { useAuth } from "./../contexts/authContext";

export default function Navbar({ title }) {
  const context = useAuth();
  console.log(context);
  return (
    <div className="navbar">
      <div className="back"></div>
      <div className="title">
        <p>{title}</p>
      </div>
      <div className="icons"></div>
    </div>
  );
}
