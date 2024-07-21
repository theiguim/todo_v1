const USER = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userCtrl = {


    register: async (req, res) => {

        const havaUser = await USER.findOne({email:req.body.email});
        if(havaUser) return res.status(404).json({sucess:false, message:"E-mail inválido (*já existe)"});

        let user = {
            name:req.body.name,
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password),
        };

        try{

            let doc = await new USER(user);
            doc.save();
            res.status(200).json({
                sucess:true,
                message:"usuário cadastrado com sucesso."
            });

        }catch(err){
            res.status(404).json({
                sucess:false,
                message: "erro"
            });
        };
    },

    login: async (req, res) => {

        const haveUser = await USER.findOne({email:req.body.email});
        if(!haveUser) return res.status(401).json({sucess:false, message:"E-mail inválido (*email não existeno bd)"})


        const decode = bcrypt.compareSync(req.body.password, haveUser.password);
        if(!decode) return res.status(401).json({sucess: false, message:"E-mail ou senha inválida *(senha inválida)"})

        const token = jwt.sign({id:haveUser._id}, "segredoJWT");

        res.header("Token-Auth", token);
        res.json({sucess:true, message:"logado com sucesso"});


    },
};

module.exports = userCtrl