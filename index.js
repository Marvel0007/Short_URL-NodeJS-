require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectToMongoDB } = require("./connect");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();

const PORT = process.env.PORT || 5000;


// ==============================
// MongoDB Connection
// ==============================

connectToMongoDB(process.env.MONGO_URI);


// ==============================
// View Engine
// ==============================

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


// ==============================
// Middlewares
// ==============================

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkForAuthentication);


// ==============================
// Routes
// ==============================

app.use(
  "/url",
  restrictTo(["NORMAL", "ADMIN"]),
  urlRoute
);

app.use("/user", userRoute);

app.use("/", staticRoute);


// ==============================
// Ignore Favicon Error
// ==============================

app.get("/favicon.ico", (req, res) => res.sendStatus(204));


// ==============================
// Redirect Short URL
// ==============================

app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      {
        new: true,
      }
    );

    // URL not found
    if (!entry) {
      return res.status(404).send("Invalid Short URL");
    }

    return res.redirect(entry.redirectURL);

  } catch (error) {
    console.log("Redirect Error:", error);

    return res.status(500).send("Internal Server Error");
  }
});


// ==============================
// Start Server
// ==============================

app.listen(PORT, () => {
  console.log(`Server Started at Port: ${PORT}`);
});