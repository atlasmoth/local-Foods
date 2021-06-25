import { useState } from "react";
export default function Search() {
  const [search, setSearch] = useState("");
  return (
    <div className="search-box">
      <div className="search">
        <span className="search-icon">
          <i className="fa fa-search" aria-hidden="true"></i>
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search for a food or restaurant"
        />
        <span className="search-icon">
          <i className="fa fa-map" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  );
}
