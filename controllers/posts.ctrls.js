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
    res.send('destroy route')
  // db.Post.findByIdAndDelete(req.params.id,)
}




module.exports = {
  index,
  create,
  destroy
}
