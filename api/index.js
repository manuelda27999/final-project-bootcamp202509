import cors from "cors";
import express from "express";

const api = express();
const PORT = 3000;

api.use(cors());

api.get("/", (req, res) => {
  res.send("Hello World! This is my first API using Express and Node.js");
});

api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
