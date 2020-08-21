const db = require("./db");
const Page = require("./page");
const User = require("./user");

Page.belongsTo(User, { as: "author" });
User.hasMany(Page, { foreignKey: "authorId" });

module.exports = { db, Page, User };
