import Navbar from "../../components/navbar";
import { connectToDatabase } from "../../utils/db";

export default function Restaurant({ data }) {
  return (
    <div className="box">
      <Navbar title={data.name} />
      <div className="item-tray">
        <div className="tray-img">
          <img src={data.thumb} alt="thumb" />
        </div>
        <div className="tray-meta">
          <p>{data.name}</p>
          <p>
            <span>
              {parseFloat(data.user_rating.aggregate_rating).toFixed(1)}
            </span>
            <span>
              <span className="fa fa-star star-checked"></span>
              <span className="fa fa-star star-checked"></span>
              <span className="fa fa-star star-checked"></span>
              <span className="fa fa-star "></span>
              <span className="fa fa-star "></span>
            </span>
            <span>({data.user_rating.votes})</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const { params } = ctx;

  try {
    const { db } = await connectToDatabase();

    const data = await db
      .collection("restaurants")
      .findOne({ _id: params.rid });

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
}
