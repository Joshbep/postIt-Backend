const mongoose = require ("mongoose")

const UserSchema = new mongoose.Schema({
    username: {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required:true, min: 5},
    followers: {type: Array, default: []},
    following: {type: Array, default: []}
},
{ timestamps: true }
)

const User = mongoose.model("Users", UserSchema)

module.exports = User
