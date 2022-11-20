const mongoose = require ("mongoose")

const UserSchema = new mongoose.Schema({
    username: {type: String, required:true, unique: true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true, min: 5},
    description: {type: String},
    profilePicture: {type: String, default: "",},
    coverPicture: {type: String, default:""},
    followers: {type: Array, default: []},
    following: {type: Array, default: []},
    isAdmin: {type: Boolean, default: false},
},
{ timestamps: true }
)

const User = mongoose.model("Users", UserSchema)

module.exports = User
