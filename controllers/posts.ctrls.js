//DB Instance
const db = require("../models")
//posts get route
const index = (req, res) => {
  // res.send("get route working")
  db.Post.find({}, (err,
    posts) => {
      if(err) return res.status(404).json({error: err.message})
      return res.status(200).json({
        posts,
        requestedAt: new Date().toLocaleDateString()
      })
    })
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
const destroy = (req, res) => {
    // res.send('destroy route')
  db.Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
    if(err) return res.status(400).json({error: error.message})
    return res.status(200).json({
      message: "Post deleted Successfully"
    })
  })
}

//update route
const update = (req, res) => {
    db.Post.findByIdAndUpdate(req.params.id,
        {
            $set: req.body
        },
        {new: true},
        (err, updatedPost) => {
            if(err) return res.status(400).json({error: err.message})
            return res.status(200).json(updatedPost)
        }
    )
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
  create,
  destroy,
  update,
  like
}
