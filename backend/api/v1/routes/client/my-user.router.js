const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/my-user.controller");

router.get("/:tokenUser", controller.myUser);

router.patch("/update", controller.update);

module.exports = router;
