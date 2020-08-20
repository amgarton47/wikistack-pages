const express = require("express");
const app = express();
const PORT = "8080";
const { db, Page, User } = require("./models");

const { main } = require("./views");

// logging middleware
const morgan = require("morgan");
app.use(morgan("dev"));

// serve up static files
app.use(express.static("/public"));

// url body parsing middleware
app.use(express.urlencoded({ extended: false }));

// main route
app.get("/", (req, rest) => {
  rest.send(main(""));
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

const startApp = async () => {
  await db.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`Wikistack app is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
};

startApp();
