const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./../../models/productModel");
const User = require("./../../models/userModel");

const { toUSVString } = require("util");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  });

//read json fileS
const products = JSON.parse(fs.readFileSync(`${__dirname}/User.json`, "utf-8"));

//impote data into db
const importData = async () => {
  try {
    await User.create(products);

    console.log("Data created");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE all data from colection database
const deleteData = async () => {
  try {
    await User.deleteMany();

    console.log("Data deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  //process.argv in the exp node ./../kak/ --delete process.argv[2]= -- delete
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
