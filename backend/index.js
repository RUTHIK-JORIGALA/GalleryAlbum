const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRouter = require("./routes/auth-routes");

// Mongo DB connection
mongoose
  .connect(process.env.MongoURL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("Error connecting to mongoDB", error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// authentication routes
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
