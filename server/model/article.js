import mongoose from "../db/index.js";
const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
    maxlength: 160,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  author_id: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
});
export default mongoose.model("Articles", ArticleSchema, "articles");
