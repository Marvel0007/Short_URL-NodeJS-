const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.render("signup", {
        error: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render("signup", {
        error: "User already exists",
      });
    }

    // Create user
    await User.create({
      name,
      email,
      password,
    });

    return res.redirect("/login");

  } catch (error) {
    console.log("Signup Error:", error);

    return res.status(500).send("Internal Server Error");
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.render("login", {
        error: "Email and Password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email,
      password,
    });

    if (!user) {
      return res.render("login", {
        error: "Invalid Email or Password",
      });
    }

    // Generate token
    const token = setUser(user);

    // Store token in cookies
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.redirect("/");

  } catch (error) {
    console.log("Login Error:", error);

    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};