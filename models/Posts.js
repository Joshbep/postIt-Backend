//https://mongoosejs.com/docs/schematypes.html
//for mongoose.Schema.Types.Object.id
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  description: {type: String, required: true},
  img: {type: String},
  likes: {type: Array, default: []},
  comments: {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
    }
  }
},
{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema)

module.exports = Post;
