const express = require("express");
// const { requireAuth } = require('express-openid-connect');

const postController = require("../controllers/postController");
const router = express.Router();

// GET request for a post content
router.get("/:id", postController.postItem);

router.get("/video/:name", postController.getMedia);

// GET request to create post
router.get("/create", postController.postCreateGet);

// POST request to create a post
router.post("/create", postController.postCreatePost);

// GET request to delete a post
router.get("/:id/delete", postController.postDeleteGet);

// POST request to delete a post
router.post("/:id/delete", postController.postDeletePost);

// GET request to update a post
router.get("/:id/update", postController.postUpdateGet);

// POST request to update a post
router.post("/:id/update", postController.postUpdatePost);

// POST request to add comment on a post
router.post("/:id/comment", postController.postUpdateComment);

module.exports = router;
