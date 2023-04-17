import bcrypt from "bcryptjs";
import { generateAccessToken } from "../middlewares/jwt.js";
import User from "../models/user.model.js";

async function getAllUsers() {
  return User.find();
}

async function authenticate(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid email or password");
  }
  const token = generateAccessToken(hash);
  const userData = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    gender: user.gender,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    verified: user.verified,
    role: user.role,
    token,
  };
  return userData;
}

async function createUser(
  firstName,
  lastName,
  username,
  gender,
  email,
  phone,
  password
) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    firstName,
    lastName,
    username,
    gender,
    email,
    phone,
    password: hashedPassword,
    role: "user",
    avatar: "",
    verified: 0,
  });
  return newUser.save();
}

export default {
  getAllUsers,
  authenticate,
  createUser,
};
