import Article from "../model/article.js";
import mongoose from "mongoose";

//* 根据类别搜索（public）
const searchPublicArticleByClass = (req, res) => {
  const { query } = req.body;
  Article.find(
    {
      status: 1,
      tags: { $elemMatch: { $eq: `${query}` } },
    },
    (err, doc) => {
      if (err) return console.log(err);
      if (doc.length === 0)
        return res.send({
          status: 1,
          data: doc,
          tip: "未查询到有效数据",
        });
      res.send({
        status: 0,
        data: doc,
        tip: "获取成功",
      });
    }
  );
};
//* 根据类别搜索（private）
const searchPrivateArticleByClass = (req, res) => {
  const { query } = req.body;
  const author_id = req.user._id;
  Article.find(
    {
      status: 1,
      author_id,
      tags: { $elemMatch: { $eq: `${query}` } },
    },
    (err, doc) => {
      if (err) return console.log(err);
      if (doc.length === 0)
        return res.send({
          status: 1,
          data: doc,
          tip: "未查询到有效数据",
        });
      res.send({
        status: 0,
        data: doc,
        tip: "获取成功",
      });
    }
  );
};
// 根据时间查询
const searchByTime = (req, res) => {
  const query = req.body;
  Article.find({ time: query.time }, (err, doc) => {
    if (err) return console.log(err);
    if (doc.length === 0)
      return res.send({
        status: 1,
        data: doc,
        tip: "无查询内容",
      });
    res.send({
      status: 0,
      data: doc,
      tip: "查询成功",
    });
  });
};
// 根据搜索内容查询
const searchByInput = (req, res) => {
  const query = req.body;
  const regexp = new RegExp(query.input, "i");
  if (query.select === "title") {
    Article.find({ title: regexp }, (err, doc) => {
      if (err) return console.log(err);
      if (doc.length === 0)
        return res.send({
          status: 1,
          data: doc,
          tip: "无查询内容",
        });
      res.send({
        status: 0,
        data: doc,
        tip: "查询成功",
      });
    });
  }
  if (query.select === "content") {
    Article.find({ content: regexp }, (err, doc) => {
      if (err) return console.log(err);
      if (doc.length === 0)
        return res.send({
          status: 1,
          data: doc,
          tip: "无查询内容",
        });
      res.send({
        status: 0,
        data: doc,
        tip: "查询成功",
      });
    });
  }
};
export default {
  searchPublicArticleByClass,
  searchPrivateArticleByClass,
  searchByInput,
  searchByTime,
};
