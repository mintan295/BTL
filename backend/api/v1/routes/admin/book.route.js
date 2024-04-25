const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/book.controller");

router.get("/", controller.index);

router.get("/detail/:idBook", controller.detail);

router.patch("/change-status/:status/:idBook", controller.changeStatus);

router.post("/create", controller.create);

router.patch("/edit/:idBook", controller.edit);

router.delete("/delete/:idBook", controller.delete);

module.exports = router;
