const routerBook = require("./book.route");
const routerAuth = require("./auth.route");
const routerMyUser = require("./my-user.router");
const routerOrder = require("./order.route");

const apiClient = (app) => {
  const prefix = "/api";
  app.use(prefix + "/books", routerBook);

  app.use(prefix + "/auth", routerAuth);

  app.use(prefix + "/my-user", routerMyUser);

  app.use(prefix + "/order", routerOrder);
};

module.exports = apiClient;
