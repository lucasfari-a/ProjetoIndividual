const msgErro = document.getElementById("msgErro");

function verificaremail(email, callback) {
  fetch("/usuarios/verificaremail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailServer: email
    })
  })
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Erro na verificação do e-mail");
    }
  })
  .then(function(data) {
    callback(null, data.emailCadastrado);
  })
  .catch(function(error) {
    console.error(error);
    callback(error);
  });
}

function cadastrar() {
  var nomeVar = nome.value;
  var sobrenomeVar = sobrenome.value;
  var emailVar = email.value;
  var senhaVar = senha.value;

  if (nomeVar === "" || sobrenomeVar === "" || emailVar === "" || senhaVar === "") {
    msgErro.style.display = "block";
    msgErro.innerHTML = "Todos os campos devem estar preenchidos";
    finalizarAguardar();
    return false;
  } else if (emailVar.indexOf("@") === -1 || emailVar.indexOf(".") === -1) {
    msgErro.style.display = "block";
    msgErro.innerHTML = "O e-mail deve conter @ e .";
    finalizarAguardar();
    return false;
  } else if (senhaVar.length < 6) {
    msgErro.style.display = "block";
    msgErro.innerHTML = "A senha deve conter no mínimo 6 caracteres";
    finalizarAguardar();
    return false;
  } else {
    verificaremail(emailVar, function(error, emailCadastrado) {
      if (error) {
        console.error(error);
        return;
      }

      if (emailCadastrado) {
        msgErro.style.display = "block";
        msgErro.innerHTML = "O email já está cadastrado.";
        finalizarAguardar();
        return false;
      } else {
        fetch("/usuarios/cadastrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nomeServer: nomeVar,
            sobrenomeServer: sobrenomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
          })
        })
        .then(function(resposta) {
          if (resposta.ok) {
            setTimeout(function() {
              window.location = "../Page Login/paginalogin.html";
            }, 500);

            limparSessao();
            finalizarAguardar();
          } else {
            throw new Error("Houve um erro ao tentar realizar o cadastro!");
          }
        })
        .catch(function(resposta) {
          console.log("#ERRO: " + resposta);
        });

        return false;
      }
    });
  }
}

function sumirMensagem() {
  msgErro.style.display = "none";
}
