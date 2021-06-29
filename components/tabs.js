import { useRef, useState } from "react";
import { useCart } from "./../contexts/cartContext";
import { useAuth } from "./../contexts/authContext";

export default function Tabs({ items, place }) {
  const cartContext = useCart();
  const authContext = useAuth();

  return (
    <div className="tabs">
      {items.map((i) => {
        const [val, setVal] = useState("1");
        const [checked, setChecked] = useState(false);
        const dateRef = useRef(new Date());
        const [currDate, setCurrDate] = useState(
          dateRef.current.toISOString().split("T")[0]
        );

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
                    onChange={(e) => {
                      if (checked) {
                        cartContext.dispatch({
                          type: "delete",
                          name: `${i.name} @ ${place.name} @${place.location.address}`,
                          restaurant: place.id,
                        });
                        setChecked((s) => !s);
                      } else {
                        setChecked((s) => !s);
                      }
                    }}
                  />
                </span>
              </div>
            </div>
            {checked && (
              <div className="date">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formObj = Object.fromEntries(new FormData(e.target));

                    cartContext.dispatch({
                      type: "add",
                      item: {
                        price_data: {
                          currency: "usd",
                          product_data: {
                            name: `${i.name} @ ${place.name} @${place.location.address}`,
                            images: [`${i.image}`],
                            metadata: {
                              creator: authContext.state.user._id,
                              ...formObj,
                              restaurant: place.id,
                            },
                          },
                          unit_amount: Math.round(parseInt(i.price) * 100),
                        },
                        quantity: Math.round(parseInt(val)),
                      },
                    });
                    setChecked(false);
                  }}
                >
                  <span>
                    <input
                      type="date"
                      name="book"
                      min={dateRef.current.toISOString().split("T")[0]}
                      max={
                        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                          .toISOString()
                          .split("T")[0]
                      }
                      value={currDate}
                      onChange={(e) => setCurrDate(e.target.value)}
                      required
                    />
                  </span>
                  <span>
                    <input
                      type="time"
                      name="time"
                      min={
                        dateRef.current.toISOString().split("T")[0] === currDate
                          ? splitDate()
                          : "09:00"
                      }
                      max="21:00"
                      required
                    />
                  </span>
                  <span>
                    <button>Book</button>
                  </span>
                </form>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function splitDate() {
  const [a, b] = new Date()
    .toISOString()
    .split("T")[1]
    .split(".")[0]
    .split(":");
  return `${a}:${b}`;
}
