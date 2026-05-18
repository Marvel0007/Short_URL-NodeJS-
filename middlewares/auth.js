const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  try {
    const tokenCookie = req.cookies?.token;

    req.user = null;

    // If no token found
    if (!tokenCookie) {
      return next();
    }

    // Verify token
    const user = getUser(tokenCookie);

    req.user = user;

    return next();

  } catch (error) {
    console.log("Authentication Error:", error);

    req.user = null;

    return next();
  }
}

function restrictTo(roles = []) {
  return function (req, res, next) {

    // Check login
    if (!req.user) {
      return res.redirect("/login");
    }

    // Check roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Unauthorized Access");
    }

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};