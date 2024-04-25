const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/publisher.controller");

router.get("/", controller.index);

router.get("/detail/:idPublisher", controller.detail);

router.patch("/change-status/:status/:idPublisher", controller.changeStatus);

router.post("/create", controller.create);

router.patch("/edit/:idPublisher", controller.edit);

router.delete("/delete/:idPublisher", controller.delete);

module.exports = router;
