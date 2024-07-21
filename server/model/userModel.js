const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

name:{type:String, required:true, maxlength:100},
email:{type:String, required:true, maxlength:200},
password:{type:String, required:true, maxlength:200}
});


module.exports = mongoose.model("user", userSchema);