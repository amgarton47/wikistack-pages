const express = require("express");
const usersRouter = express.Router();

const { userList, userPages } = require("../views");

const { User, Page } = require("../models");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.send(userList(users));
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const pages = await Page.findAll({ where: { authorId: req.params.id } });

    res.send(userPages(user, pages));
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
