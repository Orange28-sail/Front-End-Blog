import User from "../model/user.js";
import user_reg from "../plugin/user_regexp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
import mongoose from "mongoose";
// 注册
const register = (req, res) => {
  // 接收表单数据
  const userinfo = req.body;
  //  查询数据库中是否已注册
  User.find({ username: userinfo.username }, (err, doc) => {
    if (err) return console.log(err);
    if (doc.length !== 0) {
      return res.send({ status: 1, tip: "该用户名已被占用" });
    } else {
      User.find({ email: userinfo.email }, (err, doc) => {
        if (err) return console.log(err);
        if (doc.length !== 0) {
          return res.send({ status: 1, tip: "该邮箱已被占用" });
        } else {
          // 判断数据是否合法
          if (
            !user_reg.regexp_name.test(userinfo.username) ||
            !user_reg.regexp_word.test(userinfo.password) ||
            !user_reg.regexp_email.test(userinfo.email)
          ) {
            return res.send({
              status: 1,
              message: "",
              tip: "请输入正确的注册信息",
            });
          }
          // 提交注册信息
          const user = new User({
            username: req.body.username,
            // 加密密码
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
          });
          user.save((err, doc) => {
            if (err) return console.log(err);
            res.send({
              status: 0,
              tip: "注册成功",
            });
          });
        }
      });
    }
  });
};
// 登录
const login = (req, res) => {
  //  检测表单数据是否合法
  const userinfo = req.body;
  if (
    !user_reg.regexp_name.test(userinfo.username) ||
    !user_reg.regexp_word.test(userinfo.password)
  ) {
    return res.send({
      status: 1,
      tip: "请输入正确的登录信息",
    });
  }
  // 根据用户名查询用户的数据
  User.find({ username: userinfo.username }, (err, doc) => {
    if (err) return console.log(err);
    if (doc.length === 0) {
      return res.send({ status: 1, tip: "无该用户信息，请先注册" });
    } else {
      // 判断用户输入的密码是否正确
      const compareResult = bcrypt.compareSync(
        userinfo.password,
        doc[0].password
      );
      if (!compareResult) {
        return res.send({ status: 1, tip: "密码错误，登录失败" });
      } else {
        // 将头像和密码的值剔除
        const { _doc } = doc[0];
        const user = { ..._doc, password: "", user_pic: "" };
        // 将用户信息对象加密成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
          expiresIn: config.expiresIn, // token 有效期为 10 个小时
        });
        // 将生成的 Token 字符串响应给客户端
        console.log("登陆成功");
        res.send({
          status: 0,
          tip: "登录成功",
          // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
          token: `Bearer ${tokenStr}`,
        });
      }
    }
  });
};
// 获取用户信息
const getUserInfo = (req, res) => {
  const query_id = mongoose.mongo.ObjectId(req.user._id);
  User.find({ _id: query_id }, (err, doc) => {
    if (err) return console.log(err);
    const data = doc[0]._doc;
    const userinfo = { ...data, password: "" };
    res.send({
      status: 0,
      tip: "获取用户信息成功",
      data: userinfo,
    });
  });
};
// 修改用户资料
const updateInfo = (req, res) => {
  const query_id = mongoose.mongo.ObjectId(req.user._id);
  const newInfo = req.body;
  User.updateOne(
    { _id: query_id },
    {
      name: newInfo.name,
      email: newInfo.email,
      intro: newInfo.intro,
      user_pic: newInfo.img,
    },
    (err, doc) => {
      if (err) return res.send({ status: 1, err: err });
      return res.send({ status: 0, tip: "修改成功" });
    }
  );
};
export default {
  register,
  login,
  getUserInfo,
  updateInfo,
};
