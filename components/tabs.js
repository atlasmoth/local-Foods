import { useEffect, useState } from "react";
import { useCart } from "./../contexts/cartContext";
import { useAuth } from "./../contexts/authContext";

export default function Tabs({ items, place }) {
  // console.log(place);
  const authContext = useAuth();
  const cartContext = useCart();

  return (
    <div className="tabs">
      {items.map((i) => {
        const [val, setVal] = useState("1");
        const [checked, setChecked] = useState(false);
        return (
          <div key={i.name + Math.random() * Math.random()}>
            <div className="tab">
              <div className="tab-image">
                <img
                  src="https://via.placeholder.com/70/eee/fd6b0"
                  alt="Dummy"
                />
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
                    disabled={checked}
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
                  <input
                    type="checkbox"
                    name="favorite"
                    id="favorite"
                    // onChange={setChecked((s) => !s)}
                    checked={checked}
                    onChange={(e) => setChecked((s) => !s)}
                  />
                </span>
              </div>
            </div>
            <div className="date">
              <span>
                <input type="date" name="book" id="book" />
              </span>
              <span>
                <input
                  type="time"
                  name="time"
                  id="time"
                  min="09:00"
                  max="18:00"
                  required
                  step="1800"
                />
              </span>
              <span>
                <button>Book</button>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
