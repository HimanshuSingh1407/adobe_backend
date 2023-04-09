const express = require("express");
var uniqid = require("uniqid");
const UserModel = require("../model/user.model");
const PostModel = require("../model/post.model");

const app = express.Router();

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const user = new UserModel({ id: uniqid(), ...req.body });
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ id: id });
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { bio, name } = req.body;
    console.log(bio, name);
    const id = req.params.id;
    const user = await UserModel.findOneAndUpdate({ id: id }, { bio, name });
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.deleteOne({ id: id });
    res.status(200).send("user deleted successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get("/analytics/users", async (req, res) => {
  UserModel.countDocuments({})
    .then((count) => {
      res.send(`Total number of users: ${count}`);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/analytics/users/top-active", async (req, res) => {
  const totalPostData = await PostModel.find();
  let obj = {};
  for (let x = 0; x < totalPostData.length; x++) {
    if (obj[totalPostData[x].user_id] === undefined) {
      obj[totalPostData[x].user_id] = 1;
    } else {
      obj[totalPostData[x].user_id]++;
    }
  }
  const sortedObj = Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  res.send(sortedObj);
});

app.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});

module.exports = app;
