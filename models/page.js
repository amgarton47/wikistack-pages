const Sequelize = require("sequelize");
const db = require("./db");

const Page = db.define("page", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: { type: Sequelize.ENUM("open", "closed"), defaultValue: "closed" },
});

Page.beforeValidate((pageInstance) => {
  pageInstance.slug = pageInstance.title
    .replace(/\s+/g, "_")
    .replace(/\W/g, "");
});

module.exports = Page;
