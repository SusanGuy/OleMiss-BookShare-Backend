const User = require("../models/user");

// ----Auth handlers start----
const signupUser = async (req, res) => {
  req.body.avatar = "";
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    let validationErrors = {};
    if (error.errors || error.code === 11000) {
      if (error.errors) {
        if (error.errors.name) {
          validationErrors.nameError = "Name is required";
        }
        if (error.errors.email) {
          switch (error.errors.email.kind) {
            case "user defined":
              validationErrors.emailError = "Email is invalid";
              break;
            default:
              validationErrors.emailError = "Email is required";
          }
        }
        if (error.errors.password) {
          switch (error.errors.password.kind) {
            case "minlength":
              validationErrors.passwordError =
                "Password must be 6 characters long";
              break;
            case "required":
              validationErrors.passwordError = "Password is required";
              break;
            default:
              validationErrors.passwordError =
                "Cannot contain the word password";
          }
        }
      } else {
        validationErrors.authError = "User already exists";
      }
      return res.status(400).send(validationErrors);
    }
    return res.status(500).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  let validationErrors = {};
  if (req.body.email === "" || req.body.password === "") {
    if (req.body.email === "") {
      validationErrors.emailError = "Email is Required";
    }
    if (req.body.password === "") {
      validationErrors.passwordError = "Password is Required";
    }
    return res.status(400).send(validationErrors);
  }
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    if (error.message?.includes("timed out")) {
      return res.status(400).send({ error: "Network error" });
    }
    if (error.toString().includes("Error: ")) {
      return res.status(400).send({
        error: error.toString().split("Error: ")[1],
      });
    }

    return res.status(500).send({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getLoggedInUserInfo = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//Question:Do I allow changing password in a seperate route or in this same route?
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email"];
  const isValidOperators = updates.every((item) => {
    return allowedUpdates.includes(item);
  });
  if (!isValidOperators) {
    return res.status(400).send({
      errMessage: "Invalid Operation!",
    });
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    let validationErrors = {};
    if (error.errors || error.code === 11000) {
      if (error.errors) {
        if (error.errors.email) {
          switch (error.errors.email.kind) {
            case "user defined":
              validationErrors.emailError = "Email is invalid";
              break;
            default:
              validationErrors.emailError = "Email is required";
          }
        }
      } else {
        validationErrors.authError = "User already exists";
      }
      return res.status(400).send(validationErrors);
    }

    return res.status(500).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getUserBookmarks = async (req, res) => {
  try {
    const { bookmarks } = await User.findById(req.user._id).populate({
      path: "bookmarks",
    });
    res.send(bookmarks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//Use virtual field to build these apis
const getBooksUserSold = async (req, res) => {};
const getBooksUserRequested = async (req, res) => {};

//Todo: Upload Image to AWS S3 and save the url to image avatar
const changeAvatar = async (req, res) => {};
const deleteAvatar = async (req, res) => {};

//Ways to handle password change
const changePassword = async (req, res) => {};

module.exports = {
  signupUser,
  loginUser,
  getLoggedInUserInfo,
  logout,
  updateUser,
  changeAvatar,
  deleteAvatar,
  deleteUser,
  getUserBookmarks,
  changePassword,
  getBooksUserSold,
  getBooksUserRequested,
};
