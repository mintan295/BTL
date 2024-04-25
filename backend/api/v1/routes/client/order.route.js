const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/order.controller");

router.get("/:userId", controller.getAll);

router.post("/create", controller.order);

router.patch("/give", controller.give);

module.exports = router;
