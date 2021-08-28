import { connectToDatabase } from "../../utils/db";

async function Search(req, res) {
  const { term } = req.query;

  try {
    const { db } = await connectToDatabase();
    const docs = await db
      .collection("restaurants")
      .find({
        $or: [
          { name: new RegExp(term, "i", "g") },
          {
            menu: {
              $elemMatch: { $elemMatch: { name: new RegExp(term, "i", "g") } },
            },
          },
        ],
      })
      .toArray();
    res.send({ success: true, docs });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: error.message });
  }
}

export default Search;
