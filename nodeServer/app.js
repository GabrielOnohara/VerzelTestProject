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

app.use(express.json()); 
app.use(cors())

app.use("/", router);

app.get("/", (req, res) => {
  res.status(200)
  .send(
    `App is running! And Mongo is ${mongoIsRunning ? 'connected' : 'desconnected'}`
  );
});

mongoose.connect(mongoURI)
  .then(() => {
    mongoIsRunning = true
    app.listen(port, () => {
      console.log(`Server is running on port ${port} and Mongo is ${mongoIsRunning ? 'connected' : 'desconnected'}`);
    });
    
  })
  .catch((err) => console.error('MongoDB connection error:', err));

