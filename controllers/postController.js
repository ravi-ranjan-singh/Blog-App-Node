const Post = require('./../models/postModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: posts
  });
});

exports.addAPost = catchAsync(async (req, res, next) => {
  const postData = { ...req.body };
  postData.author = {};

  postData.author.name = req.user.displayName;
  postData.author.ID = req.user._id;

  const post = await Post.create(postData);
  delete post._v;
  res.status(201).json({
    status: 'success',
    post
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError('No Post find with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: post
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const authorID = (await Post.findById(req.params.id)).author.ID;
  if (!(authorID == req.user._id)) {
    return next(
      new AppError('You are not authorised to update this post', 401)
    );
  }

  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  });
  if (!post) {
    return next(new AppError('No Post find with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: post
  });
});

exports.deletePost = async (req, res, next) => {
  const authorID = (await Post.findById(req.params.id)).author.ID;
  if (!(authorID == req.user._id) && !(req.user.role == 'admin')) {
    return next(
      new AppError('You are not authorised to delete this post', 401)
    );
  }
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return next(new AppError('No Post find with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
};
