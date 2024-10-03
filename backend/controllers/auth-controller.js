const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// register
const register = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const checkUser = await User.findOne({ userName });
    if (checkUser)
      return res
        .status(409)
        .json({ success: false, message: "user already exists" });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering",
    });
  }
};

// login
const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const checkUser = await User.findOne({ userName });
    if (!checkUser)
      return res.status(403).json({
        success: false,
        message: "User doesn't exist. Please register",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(200)
      .json({
        success: true,
        message: "LoggedIn Successful",
        user: {
          id: checkUser._id,
          userName: checkUser.userName,
          token: token,
        },
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Logging in",
    });
  }
};

// logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging out user",
    });
  }
};

// middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};

module.exports = { register, login, logout, authMiddleware };
