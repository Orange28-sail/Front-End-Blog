import express from "express";
import articleHandler from "../handler/articleHandler.js";
const router = express.Router();

// 获取所有文章
router.get("/getAllArticle", articleHandler.getAllArticle);
// 获取私人文章
router.get("/getPrivateArticle", articleHandler.getPrivateArticle);
// 发布文章
router.post("/publishArticle", articleHandler.publishArticle);
// 获取作者信息
router.post("/getAuthorInfo", articleHandler.getAuthorInfo);
// 获取文章详情
router.post("/getArticleDetail", articleHandler.getArticleDetail);
// 删除文章
router.post("/deleteArticle", articleHandler.deleteArticle);
// 更新文章
router.post("/updateArticle", articleHandler.updateArticle);
export default router;
