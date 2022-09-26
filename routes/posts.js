// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/multer");
// // const postsController = require("../controllers/posts");
// const petsController = require("../controllers/pets");
// const { ensureAuth, ensureGuest } = require("../middleware/auth");

// //Post Routes - simplified for now
// router.get("/:id", ensureAuth, postsController.getPost);

// // router.post("/createPost", upload.single("file"), postsController.createPost);
// router.post("/createPet", upload.single("file"), petsController.createPet);

// router.put("/likePost/:id", postsController.likePost);

// router.delete("/deletePost/:id", postsController.deletePost);

// module.exports = router;