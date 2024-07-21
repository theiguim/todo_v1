const mongoose = require("mongoose");

const apiModel = new mongoose.Schema({
user:{type:String, required:true},
title:{type:String, required:true, maxlength:100},
description:{type:String, required:true, maxlength: 500},
});

module.exports = mongoose.model("todo", apiModel);