import User from "../model/user.js";
import express from "express";
import bcryptjs from "bcryptjs";

const generateReferralCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  let code = "AAVHAN";

  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  for (let i = 0; i < 2; i++) {
    code += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return code;
};

export const signup = async (req, res) => {
  try {
    const { username, email, phoneNum, college, year, password, referralCode } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate a referral code if not provided in the request body
    const generatedReferralCode = referralCode || generateReferralCode();

    // Hash the password
    const hashPassword = await bcryptjs.hash(password, 12);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      phoneNum,
      college,
      year,
      password: hashPassword,
      referralCode: generatedReferralCode,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message and user details
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phoneNum: newUser.phoneNum,
        college: newUser.college,
        year: newUser.year,
        referralCode: newUser.referralCode,
      },
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const { userId, username, email, phoneNum, college, year, password } = req.body;
    
    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.phoneNum = phoneNum || user.phoneNum;
    user.college = college || user.college;
    user.year = year || user.year;
    
    // Update password if provided
    if (password) {
      const hashPassword = await bcryptjs.hash(password, 12);
      user.password = hashPassword;
    }

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phoneNum: user.phoneNum,
        college: user.college,
        year: user.year,
      },
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Logged in successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phoneNum: user.phoneNum,
        college: user.college,
        year: user.year,
        referralCode: user.referralCode
      },
    });
  } catch (e) {
    console.log("Error" + e);
    res.status(500).json({ message: "Something went wrong" });
  }
};
