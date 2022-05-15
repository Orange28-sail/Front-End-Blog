import express from "express";
import commentHandler from "../handler/commentHandler.js";
const router = express.Router();
// 获取所有评论
router.post("/getAllComment", commentHandler.getAllComment);
// 添加评论
router.post("/addCommentOne", commentHandler.addCommentOne);
// 添加评论
router.post("/addCommentTwo", commentHandler.addCommentTwo);
export default router;
