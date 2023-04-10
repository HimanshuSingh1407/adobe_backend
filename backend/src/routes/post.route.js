const express = require("express");
const UserModel=require("../model/user.model")
const PostModel=require("../model/post.model")
var uniqid = require('uniqid'); 

const app = express.Router()

app.post('/', async (req, res) => {
    try{
      const {content, user } = req.body;
      const FindUser = await UserModel.findOne({id:user});
      if (!FindUser) return res.status(400).send({ error: 'User not found' });
      const post = new PostModel({ content,id:uniqid(),user_id: FindUser._id });
      await post.save();
      res.send(post);
    }catch(e){
       res.status(404).send({ error: e.message });
    }
  });

app.get('/:id', async (req, res) => {
    try{
      const id =req.params.id
      const post=await PostModel.findOne({id:id})
      res.send(post);
    }catch(e){
      res.status(500).send(e.message)
    }
})

app.put('/:id', async (req, res) => {
  try{
     const {content}=req.body;
     const id =req.params.id
       const post=await PostModel.findOneAndUpdate({id:id},{content})
       console.log(content)
       res.send(post);
  }catch(e){
     res.status(500).send(e.message)
  }
})

app.delete('/:id', async (req, res) => {
  try{
      const id =req.params.id
      const post=await PostModel.deleteOne({id:id})
      res.status(200).send("post deleted successfully");
  }catch(e){
      res.status(500).send(e.message)
  }
})

app.post('/:id/like', async (req, res) => {
    try{
      const postId=req.params.id
      console.log(postId)
      const result = await PostModel.findOneAndUpdate(
        postId,
        { $inc: { likes: 1 } },
        { new: true }
      );
      res.status(201).send(result);
    }catch(e){
       res.status(500).send(e.message)
    }
})

app.post('/:id/dislike', async (req, res) => {
    try{
      const postId=req.params.id
      const result = await PostModel.findOneAndUpdate(
        postId,
        { $inc: { likes: -1 } },
        { new: true }
      );
      res.send(result)
    }catch(e){
       res.status(500).send(e.message)
    }
})

app.get('/analytics/posts', async (req, res) => {
  PostModel.countDocuments({})
  .then(count => {
    res.send(`Total number of Posts: ${count}`);
  })
  .catch(err => {
    res.send(err);
  });
})

app.get('/analytics/users/top-liked', async (req, res) => {

  
})

app.get("/", async (req, res) => {
  const posts = await PostModel.find();
  res.send(posts);
});


module.exports =app;

