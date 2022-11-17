//https://mongoosejs.com/docs/schematypes.html
//for mongoose.Schema.Types.Object.id
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {type:String, required: true},
  description: {type: String},
  img: {type: String},
  likes: {type: Array, default: []},
  comments: {
    userId:{
      type: String
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
