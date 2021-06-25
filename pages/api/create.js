import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nc from "next-connect";
import { connectToDatabase } from "../../utils/db";

const handler = nc();
async function createUser(req, res) {
  const { password, email } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  try {
    const { db } = await connectToDatabase();
    const user = await db
      .collection("users")
      .insetOne({ email, passsword: hash });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.send({ success: true, user, token });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
}
handler.post(createUser);
export default handler;
