const express = require("express")
const router = express.Router()

const ctrls = require("../controllers")

router.get("/", ctrls.users.index)
router.post("/signin", ctrls.users.signin)
router.post("/register", ctrls.users.register)
router.delete("/signout", ctrls.users.signout)
router.put("/:id/follow", ctrls.users.follow)
module.exports = router;
