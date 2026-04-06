import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./Routes/todoRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import apiTodoRoutes from "./Routes/apiTodoRoutes.js";
import connectDb from "./Db/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/todos", apiTodoRoutes);
app.use("/csbs", route);

app.get("/api/happy", (req, res) => {
  res.json({ message: "API is healthy" });
});

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });
