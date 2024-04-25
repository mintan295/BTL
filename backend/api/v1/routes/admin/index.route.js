const routerBook = require("./book.route");
const routerPublisher = require("./publisher.route");
const routerAccount = require("./account.route");
const routerUser = require("./user.route");
const routerAuth = require("./auth.route");
const routerMyAccount = require("./my-account.route");
const routerOrder = require("./order.route");

const apiAdmin = (app) => {
  const prefixAdmin = "/api/admin";
  app.use(prefixAdmin + "/books", routerBook);

  app.use(prefixAdmin + "/publishers", routerPublisher);

  app.use(prefixAdmin + "/accounts", routerAccount);

  app.use(prefixAdmin + "/users", routerUser);

  app.use(prefixAdmin + "/auth", routerAuth);

  app.use(prefixAdmin + "/my-account", routerMyAccount);

  app.use(prefixAdmin + "/orders", routerOrder);
};

module.exports = apiAdmin;
