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
      res.status(400).json('Invalid username or password')
    }
  }
  })
}

const signout = (req, res) => {
  req.session.destroy(() => {
      res.status(200).json({ msg: 'users logged out' })
  })
}


//get user
const index = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await db.User.findById(userId)
      : await db.User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
}

//try catch
//https://expressjs.com/en/guide/error-handling.html
//https://www.w3schools.com/js/js_errors.asp
//docs for push
//https://www.mongodb.com/docs/manual/reference/operator/update/push/
const follow = async (req, res) => {
  if(req.body.userId !== req.params.id) {
    try {
      const user = await db.User.findById(req.params.id);
      const currentUser = await db.User.findById(req.body.userId);
      if(!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("you followed the user")
      } else {
        res.status(400).json("you already follow this user")
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(400).json("You cannot follow your own account")
  }
}

//docs for pull https://www.mongodb.com/docs/manual/reference/operator/update/pull/
const unfollow = async (req, res) => {
  if(req.body.userId !== req.params.id) {
    try{
      const user = await db.User.findById(req.params.id);
      const currentUser = await db.User.findById(req.body.userId);
      if(user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("You unfollowed the user");
      } else {
        res.status(400).json("You don't follow this user")
      }
    } catch(err) {
      res.status(500).json(err)
    }
  }
}

//destroy a single post by its ID
const destroy = (req, res) => {
    // res.send('destroy route')
  db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    if(err) return res.status(400).json({error: error.message})
    return res.status(200).json({
      message: "User deleted Successfully"
    })
  })
}


module.exports = {
  index,
  register,
  signin,
  signout,
  follow,
  unfollow,
  destroy,
}
