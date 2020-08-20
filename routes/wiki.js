const express = require("express");
const wikiRouter = express.Router();

const { addPage, wikiPage, main } = require("../views");
const { Page, User } = require("../models");

wikiRouter.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) {
    next(err);
  }
});

wikiRouter.post("/", async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });

    await page.setAuthor(user.id);

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

wikiRouter.get("/add", (req, res, next) => {
  res.send(addPage());
});

wikiRouter.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    const author = await page.getAuthor();
    res.send(wikiPage(page, author.name));
  } catch (err) {
    next(err);
  }
});

module.exports = wikiRouter;
