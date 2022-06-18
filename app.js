const users = require("./routes/users");
const users = require("./routes/auth");
const cards = require("./routes/cards");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/my rest_api", {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongoDB.."))
  .catch((err) => console.error("Could not connect to mongoDB..."));

app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cards", cards);

const port = 3000;
http.listen(port, () => console.log("LIstening on port ${port}..."));
