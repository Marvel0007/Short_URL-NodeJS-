const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const {checkForAuthentication, restrictTo} = require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user')

const app = express();
const PORT = 3000;

connectToMongoDB('mongodb://localhost:27017/short_url')
  .then(() => console.log('MongoDb Connected'));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url",restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: { timestamp: Date.now() },
            },
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).send("Invalid short URL");
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at Port: ${PORT}`));