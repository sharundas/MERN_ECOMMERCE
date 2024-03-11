import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import errorMiddleware from "./middleware/middleware.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// it allow the api data in json format
app.use(express.json());
app.use(cookieParser());

// this allow the coonection and access to api from the frontend
// app.use(Cors())

app.listen(3000, () => console.log("server is running on port 3000"));

app.use('/api', userRouter);

app.use(errorMiddleware)

// pass 5hu0DurWz1wHo3jf
