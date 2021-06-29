import { useAuth } from "./../contexts/authContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar({ title }) {
  const context = useAuth();
  const router = useRouter();
  return (
    <div className="navbar">
      <div className="back">
        <span>
          <i
            className="fa fa-arrow-left"
            aria-hidden="true"
            style={{
              color: "rgb(33, 158, 188)",
            }}
            onClick={(e) => router.back()}
          ></i>
        </span>
      </div>
      <div className="title">
        <p>{title || `Welcome ${context?.state?.user?.email}!`}</p>
      </div>
      <div className="icons">
        <Link href="/checkout">
          <a>
            <span>
              <i
                className="fa fa-shopping-cart"
                aria-hidden="true"
                style={{
                  color: "rgb(33, 158, 188)",
                }}
              ></i>
            </span>
          </a>
        </Link>
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
