const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/user.controller");

router.get("/", controller.index);

router.get("/detail/:idUser", controller.detail);

router.patch("/change-status/:status/:idUser", controller.changeStatus);

router.post("/create", controller.create);

router.patch("/edit/:idUser", controller.edit);

router.delete("/delete/:idUser", controller.delete);

module.exports = router;
