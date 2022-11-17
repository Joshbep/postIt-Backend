//https://mongoosejs.com/docs/schematypes.html
//for mongoose.Schema.Types.Object.id
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username:{type:String, required:true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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
