import User from "../model/user.js";
// import Submission from "../model/submission.js";
import express from "express";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const { username, email, phoneNum, college, year, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcryptjs.hash(password, 12);
    const createdUser = new User({
      username: username,
      email: email,
      phoneNum: phoneNum,
      college: college,
      year: year,
      password: hashPassword,
    });
    await createdUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        phoneNum: createdUser.phoneNum,
        college: createdUser.college,
        year: createdUser.year,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export const update = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndUpdate(id, {
//       ...req.body.user,
//     });
//     res.status(201).json({
//       message: "Update profile successfully",
//       user: {
//         // _id: user._id,
//         // username: user.username,
//         email: user.email,
//         // phoneNum: user.phoneNum,
//         // college: user.college,
//         // year: user.year,
//       },
//     });
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(404).json({ message: "Invalid username or password" });
    } else {
      res.status(200).json({
        message: "Logged in successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          phoneNum: user.phoneNum,
          college: user.college,
          year: user.year,
        },
      });
    }
  } catch (e) {
    console.log("Error" + e);
    res.status(500).json({ message: "Something went wrong" });
  }
};
