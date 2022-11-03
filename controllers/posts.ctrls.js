//DB Instance
const db = require("../models")
//posts get route
const index = (req, res) => {
  res.send("get route working")
}


module.exports = {
  index
}
