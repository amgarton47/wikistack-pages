const express = require("express");
const app = express();
const PORT = "3000";

const { db, Page, User } = require("./models");

const { notFound, errorPage } = require("./views");

// logging middleware
const morgan = require("morgan");
app.use(morgan("dev"));

// serve up static files
app.use(express.static("public"));

// url body parsing middleware
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

app.use("/wiki", require("./routes/wiki"));
app.use("/users", require("./routes/users"));

// catches 404 not found errors
app.use((req, res) => {
  res.status(404).send(notFound());
});

// catches internal server errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(errorPage());
});

// test if the connection is working
db.authenticate().then(() => {
  console.log("connected to the database");
});

const startApp = async () => {
  await db.sync(/*{ force: true }*/);

  app.listen(PORT, () => {
    console.log(`Wikistack app is up and running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
};

startApp();
