//DB Instance
const db = require("../models")


//find all posts
const index = async (req, res) => {
  // res.send("get route working")
  db.Post.find({}, (err, posts) => {
         if(err) return res.status(404).json({error: err.message})
         return res.status(200).json({
            posts,
            requestedAt: new Date().toLocaleDateString()
         })
      })
}

//posts for our timeline
const timeline = async (req, res) => {
  // res.send("get route working")
  try {
    const currentUser = await db.User.findById(req.params.userId);
    const userPosts = await db.Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return db.Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
}

// const getPostId = async (req, res) => {
//   try {
//     const post = await db.Post.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }

const userPosts = async (req, res) => {
  try {
    const user = await db.User.findOne({ username: req.params.username });
    const posts = await db.Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
}

//create a post with req.body
const create = (req, res) => {
  db.Post.create(req.body, (error, createdPosts) => {
    console.log(error)
    if(error) return res.status(400).json({error: error.message})
    return res.status(200).json(createdPosts)
  })
  // res.send("create")
}

//destroy a single post by its ID
const destroy = async (req, res) => {
    // res.send('destroy route')
    try {
      const post = await db.Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne({ $set: req.body });
        res.status(200).json("You deleted your post!");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
}

//update route
const update = async (req, res) => {
  try {
    const post = await db.Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("You updated your post!");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

//like and dislike a post
const like = async (req, res) => {
  try {
    const post = await db.Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("the post has been liked")
    } else {
      await post.updateOne({ $pull: {likes: req.body.userId } });
      res.status(200).json("the post has been disliked")
    }
  } catch (err) {
    res.status(500).json(err)
  }
}



module.exports = {
  index,
  timeline,
  create,
  destroy,
  update,
  like,
  userPosts,
  // getPostId
}
