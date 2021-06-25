export default function Tray({ items }) {
  return (
    <div className="tray">
      {items.map((i) => (
        <div className="item-tray" key={i?._id["$oid"]}>
          <div className="tray-img">
            <img src={i.thumb} alt="featured" />
          </div>
          <div className="tray-meta">
            <p>{i?.name}</p>
            <p>
              <span>{i?.user_rating?.aggregate_rating}</span>
              <span>{i?.user_rating?.votes}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
