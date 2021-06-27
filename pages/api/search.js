import nc from "next-connect";
import { connectToDatabase } from "../../utils/db";

async function Search(req, res) {
  const { term } = req.query;

  try {
    const { db } = await connectToDatabase();
    const docs = await db
      .collection("restaurants")
      .aggregate([
        {
          $search: {
            text: {
              path: { wildcard: "*" },
              query: term,
            },
          },
        },
        {
          $limit: 100,
        },
        {
          $project: {
            menu: false,
          },
        },
      ])
      .toArray();
    res.send({ success: true, docs });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
}
const handler = nc();
handler.get(Search);
export default handler;
