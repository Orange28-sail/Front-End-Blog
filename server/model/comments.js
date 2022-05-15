import mongoose from "../db/index.js";
const CommentSchema = mongoose.Schema({
  article_id: {
    type: String,
    required: true,
  },
  son: {
    type: Array,
    // [{
    //   master:'',
    //   content:'',
    //   time:'',
    //   father:'',
    //   to:'',
    // }]
  },
  time: {
    type: String,
    required: true,
  },
  master: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
});
export default mongoose.model("Comments", CommentSchema, "comments");
