const db = require("../config/db");

const createUser = async (user) => {
  const { name, email, password_hash, role } = user;
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password_hash, role]
  ).catch((err) => {
    console.error("Error creating user:", err);
    throw new Error("Database error");
  });

  return result;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};