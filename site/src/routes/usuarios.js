var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/verificaremail", function(req,res){
    usuarioController.verificaremail(req,res);
})

router.post("/enviarrespostas", function(req,res){
    usuarioController.finalizar(req,res);
})

router.post("/receberrespostas", function(req,res){
    usuarioController.escolher_pergunta(req,res);
})

module.exports = router;