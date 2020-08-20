const express = require("express");
const app = express();
const PORT = "3000";

const { db, Page, User } = require("./models");

const { main } = require("./views");

// logging middleware
const morgan = require("morgan");
app.use(morgan("dev"));

// serve up static files
app.use(express.static("public"));

// url body parsing middleware
app.use(express.urlencoded({ extended: false }));

// main route
app.get("/", (req, res) => {
  //   res.send(main(""));
  res.redirect("/wiki");
});

app.use("/wiki", require("./routes/wiki"));
app.use("/users", require("./routes/users"));

// test if the connection is working
db.authenticate().then(() => {
  console.log("connected to the database");
});

const startApp = async () => {
  await db.sync();

  app.listen(PORT, () => {
    console.log(`Wikistack app is up and running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
};

startApp();
