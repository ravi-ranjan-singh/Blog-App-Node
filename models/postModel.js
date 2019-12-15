const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  author: {
    name: String,
    ID: String
  },
  title: {
    type: String,
    required: [true, 'A post must have a title'],
    trim: true,
    unique: true
  },
  content: {
    type: String,
    required: [true, 'A post body cannot be empty'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'A post must have a category'],
    trim: true
  },
  tags: [String],
  likes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      comment: String,
      userName: String
    }
  ]
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
