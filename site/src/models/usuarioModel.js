var database = require("../database/config");

function listar() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
        SELECT * FROM usuario;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = sha2('${senha}', 256);
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, sobrenome, email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucao = `
        INSERT INTO usuario (nome, sobrenome, email, senha) VALUES ('${nome}', '${sobrenome}', '${email}', sha2('${senha}', 256));
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function verificaremail(email) {
  var instrucao = `SELECT * FROM usuario WHERE email = '${email}'`;
  console.log("Executando verificação de e-mail: \n" + instrucao);
  return database.executar(instrucao);
}

function finalizar(resp1, id) {
  var instrucao = `insert into respostas (pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, fkUsuario) values (${resp1}, ${id});`;
  console.log("Executando envio das respostas: \n" + instrucao);
  return database.executar(instrucao);
}

function escolher_pergunta(respostas_select) {
  return new Promise(function (resolve, reject) {
    var instrucao = `select count(Pergunta${respostas_select}) as qtd from respostas where Pergunta${respostas_select} = 1;`;
    var instrucao2 = `select count(Pergunta${respostas_select}) as qtd from respostas where Pergunta${respostas_select} = 2;`;
    var instrucao3 = `select count(Pergunta${respostas_select}) as qtd from respostas where Pergunta${respostas_select} = 3;`;
    var instrucao4 = `select count(Pergunta${respostas_select}) as qtd from respostas where Pergunta${respostas_select} = 4;`;
    var instrucao5 = `select count(Pergunta${respostas_select}) as qtd from respostas where Pergunta${respostas_select} = 5;`;

    console.log(
      "Executando select das respostas: \n" + instrucao,
      instrucao2,
      instrucao3,
      instrucao4,
      instrucao5
    );

    var resultados_respostas = [];

    resultados_respostas.push(database.executar(instrucao));
    resultados_respostas.push(database.executar(instrucao2));
    resultados_respostas.push(database.executar(instrucao3));
    resultados_respostas.push(database.executar(instrucao4));
    resultados_respostas.push(database.executar(instrucao5));

    Promise.all(resultados_respostas)
      .then(function (res) {
        resolve(res);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

function enviar_alteracao_email(email, id) {
  var instrucao = `update usuario set email = '${email}' where idUsuario = ${id};`;
  console.log("Executando alteração de e-mail: \n" + instrucao);
  return database.executar(instrucao);
}

function enviar_alteracao_senha(senha, id) {
  var instrucao = `update usuario set senha = sha2('${senha}', 256) where idUsuario = ${id};`;
  console.log("Executando alteração de senha: \n" + instrucao);
  return database.executar(instrucao);
}

function enviar_cadastro_completo() {
  var instrucao = `insert into respostas (pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, fkUsuario) values (${resp1}, ${id});`;
  console.log("Executando envio das respostas: \n" + instrucao);
  return database.executar(instrucao);
}

function enviar_cadastro_completo(
  data_nascimento,
  genero,
  estado,
  cidade,
  cep,
  idUsuario
) {
  return new Promise(function (resolve, reject) {
    var instrucao1 = `update usuario set data_nascimento = '${data_nascimento}' where idUsuario = ${idUsuario};`;
    var instrucao2 = `update usuario set genero = '${genero}' where idUsuario = ${idUsuario};`;
    var instrucao3 = `update usuario set estado = '${estado}' where idUsuario = ${idUsuario};`;
    var instrucao4 = `update usuario set cidade = '${cidade}' where idUsuario = ${idUsuario};`;
    var instrucao5 = `update usuario set cep = '${cep}' where idUsuario = ${idUsuario};`;

    console.log(
      "Executando envio das respostas: \n" + instrucao1,
      instrucao2,
      instrucao3,
      instrucao4,
      instrucao5
    );

    var updates = [];

    updates.push(database.executar(instrucao1));
    updates.push(database.executar(instrucao2));
    updates.push(database.executar(instrucao3));
    updates.push(database.executar(instrucao4));
    updates.push(database.executar(instrucao5));

    Promise.all(updates)
      .then(function (res) {
        resolve(res);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

function verificarsenha(senha) {
  var instrucao = `SELECT * FROM usuario WHERE senha = sha2('${senha}', 256)`;
  console.log("Executando verificação de senha: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  verificaremail,
  finalizar,
  escolher_pergunta,
  enviar_alteracao_email,
  enviar_alteracao_senha,
  enviar_cadastro_completo,
  verificarsenha
};
