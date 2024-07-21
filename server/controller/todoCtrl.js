const MODEL = require("../model/apiModel");

const apiCtrl = {

    findAll: async (req, res) => {

        try {
            let doc = await MODEL.find({user:req.user});
            // console.log(req.user)
            res.status(200).json({
                sucess: true,
                message: doc
            });

        } catch (err) {
            res.status(404).json({
                sucess: false,
                message: "Falha na consulta geral"
            });
        };
    },

    findOne: async (req, res) => {

        let id = req.params.id
        try {
            let doc = await MODEL.findOne({ _id:id, user:req.user});
            res.status(200).json({
                sucess: true,
                message: doc
            });

        } catch (err) {
            res.status(404).json({
                sucess: false,
                message: "Falha na consulta"
            });
        };
    },

    postOne: async (req, res) => {

        let apiDoc = {
            user: req.user,
            title: req.body.title,
            description: req.body.description
        };

        try {

            let doc = await new MODEL(apiDoc);
            doc.save();
            res.status(200).json({
                sucess: true,
                message: doc
            });

        } catch (err) {
            res.status(404).json({
                sucess: false,
                message: "Falha em postar item"
            });
        };
    },

    deleteOne: async (req, res) => {

        let id = req.params.id;

        try {

            let doc = await MODEL.deleteOne({ _id:id, user:req.user});
            res.status(200).json({
                sucess: true,
                message: "Item apagado com sucesso"
            });

        } catch (err) {
        };
    },

    updateOne: async (req, res) => {

        const id = req.params.id;

        let newPost = {
            title: req.body.title,
            description: req.body.description
        };

        try {
            let doc = await MODEL.updateOne({ _id: id, user:req.user}, newPost);
            res.status(200).json({
                sucess: true,
                message: doc
            });
        } catch (err) {
            res.status(404).json({
                sucess: false,
                message: "Erro ao atualizar item"
            });
        };
    },
};

module.exports = apiCtrl