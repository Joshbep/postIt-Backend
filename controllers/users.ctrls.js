const db = require("../models");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  // res.send("created")
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  db.User.findOne({username: req.body.username}, (err, userExists) => {
    if(userExists) {
      res.send('that username is taken')
    } else {
      db.User.create(req.body, (error, createdUser) => {
        res.status(201).json(createdUser)
      })
    }
  })
}


module.exports = {
   register
}
