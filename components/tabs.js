import { useEffect, useState } from "react";

export default function Tabs({ items }) {
  return (
    <div className="tabs">
      {items.map((i) => {
        const [val, setVal] = useState("1");

        return (
          <div className="tab" key={i.name + Math.random() * Math.random()}>
            <div className="tab-image">
              <img src="https://via.placeholder.com/70/eee" alt="Dummy" />
            </div>
            <div className="tab-desc">
              <span>{i.name}</span>
              <span
                style={{
                  color: "#fd6b01",
                }}
              >
                &#x20A6;{i.price}
              </span>
            </div>
            <div className="tab-range">
              <span>
                <input
                  type="range"
                  name="num"
                  id="num"
                  min={1}
                  step={1}
                  onChange={(e) => {
                    e.stopPropagation();
                    setVal(e.target.value);
                  }}
                  value={val}
                  max="10"
                />
              </span>
              <span
                style={{
                  color: "#fd6b01",
                }}
              >
                &#x20A6; {parseFloat(val) * i.price} ({val})
              </span>
            </div>
            <div className="tab-check">
              <span>
                <input type="checkbox" name="favorite" id="favorite" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
