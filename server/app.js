require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./router/authRouter")
const userRouter = require("./router/userRouter");
const validateMID = require("./middlewere/validationMiddlewere");

const path = require("path");
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URL);
app.use(cors({
    origin: "*",
    exposedHeaders: ['Token-Auth']
}));

app.use(express.json());

app.use("/oauth", userRouter);
app.use("/auth", validateMID, authRouter);

//app.use(express.static(path.join(__dirname, "./public")));
//app.get("*", (req, res)=>{
//res.sendFile(path.join(__dirname, "./public/index.html"));
// })

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));
