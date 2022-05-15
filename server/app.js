import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwtAuth from "./middleware/expressJWT.js";

// 导入 路由
import userRouter from "./router/userRouter.js";
import messageRouter from "./router/messageRouter.js";
import articleRouter from "./router/articleRouter.js";
import searchRouter from "./router/searchRouter.js";
import commentRouter from "./router/commentRouter.js";
// 创建app实例
const app = express();
// 跨域 cors
app.use(cors());
// 配置解析表单数据的中间件(请求头大小限制为3M)
app.use(bodyParser.json({ limit: "3145728" }));
app.use(bodyParser.urlencoded({ limit: "3145728", extended: true }));
// 注册解析toekn的中间件
app.use(jwtAuth);
// 使用 路由
// 处理用户
app.use("/user", userRouter);
// 处理评论
app.use("/message", messageRouter);
// 文章
app.use("/article", articleRouter);
// 搜索
app.use("/search", searchRouter);
// 评论
app.use("/comment", commentRouter);
app.get("/", (err, res) => {
  res.send("<h1>hello world</h1>");
});
app.use(function (err, req, res, next) {
  // 捕获身份认证失败的错误
  if (err.name === "UnauthorizedError")
    return res.send({
      status: 401,
      tip: "身份认证失败！",
    });
});
app.listen(3000, () => {
  console.log("server running at http://127.0.0.1:3000");
});
