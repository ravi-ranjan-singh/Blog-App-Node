const User = require('./../models/userModel');
const Post = require('./../models/postModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        `This route is not for password update. Please use /updatePassword`,
        400
      )
    );
  }

  const filterBody = filterObj(req.body, 'email', 'displayName');
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filterBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    user: updatedUser
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {

  await User.findByIdAndDelete(req.user._id)
  const posts = await Post.find({ 'author.ID': req.user._id })
  posts.forEach(async el => {
    await Post.findByIdAndDelete(el._id)
  })

  res.status(204).json({})
})