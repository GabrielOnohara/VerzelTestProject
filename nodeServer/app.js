import express from "express";
import router from "./routes/index.js";
import dotenv from "dotenv"

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use("/", router);

app.get("/", (req, res) => {
  res.status(200).send("App is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
