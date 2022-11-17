const express = require("express")
const router = express.Router()

const ctrls = require("../controllers")

router.get("/", ctrls.users.index)
router.get("/:id", ctrls.users.getUserId)
router.post("/signin", ctrls.users.signin)
router.post("/register", ctrls.users.register)
router.delete("/signout", ctrls.users.signout)
router.put("/:id/follow", ctrls.users.follow)
router.put("/:id/unfollow", ctrls.users.unfollow)
router.delete("/:id", ctrls.users.destroy)
module.exports = router;
