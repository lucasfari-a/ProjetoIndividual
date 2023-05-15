var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = sha2('${senha}', 256);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, sobrenome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
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
  
function finalizar(resp1) {
    var instrucao = `insert into respostas (pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, fkUsuario) values (${resp1}, 1);`
    console.log("Executando envio das respostas: \n" + instrucao)
    return database.executar(instrucao)
}

function escolher_pergunta(respostas_select) {
    return new Promise(function(resolve, reject) {
      var instrucao = `select count(Pergunta${respostas_select}) as qtd from respostas where Pergunta${respostas_select} = 1;`;
      var instrucao2 = `select count(Pergunta${respostas_select}) as qtd from respostas where Pergunta${respostas_select} = 2;`;
      var instrucao3 = `select count(Pergunta${respostas_select}) as qtd from respostas where Pergunta${respostas_select} = 3;`;
      var instrucao4 = `select count(Pergunta${respostas_select}) as qtd from respostas where Pergunta${respostas_select} = 4;`;
      var instrucao5 = `select count(Pergunta${respostas_select}) as qtd from respostas where Pergunta${respostas_select} = 5;`;
  
      console.log(
        "Executando select das respostas: \n" +
          instrucao,
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
        .then(function(res) {
          resolve(res);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
  

module.exports = {
    entrar,
    cadastrar,
    listar,
    verificaremail,
    finalizar,
    escolher_pergunta
};