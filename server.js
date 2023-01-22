import app from "./app.js";
import { connectDB } from "./config/database.js";
import Razorpay from "razorpay";
connectDB();

// export const Razorpay = require("razorpay");
export const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.SECRET_KEY,
});

app.get("/", (req, res, next) => {
  res.send("<h1>Working</h1>");
});

app.listen(process.env.PORT, () =>
  console.log(
    `Server is working on PORT: ${process.env.PORT}, IN ${process.env.NODE_ENV} MODE`
  )
);
