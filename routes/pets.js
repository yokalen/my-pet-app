const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const petsController = require("../controllers/pets");
const { ensureAuth } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, petsController.getPet);

router.post("/createPet", upload.single("file"), petsController.createPet);

// router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePet/:id", petsController.deletePet);

module.exports = router;