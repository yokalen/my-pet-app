const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
    user: {}
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {

  req.logout((err) => {
    if(err) {
      return next(err);
    }
    console.log('User has logged out.');
    //moved req.session.destroy inside req.logout callback to fix err
    req.session.destroy((err) => {
      if (err)
        console.log("Error : Failed to destroy the session during logout.", err);
      req.user = null;
      res.redirect("/");
    });
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.getAccount = (req, res) => {
  if (req.user) {
    return res.redirect("/account");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 4 }))
    validationErrors.push({
      msg: "Password must be at least 4 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  })

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { email: req.body.email },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile");
        });
      });
    }
  );
};

exports.changePassword = (req, res) => {
  const currentPassword = req.user.password;
  const newPassword = req.body.newPassword;

  if (currentPassword === newPassword) {
    // The new password is the same as the current password
    res.send('The new password must be different from the current password');
  } else {
    // Update the password in the database
    User.findByIdAndUpdate(req.user._id, { password: newPassword }, (err) => {
      if (err) {
        // There was an error updating the password
        res.send('There was an error updating your password');
      } else {
        // The password was successfully updated
        alert('Password updated!');
        res.redirect("/account");
      }
    })
  }
};