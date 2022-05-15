import Message from "../model/message.js";
// 获取留言
const getAllMessage = (req, res) => {
  Message.find({}, (err, doc) => {
    if (err) return console.log(err);
    res.send({ status: 0, data: doc, tip: "获取留言成功" });
  });
};
// 发布留言
const postMessage = (req, res) => {
  const message = req.body;
  if (
    message.name.length >= 0 &&
    message.name.length <= 16 &&
    message.content.length > 0 &&
    message.content.length <= 520
  ) {
    const newMessage = new Message({
      name: message.name,
      content: message.content,
      imgColor: message.imgColor,
    });
    newMessage.save((err, doc) => {
      if (err) return console.log(err);
      res.send({ status: 0, data: doc, tip: "发布留言成功" });
    });
  } else {
    res.send({ status: 1, tip: "信息填入错误" });
  }
};

export default {
  getAllMessage,
  postMessage,
};
