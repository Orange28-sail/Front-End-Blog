import express from "express";
import messageHandler from "../handler/messageHandler.js";
const routor = express.Router();
// 获取所有评论
routor.get("/getAllMessage", messageHandler.getAllMessage);
// 发布评论
routor.post("/postMessage", messageHandler.postMessage);
// 删除评论(需要权限)
export default routor;
