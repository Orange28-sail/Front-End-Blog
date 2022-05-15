import mongoose from "../db/index.js";
const MessageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 16,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 520,
  },
  imgColor: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
});
export default mongoose.model("Messages", MessageSchema, "messages");
