const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/book.controller");

router.get("/", controller.index);

router.get("/detail/:slugBook", controller.detail);

router.patch("/change-status/:slugBook", controller.changeStatus);

module.exports = router;
