import cors from "cors";
import express from "express";

import posts from "./data/posts.data.js";
import users from "./data/users.data.js";

const api = express();
const PORT = 3000;

api.use(cors());

api.get("/", (req, res) => {
  res.send("Hello World! This is my first API using Express and Node.js");
});

api.get("/posts", (req, res) => {
  res.json(posts);
});

api.get("/users", (req, res) => {
  res.json(users);
});

api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
