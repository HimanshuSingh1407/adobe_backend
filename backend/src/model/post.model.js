const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: {
    unique: true,
    type:String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300
  },
  likes: {
    type: Number,
    min: 0,
    default: 0
  }
},{timestamps:true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
