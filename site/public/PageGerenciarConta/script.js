function abrir_menu_flutuante() {
  var menu_flutuante = document.getElementById("bloco_flutuante");

  if (menu_flutuante.style.display == "none") {
    menu_flutuante.style.display = `flex`;
  } else {
    menu_flutuante.style.display = "none";
  }
}

function verificaremail(email, callback) {
  fetch("/usuarios/verificaremail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: email,
    }),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro na verificação do e-mail");
      }
    })
    .then(function (data) {
      callback(null, data.emailCadastrado);
    })
    .catch(function (error) {
      console.error(error);
      callback(error);
    });
}

function enviar_alteracao_email() {
  var email_atual_verificacao = sessionStorage.EMAIL_USUARIO;
  var idUsuario = sessionStorage.ID_USUARIO;
  var email_novo = inp_email_novo.value;
  var email_atual = inp_email_atual.value;
  const msgErro = document.getElementById("msgErro");

  if (email_atual == "" || email_novo == "") {
    msgErro.innerHTML = `Preencha ambos os campos!`;
  } else if (email_atual != email_atual_verificacao) {
    msgErro.innerHTML = `Esse não é o seu e-mail atual!`;
  } else if (email_atual == email_novo) {
    msgErro.innerHTML = `Ambos os e-mails são iguais`;
  } else if (email_novo.indexOf("@") == -1 || email_novo.indexOf(".") == -1) {
    msgErro.innerHTML = "O e-mail deve conter @ e .";
  } else {
    verificaremail(email_novo, function (error, emailCadastrado) {
      if (error) {
        console.error(error);
        return;
      }

      if (emailCadastrado) {
        msgErro.style.display = "block";
        msgErro.innerHTML = "O email já está cadastrado.";
      } else {
        fetch("/usuarios/atualizaremail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idServer: idUsuario,
            emailNovoServer: email_novo,
          }),
        })
          .then(function (resposta) {
            if (resposta.ok) {
              setTimeout(function () {
                msgErro.innerHTML = `E-mail atualizado com sucesso!`;
                msgErro.style.color = `green`;
              }, 500);
              setTimeout(function () {
                window.location = `../Page Login/paginalogin.html`;
                limparSessao();
              }, 2000);
            } else {
              throw new Error("Houve um erro ao atualizar o e-mail");
            }
          })
          .catch(function (resposta) {
            console.log("#ERRO: " + resposta);
          });

        return false;
      }
    });
  }
}

function enviar_alteracao_senha() {
  const msgErro_senha = document.getElementById("msgErro_senha");
  var senha_atual = inp_senha_atual.value;
  var senha_nova = inp_senha_nova.value;
  var senha_confirmar = inp_confirmar_senha.value;
  var idUsuario = sessionStorage.ID_USUARIO;

  if (senha_atual == senha_nova) {
    msgErro_senha.innerHTML = `Ambas as senhas são iguais`;
  } else if (senha_nova != senha_confirmar) {
    msgErro_senha.innerHTML = `As senhas não coincidem`;
  } else if(senha_nova.length < 6) {
    msgErro_senha.innerHTML = `A senha precisa ter no mínimo 6 caracteres.`
  } else {
    fetch("/usuarios/atualizarsenha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senhaNovaServer: senha_nova,
        idServer: idUsuario,
      }),
    })
      .then(function (resposta) {
        if (resposta.ok) {
          setTimeout(function () {
            msgErro_senha.innerHTML = `Senha atualizada com sucesso!`;
            msgErro_senha.style.color = `green`;
          }, 500);
          setTimeout(function () {
            window.location = "../Page Login/paginalogin.html";
            limparSessao();
          }, 2000);
        } else {
          throw new Error("Houve um erro ao atualizar a senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });

    return false;
  }
}

function enviar_cadastro_completo() {
  var data_nascimento = inp_nascimento.value;
  var genero = [];
  var estado = inp_estado.value;
  var cidade = inp_cidade.value;
  var cep = inp_cep.value;
  const msgErro_cadastro_completo = document.getElementById(
    "msgErro_cadastro_completo"
  );

  function obter_resposta_genero(resposta_genero) {
    const radios = document.getElementsByName(resposta_genero);

    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        genero = radios[i].value;
        break;
      }
    }
  }

  obter_resposta_genero("resposta_genero");

  console.log(genero);

  fetch("/usuarios/enviarcadastrocompleto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dataNascimentoServer: data_nascimento,
      generoServer: genero,
      estadoServer: estado,
      cidadeServer: cidade,
      cepServer: cep,
      idServer: sessionStorage.ID_USUARIO,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        setTimeout(function () {
          msgErro_cadastro_completo.innerHTML = `Cadastro completo enviado com sucesso!`;
          msgErro_cadastro_completo.style.color = `green`;
        }, 500);
      } else {
        throw new Error("Houve um erro ao o cadastro completo!");
      }
    })
    .catch(function (resposta) {
      console.log("#ERRO: " + resposta);
    });

  return false;
}
