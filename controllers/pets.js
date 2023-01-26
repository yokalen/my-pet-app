const cloudinary = require("../middleware/cloudinary");
const Pet = require("../models/Pet");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const pets = await Pet.find({ user: req.user.id });
      res.render("profile.ejs", { pets: pets, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  addPet: async (req, res) => {
    try {
      res.render("addpet.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getAccount: async (req, res) => {
    try {
      res.render("account.ejs");
    } catch (err) {
      console.log(err);
    }
  },
  getAllPets: async (req, res) => {
    try {
      const pets = await Pet.find().sort({ createdAt: "desc" }).lean();
      res.render("mypets.ejs", { pets: pets });
    } catch (err) {
      console.log(err);
    }
  },
  getPet: async (req, res) => {
    try {
      const petinfo = await Pet.findById(req.params.id);
    //   const comments = await Comment.find( {post: req.params.id} ).sort({ createdAt: "desc" }).lean();
    //   res.render("profile.ejs", { pet: pet, user: req.user, comments: comments });
    res.render("pet.ejs", { pet: petinfo, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPet: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Pet.create({
        animal: req.body.animal,
        name: req.body.name,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        // breed: req.body.breed,
        // color: req.body.color,
        // size: req.body.size,
        dob: req.body.dob,
        user: req.user.id,
      });
      console.log("Pet has been added!");
      res.redirect("/mypets");
    } catch (err) {
      console.log(err);
    }
  },
  deletePet: async (req, res) => {
    try {
      // Find pet by id
      let pet = await Pet.findById({ _id: req.params.id });
      console.log(pet)
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(pet.cloudinaryId);
      // Delete post from db
      await Pet.remove({ _id: req.params.id });
      console.log("Deleted Pet");
      res.redirect("/mypets");
    } catch (err) {
      res.redirect("/mypets");
    }
  },
};