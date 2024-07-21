const express = require("express");
const router = express.Router()
const todoCtrl = require("../controller/todoCtrl");



router.get("/", todoCtrl.findAll);
router.get("/:id", todoCtrl.findOne);
router.post("/", todoCtrl.postOne);
router.delete("/:id", todoCtrl.deleteOne);
router.put("/:id", todoCtrl.updateOne);



module.exports = router