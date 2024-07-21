const USER = require("../model/userModel");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next)=>{


const token = req.header("token-auth");
if(!token) return res.status(401).json({sucess:false, message: "acesso negado, sem token"});


try{
    const userDecode = jwt.verify(token, "segredoJWT");
if(!userDecode) return res.status(401).json({sucess:false, message:"token não bate com o do header"});



    const userLog = await USER.findOne({_id:userDecode.id});
    if(!userLog) return res.status(401).json({sucess:false, message:"Acesso negadoAQ"}); 

req.user = userDecode.id;

next()
}catch(err){
    res.status(401).json({sucess:false, message:"deu problema no middlewere de validacao"});
};

};
