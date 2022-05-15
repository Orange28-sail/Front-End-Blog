import Comment from "../model/comments.js";
import mongoose from "mongoose";
// 获取所有评论
const getAllComment = (req, res) => {
  const query = req.body.id;
  Comment.find({ article_id: query }, (err, doc) => {
    if (err) return console.log(err);
    if (doc.length === 0) {
      res.send({
        status: 1,
        tip: "暂无评论",
      });
    } else {
      res.send({
        status: 0,
        tip: "获取评论成功",
        data: doc,
      });
    }
  });
};
// 添加评论（1）
const addCommentOne = (req, res) => {
  const commentInfo = req.body;
  const comment = new Comment({
    article_id: commentInfo.article_id,
    time: commentInfo.time,
    master: commentInfo.master,
    content: commentInfo.content,
  });
  comment.save((err, doc) => {
    if (err) return console.log(err);
    res.send({
      status: 0,
      tip: "发布成功",
      data: doc,
    });
  });
};
// 添加评论（2）
const addCommentTwo = (req, res) => {
  const commentTwo = req.body;
  const father = mongoose.mongo.ObjectId(commentTwo.father);
  Comment.findOneAndUpdate(
    { _id: father },
    {
      $push: {
        son: {
          master: commentTwo.master,
          content: commentTwo.content,
          time: commentTwo.time,
          father: commentTwo.father,
          to: commentTwo.to,
        },
      },
    },
    (err, doc) => {
      if (err) return console.log(err);
      res.send({
        status: 0,
        tip: "发布成功",
        data: doc,
      });
    }
  );
};
export default {
  getAllComment,
  addCommentOne,
  addCommentTwo,
};
