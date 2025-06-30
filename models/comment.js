import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

export const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
