const express = require("express")
const router = express.Router()

const ctrls = require("../controllers")

router.get("/", ctrls.posts.index)
router.post("/", ctrls.posts.create)
router.delete("/:id", ctrls.posts.destroy)

module.exports = router;
