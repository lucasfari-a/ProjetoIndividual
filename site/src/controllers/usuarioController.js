var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
  console.log("ENTRAMOS NA usuarioController");
  res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
  usuarioModel.listar()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(
      function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      }
    );
}

function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {

    usuarioModel.entrar(email, senha)
      .then(
        function (resultado) {
          console.log(`\nResultados encontrados: ${resultado.length}`);
          console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

          if (resultado.length == 1) {
            console.log(resultado);
            res.json(resultado[0]);
          } else if (resultado.length == 0) {
            res.status(403).send("Email e/ou senha inválido(s)");
          } else {
            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
          }
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        }
      );
  }

}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var sobrenome = req.body.sobrenomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (sobrenome == undefined) {
    res.status(400).send("Seu sobrenome está undefined")
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel.cadastrar(nome, sobrenome, email, senha)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function verificaremail(req, res) {
  var email = req.body.emailServer;

  if (email == undefined) {
    res.status(400).send("O email está indefinido!");
  } else {
    usuarioModel
      .verificaremail(email)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.json({ emailCadastrado: true });
        } else {
          res.json({ emailCadastrado: false });
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao verificar o email! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function finalizar(req, res) {
  var valores = req.body.respostasServer
  var idUsuario = req.body.idServer

  if (valores == undefined || idUsuario == undefined) {
    res.status(400).send("Respostas vazias ou usuário não logado!");
  } else {
    usuarioModel
      .finalizar(valores, idUsuario)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.json({ respostas_enviadas: true });
        } else {
          res.json({ respostas_enviadas: false });
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao verificar o email! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function escolher_pergunta(req, res) {
  var respostas_select = req.body.respostas_selectServer

  if (respostas_select == undefined) {
    res.status(400).send("Respostas incompletas");
  } else {
    usuarioModel
      .escolher_pergunta(respostas_select)
      .then(function (resultado) {
        if (resultado.length > 0) {
          console.log(resultado)
          res.json(resultado);
        } else {
          res.json({ respostas_recebidas: false });
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouver um erro ao receber as respostas: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function enviar_alteracao_email(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var email_novo = req.body.emailNovoServer;
  var idUsuario = req.body.idServer

  // Faça as validações dos valores
  if (email_novo == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("Usuário não logado! ID não encontrado!");
  } else {
    usuarioModel.enviar_alteracao_email(email_novo, idUsuario)
      .then(
        function (resultado) {
          if (resultado.length > 0) {
            res.json({ atualizacao_email_enviada: true });
          } else {
            res.json({ atualizacao_email_enviada: false });
          }
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar a atualização do e-mail Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function enviar_alteracao_senha(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var senha_nova= req.body.senhaNovaServer;
  var idUsuario = req.body.idServer

  // Faça as validações dos valores
  if (senha_nova == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (idUsuario == undefined) {
    res.status(400).send("Usuário não logado! ID não encontrado!");
  } else {
    usuarioModel.enviar_alteracao_senha(senha_nova, idUsuario)
      .then(
        function (resultado) {
          if (resultado.length > 0) {
            res.json({ atualizacao_senha_enviada: true });
          } else {
            res.json({ atualizacao_senha_enviada: false });
          }
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar a atualização da senha. Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  testar,
  verificaremail,
  finalizar,
  escolher_pergunta,
  enviar_alteracao_email,
  enviar_alteracao_senha
}