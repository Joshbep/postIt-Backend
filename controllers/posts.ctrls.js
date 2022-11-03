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
        requestedAt: new Date().toLocalDateString()
      })
    })
}


module.exports = {
  index
}
