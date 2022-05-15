import mongoose from "../db/index.js";
const UsersSchema = mongoose.Schema({
  name: {
    type: String,
    default: "前端小白",
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    default: "暂无介绍",
    maxlength: 160,
  },
  user_pic: {
    type: String,
    default: "",
  },
  status: {
    type: Number,
    default: 1,
  },
});
export default mongoose.model("Users", UsersSchema, "users");
