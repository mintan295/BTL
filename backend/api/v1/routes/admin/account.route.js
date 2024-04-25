const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/account.controller");

router.get("/", controller.index);

router.get("/detail/:idAccount", controller.detail);

router.patch("/change-status/:status/:idAccount", controller.changeStatus);

router.post("/create", controller.create);

router.patch("/edit/:idAccount", controller.edit);

router.delete("/delete/:idAccount", controller.delete);

module.exports = router;
