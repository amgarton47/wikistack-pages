const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () =>
  layout(html`
    <h3>Add a Page</h3>
    <hr />
    <form method="POST" action="/wiki/">
      <div class="form-group">
        <label for="name" class="col-sm-2 control-label">Author</label>
        <div class="col-sm-10">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            class="form-control"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="name" class="col-sm-2 control-label">Email</label>
        <div class="col-sm-10">
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email"
            class="form-control"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="title" class="col-sm-2 control-label">Page Title</label>
        <div class="col-sm-10">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter article title"
            class="form-control"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="name" class="col-sm-2 control-label">Content</label>
        <div class="col-sm-10">
          <input
            id="content"
            name="content"
            type="text"
            placeholder="Enter article body"
            class="form-control"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="name" class="col-sm-2 control-label">Page Status</label>
        <div class="col-sm-10">
          <input
            id="status"
            name="status"
            type="text"
            placeholder="Open or Closed"
            class="form-control"
          />
        </div>
      </div>

      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
      </div>
    </form>
  `);
