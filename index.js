const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./userSchema");

const app = express();
app.use(express.json());

const getAllUsers = async (req, res, next) => {
  try {
    // Calls a find function against every User document in the database, with no parameters it will return them all
    const users = await User.find();
    // set response status to 200 and return the object with all the users
    res.status(200).json({
      status: "success",
      totalUsers: users.length,
      users,
    });
  } catch (err) {
    return next(console.log(err.message));
  }
};

const getOneUser = async (req, res, next) => {
  try {
    //calls a find function looking for a specific user out of the database using request parameters
    const user = await User.findById(req.params.id);
    //typically would return an error but I don't have the error handlers set up ----
    if (!user) {
      return next(console.log("No user found with that ID"));
    }
    // set response status to 200 and return an object with the specific user
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    //Call a create method on the user model to create a new user document in the database
    const user = await User.create(req.body);
    // set response status to 201 and return an object with the newly created user
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (err) {
    return next(console.log(err));
  }
};

const updateUser = async (req, res, next) => {
  try {
    //call a method against the user model to find a specific document and update the content
    const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
      //these settings are for the database and are irrelevant at the moment
      new: true,
      runValidators: true,
    });
    //set response status to 200 and return an object with the updated user
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  } catch (err) {
    return next(console.log(err));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    //call a method against the user model to find and delete the specific document
    const user = await Model.findByIdAndDelete(req.params.id);
    //set response to 204, return status of success no data
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return next(console.log(err));
  }
};

app.route("/api/users/")
  .get(getAllUsers)
  .post(createUser)

app.route("/api/users/:id")
  .get(getOneUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = app;
