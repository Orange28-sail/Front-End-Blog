import mongoose from "mongoose";

const DB_URL = "mongodb://localhost:27017/blog";
//? 连接数据库
mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) {
      console.log("数据库连接失败" + err);
      return;
    }
    console.log("数据库连接成功");
  }
);
export default mongoose;
