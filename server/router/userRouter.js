import express from "express";
import userHandler from "../handler/userHandler.js";
// 创建路由对象
const router = express.Router();

// 注册新用户
router.post("/register", userHandler.register);

// 登录
router.post("/login", userHandler.login);

// 获取用户信息
router.get("/getUserInfo", userHandler.getUserInfo);
// 修改用户信息
router.post("/updateInfo", userHandler.updateInfo);
// 将路由对象共享出去
export default router;
