import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./Routes/todoRoutes.js";
import connectDb from "./Db/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
//connectivity
connectDb();
//middle waves
app.use(cors());
app.use(express.json());
//http://localhost:5000/csbs/addtodo
app.use("/csbs", route);

app.listen(PORT, () => {
  console.log(`app is listening in ${PORT}`);
});
