const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const registerUser = async (data) => {
  const { name, email, password } = data;


  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) {
    return { message: "User already exists", status: 400};
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await userModel.createUser({
    name,
    email,
    password_hash: hashedPassword,
    role: "CUSTOMER",
    created_at: new Date()
  });

  return { message: "User registered successfully", status: 200 };
};

const loginUser = async (data) => {
  const { email, password } = data;

  const user = await userModel.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials",);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};

module.exports = {
  registerUser,
  loginUser,
};