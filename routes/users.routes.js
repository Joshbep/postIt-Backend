const express = require("express")
const router = express.Router()

const ctrls = require("../controllers")

router.get("/:id", ctrls.users.index)
router.post("/signin", ctrls.users.signin)
router.post("/register", ctrls.users.register)
router.delete("/signout", ctrls.users.signout)
router.put("/:id/follow", ctrls.users.follow)
router.put("/:id/unfollow", ctrls.users.unfollow)
module.exports = router;
