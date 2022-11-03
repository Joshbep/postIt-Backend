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

//create a pin with req.body
const create = (req, res) => {
  db.Post.create(req.body, (error, createdPosts) => {
    console.log(error)
    if(error) return res.status(400).json({error: error.message})
    return res.status(200).json(createdPosts)
  })
  // res.send("create")
}


module.exports = {
  index,
  create,
}
