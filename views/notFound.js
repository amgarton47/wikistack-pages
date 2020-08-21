const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () =>
  layout(
    html`<div style="text-align: center">
      <h1>404 - Page Not Found!</h1>
      <img src="/404-error.gif" style="width: 500px" />
    </div>`
  );
