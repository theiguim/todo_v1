const express = require("express");
const router = express.Router();
const todoRouter = require("./todoRouter");

router.use("/todo", todoRouter);


module.exports = router;