const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/Post");

//config
// template engine

app.engine("handlebars",handlebars.engine({defaultLayout:"main",
runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
},}));
app.set("view engine","handlebars");

//body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//rotas
app.get("/", (req,res)=>{
    res.render("layouts/form");
});

app.get("/home",(req,res)=>{
    Post.findAll({order:[["id","DESC"]]}).then((posts)=>{
        res.render("layouts/home",{posts:posts});

    });
    
});
//atenção no modo de envio GET/POST
app.post("/text",(req,res)=>{
    Post.create({
        titulo: req.body.title,
        conteudo: req.body.text
    }).then(()=>{
        res.redirect("/home")
    }).catch((error)=>{
        res.send("houve um error: "+error)

    });
    
});

app.get("/deletar/:id",(req,res)=>{
    Post.destroy({where:{"id":req.params.id}}).then(()=>{
        res.redirect("/home")
    }).catch((error)=>{
        res.send("Postagem não existe!")

    });

});

app.listen(3010,()=>{
    console.log("server rodando!!")
});