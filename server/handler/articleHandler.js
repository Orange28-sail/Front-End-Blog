import Article from "../model/article.js";
import User from "../model/user.js";
import mongoose from "mongoose";

// 获取所有文章(public)
const getAllArticle = (req, res) => {
  Article.find({ status: 1 }, (err, doc) => {
    if (err) return console.log(err);
    if (doc.length === 0) {
      res.send({
        status: 1,
        tip: "暂无文章",
      });
    } else {
      doc.some((item) => {
        item.content = "";
      });
      res.send({
        status: 0,
        tip: "获取文章成功",
        data: doc,
      });
    }
  });
};
// 获取私人文章
const getPrivateArticle = (req, res) => {
  const author_id = req.user._id;
  Article.find({ status: 1, author_id }, (err, doc) => {
    if (err) return console.log(err);
    if (doc.length === 0) {
      res.send({
        status: 1,
        tip: "暂无文章",
      });
    } else {
      res.send({
        status: 0,
        tip: "获取个人文章成功",
        data: doc,
      });
    }
  });
};
// 发布文章
const publishArticle = (req, res) => {
  // 文章发布的内容
  const articleInfo = req.body;
  const article = new Article({
    title: articleInfo.title,
    intro: articleInfo.intro,
    // 作者信息
    author: req.user.name,
    // 作者id
    author_id: mongoose.mongo.ObjectId(req.user._id),
    time: articleInfo.time,
    content: articleInfo.content,
    tags: articleInfo.tags,
  });
  article.save((err, doc) => {
    if (err) return console.log(err);
    res.send({
      status: 0,
      tip: "发布成功",
      data: doc,
    });
  });
};
// 获取作者信息
const getAuthorInfo = (req, res) => {
  const author_id = mongoose.mongo.ObjectId(req.body.author_id);
  User.find({ _id: author_id, status: 1 }, (err, doc) => {
    if (err) return console.log(err);
    if (doc) {
      if (doc.length === 0) {
        return res.send({ status: 1, tip: "查询详情失败" });
      } else {
        const { _doc } = doc[0];
        const data = {
          ..._doc,
          password: "",
          _id: "",
          username: "",
          status: "",
        };
        res.send({
          status: 0,
          data: data,
          tip: "获取作者信息成功",
        });
      }
    } else {
      res.send("err");
    }
  });
};
// 获取文章详情
const getArticleDetail = (req, res) => {
  const article_id = mongoose.mongo.ObjectId(req.body.article_id);
  Article.find({ _id: article_id, status: 1 }, (err, doc) => {
    if (err) return console.log(err);
    if (err) return res.send({ status: 1, tip: "查询详情失败" });
    if (doc) {
      if (doc.length === 0) {
        return res.send({ status: 1, tip: "查询详情失败" });
      } else {
        res.send({
          status: 0,
          data: doc[0],
          tip: "获取文章信息成功",
        });
      }
    } else {
      res.send("err");
    }
  });
};
// 删除文章
const deleteArticle = (req, res) => {
  const id = mongoose.mongo.ObjectId(req.body.id);
  Article.updateOne(
    { _id: id },
    {
      status: 0,
    },
    (err, doc) => {
      if (err) return res.send({ status: 1, err: err });
      return res.send({ status: 0, tip: "删除成功" });
    }
  );
};
// 更新文章
const updateArticle = (req, res) => {
  // 文章更新的内容
  const updateArticle = req.body;
  const id = mongoose.mongo.ObjectId(updateArticle.id);
  Article.updateOne(
    { _id: id },
    {
      title: updateArticle.title,
      intro: updateArticle.intro,
      tags: updateArticle.tags,
      content: updateArticle.content,
    },
    (err, doc) => {
      if (err) return res.send({ status: 1, tip: "修改失败" });
      return res.send({ status: 0, tip: "修改成功" });
    }
  );
};
export default {
  getAllArticle,
  publishArticle,
  getPrivateArticle,
  getAuthorInfo,
  getArticleDetail,
  deleteArticle,
  updateArticle,
};
