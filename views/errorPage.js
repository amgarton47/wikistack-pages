const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () =>
  layout(
    html`<div style="text-align: center">
      <h1>500 - Internal Server Error!</h1>
      <img src="/500-error.gif" style="width: 500px" />
    </div>`
  );
