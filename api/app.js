const express = require("express");

const app = express();

const cors = require("cors");

const feedbackRouter = require("./routes/feedbackRoutes");
const commentRouter = require("./routes/commentRoutes");
const replyRouter = require("./routes/replyRoutes");

app.use(cors());

// req.body'i kullanmak için lazım
app.use(express.json());

// ! WHERE OUR ROUTER MOUNTS
// ! They are simply middleware functions that only apply for a certain URL.

app.get("/", (req, res) => res.json("hello, from the server"));

app.use("/api/v1/feedbacks", feedbackRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/replies", replyRouter);

module.exports = app;
