// 解析token中间件
import expressJWT from "express-jwt";
import config from "../config.js";
const jwtAuth = expressJWT({
  secret: config.jwtSecretKey,
  algorithms: ["HS256"],
}).unless({
  path: [
    "/",
    "/user/register",
    "/user/login",
    "/message/getAllMessage",
    "/message/postMessage",
    "/article/getAllArticle",
    "/article/getAuthorInfo",
    "/article/getArticleDetail",
    "/search/searchPublicArticleByClass",
    "/search/searchByInput",
    "/search/searchByTime",
    "/comment/getAllComment",
    "/comment/addCommentOne",
    "/comment/addCommentTwo",
  ],
});
export default jwtAuth;
