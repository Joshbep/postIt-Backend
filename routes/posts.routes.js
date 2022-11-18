const express = require("express")
const router = express.Router()

const ctrls = require("../controllers")
router.get("/", ctrls.posts.index)
router.get("/:id", ctrls.posts.getPostId)
router.get("/timeline/all", ctrls.posts.timeline)
router.get("/profile/:username", ctrls.posts.userPosts)
router.post("/", ctrls.posts.create)
router.delete("/:id", ctrls.posts.destroy)
router.put("/:id", ctrls.posts.update)
router.put("/:id/like", ctrls.posts.like)

module.exports = router;
