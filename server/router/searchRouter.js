import express from "express";
import searchHandler from "../handler/searchHandler.js";
const router = express.Router();

// 根据类别搜索（public）
router.post(
  "/searchPublicArticleByClass",
  searchHandler.searchPublicArticleByClass
);
// 根据类别搜索（private）
router.post(
  "/searchPrivateArticleByClass",
  searchHandler.searchPrivateArticleByClass
);
// 根据搜索内容查询
router.post("/searchByInput", searchHandler.searchByInput);
// 根据时间查询
router.post("/searchByTime", searchHandler.searchByTime);
export default router;
