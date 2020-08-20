const express = require("express");
const app = express();
const PORT = "8080";

// logging middleware
const morgan = require("morgan");
app.use(morgan("dev"));

// serve up static files
app.use(express.static("/public"));

app.listen(PORT, () => {
  console.log(`wikistack app is running on port${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

app.get("/", (req, rest) => {
  rest.send("hello world");
});

app.use(express.urlencoded({ extended: false }));
