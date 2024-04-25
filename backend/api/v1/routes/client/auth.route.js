const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/auth.controller");

router.post("/login", controller.login);

router.post("/register", controller.register);

module.exports = router;
