const Sequelize = require("sequelize");
const db = require("./db");

const Page = db.define("page", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: { type: Sequelize.ENUM("open", "closed"), defaultValue: "closed" },
  tags: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: [] },
});

Page.beforeValidate((pageInstance) => {
  pageInstance.slug = pageInstance.title
    .replace(/\s+/g, "_")
    .replace(/\W/g, "");
});

Page.beforeCreate((pageInstance) => {
  pageInstance.tags = pageInstance.tags.split(" ");
});

Page.findByTag = (tags) => {
  return Page.findAll({
    // Op.overlap matches a set of possibilities
    where: {
      tags: {
        [Sequelize.Op.overlap]: tags,
      },
    },
  });
};

Page.prototype.findSimilar = async function () {
  const pages = await Page.findAll({
    where: {
      tags: {
        [Sequelize.Op.overlap]: this.tags,
      },
    },
  });

  return pages.filter((page) => page.id !== this.id);
};

module.exports = Page;
