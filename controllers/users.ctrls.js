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

const signin = (req, res) => {
  console.log(req.body)
  db.User.findOne({username: req.body.username}, (err, foundUser) => {
    if(foundUser) {
      console.log(foundUser)
      const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
      if (validLogin) {
        res.json(foundUser)
    } else {
      res.send('Invalid username or password')
    }
  }
  })
}

const signout = (req, res) => {
  req.session.destroy(() => {
      res.status(200).json({ msg: 'users logged out' })
  })
}


module.exports = {
   register,
   signin,
   signout
}
