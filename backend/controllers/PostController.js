const Post = require('../models/Post');

const addPost = async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  const { title, text, username, courseId } = req.body;

  if (!title || !username || !courseId || !text) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const post = new Post({
    title,
    text,
    user: {
      id: userId,
      name: username,
    },
    course: courseId,
  });

  await post.save();

  return res.status(200).json(post);
};

const getPosts = async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  const posts = await Post.find({ course: courseId });
  console.log(posts);
  return res.status(200).json(posts);
};

const replyOnPost = async (req, res) => {
  const { userId } = req.user;
  const { postId } = req.params;
  const { reply, username } = req.body;
  console.log(req.body);
  console.log(userId, postId, reply, username);
  if (!userId || !postId || !reply || !username) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(400).json({ msg: 'Post not found' });
  }

  post.replies.push({
    user: {
      id: userId,
      name: username,
    },
    reply,
  });

  await post.save();
  res.status(200).json(post);
};

module.exports = {
  addPost,
  getPosts,
  replyOnPost,
};
