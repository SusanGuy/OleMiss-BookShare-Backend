const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    token: {
      type: String,
    },
    avatar: {
      type: String,
      trim: true,
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookForSale",
      },
    ],
  },
  {
    toJSON: true,
    timestamps: true,
  }
);

// To use virtual fields(Books Sold by this user)
userSchema.virtual("booksForSale", {
  ref: "BookForSale",
  //   Field on this document
  localField: "_id",
  //   Field on the other document
  foreignField: "seller",
});

// To use virtual fields(Book Requested by this user)
userSchema.virtual("booksRequested", {
  ref: "BookRequested",
  //   Field on this document
  localField: "_id",
  //   Field on the other document
  foreignField: "user",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.token;
  delete userObject.bookmarks;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.token = token;
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
