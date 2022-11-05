const express = require("express")
const router = express.Router()

const ctrls = require("../controllers")

router.post("/signin", ctrls.users.signin)
router.post("/register", ctrls.users.register)
router.delete("/signout", ctrls.users.signout)
module.exports = router;
