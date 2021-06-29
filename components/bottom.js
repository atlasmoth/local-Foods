import Link from "next/link";

export default function Bottom() {
  return (
    <div className="bottom">
      <span>
        <Link href="/">
          <a>
            <i
              className="fa fa-home"
              aria-hidden="true"
              style={{ color: "#fd6b01" }}
            ></i>
          </a>
        </Link>
      </span>
      <span>
        <i className="fa fa-users" aria-hidden="true"></i>
      </span>
      <span>
        <Link href="/orders">
          <a>
            <i className="fa fa-history" aria-hidden="true"></i>
          </a>
        </Link>
      </span>
      <span>
        <i className="fa fa-user" aria-hidden="true"></i>
      </span>
    </div>
  );
}
