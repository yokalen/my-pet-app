const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
// const postsController = require("../controllers/posts");
const petsController = require("../controllers/pets")
const { ensureAuth } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/account", ensureAuth, authController.getAccount);
router.get("/profile", ensureAuth, petsController.getProfile);
router.get("/addPet", ensureAuth, petsController.addPet);
// router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/mypets", ensureAuth, petsController.getAllPets)
// router.get("/feed", ensureAuth, petsController.getAllPets);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.post("/changePassword", authController.changePassword);


module.exports = router;