const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/my-account.controller");

router.post("/", controller.get);

module.exports = router;
