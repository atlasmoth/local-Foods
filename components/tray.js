export default function Tray({ items, title }) {
  return (
    <>
      <h4>{title}</h4>
      <div
        className="tray"
        style={{
          gridTemplateColumns: `repeat(${items.length}, 200px)`,
        }}
      >
        {items.map((i) => (
          <div className="item-tray" key={i?._id}>
            <div className="tray-img">
              <img src={i?.featured_image} alt="featured" />
            </div>
            <div className="tray-meta">
              <p>{i?.name}</p>
              <p>
                <span>
                  {parseFloat(i?.user_rating?.aggregate_rating).toFixed(1)}
                </span>
                <span>
                  <span className="fa fa-star star-checked"></span>
                  <span className="fa fa-star star-checked"></span>
                  <span className="fa fa-star star-checked"></span>
                  <span className="fa fa-star "></span>
                  <span className="fa fa-star "></span>
                </span>
                <span> ({i?.user_rating?.votes})</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
