import express from "express";
import router from "./routes/index.js";
import dotenv from "dotenv"
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
let mongoIsRunning = false

mongoose.connect(mongoURI)
  .then(() => mongoIsRunning = true)
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json()); 
app.use(cors())

app.use("/", router);

app.get("/", (req, res) => {
  res.status(200)
  .send(
    `App is running! And Mongo is ${mongoIsRunning ? 'connected' : 'desconnected'}`
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
