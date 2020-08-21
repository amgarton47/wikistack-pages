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
      tags: req.body.tags,
    });

    await page.setAuthor(user.id);

    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

wikiRouter.get("/search", async (req, res, next) => {
  try {
    const pages = await Page.findByTag(req.query.search.split(" "));
    res.send(main(pages));
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

    if (page) {
      res.send(wikiPage(page, await page.getAuthor()));
    } else {
      res.send(`this article with slug "${req.params.slug}" does not exist`);
    }
  } catch (err) {
    next(err);
  }
});

wikiRouter.get("/:slug/similar", async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });

    if (page) {
      const similar = await page.findSimilar();
      res.send(main(similar));
    } else {
      res.send(`this article with slug "${req.params.slug}" does not exist`);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = wikiRouter;
