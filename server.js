import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

import authRoute from "./routes/userRoutes.js";

connectDB();

const app = express();
app.use(express.json());

dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use("/api/auth", authRoute);

app.listen(
  process.env.PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);
