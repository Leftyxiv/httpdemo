const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./userSchema");
const { nextTick } = require("process");

const app = express();
app.use(express.json());

const getAllUsers = async (User) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      users,
    });
  } catch (err) {
    return next(console.log(err.message));
  }
};

const getOneUser = async (User) => {
  try {
    const user = User.findById(req.params.id);

    if (!user) {
      return next(console.log("No user found with that ID"));
    }

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (User) => {
  try {
    const user = User.create(req.body);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

app.route("http://127.0.0.1:4000/api/users");

module.exports = app;
