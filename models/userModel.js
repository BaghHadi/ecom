const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please write a valid email address"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "seller", "admin"],
    default: "user",
  },
  password: {
    type: String,
    require: [true, "A user must have an mdp"],
    select: false, //dont shaw in postmane
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    require: [true, "A user must confirm their password"],
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      massage: "Password are not the same ",
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false, //to not show it
  },
});

//to incript mdp nrmment
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // if the password has not be modidified it will jump to the next

  //hash password
  this.password = await bcrypt.hash(this.password, 12); //await becaus we use an async fucntion
  //delet confirm
  this.passwordConfirm = undefined; //to supp passwordConfirm
  next();
});

userSchema.methods.verifyPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
//heeloooo
