const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/order.controller.js");

router.get("/", controller.index);

router.get("/detail/:idOrder", controller.detail);

module.exports = router;
