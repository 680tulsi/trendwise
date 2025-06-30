import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  media: [{ type: String }],
}, { timestamps: true });

export const Article = mongoose.models.Article || mongoose.model("Article", articleSchema);
