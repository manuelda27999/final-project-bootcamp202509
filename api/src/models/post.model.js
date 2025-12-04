// Fichero src/models/post.model.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

// El tercer parámetro fija el nombre exacto de la colección
export default mongoose.model("Post", postSchema, "posts");
