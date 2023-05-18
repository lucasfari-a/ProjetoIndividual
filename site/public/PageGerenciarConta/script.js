function abrir_menu_flutuante() {
    var menu_flutuante = document.getElementById("bloco_flutuante")

    if (menu_flutuante.style.display == 'none') {
        menu_flutuante.style.display = `flex`
    } else {
        menu_flutuante.style.display = 'none'
    }
}

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
    const msgErro = document.getElementById("msgErro")

    if (email_atual == "" || email_novo == "") {
        msgErro.innerHTML = `Preencha ambos os campos!`
    }
     else if (email_atual != email_atual_verificacao) {
        msgErro.innerHTML = `Esse não é o seu e-mail atual!`
    } else if (email_atual == email_novo){
        msgErro.innerHTML = `Ambos os e-mails são iguais`
    } else if ((email_novo.indexOf("@") == -1) || (email_novo.indexOf(".") == -1)) {
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
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idServer: idUsuario,
                        emailNovoServer: email_novo
                    })
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

function enviar_alteracao_senha(){

    const msgErro_senha = document.getElementById("msgErro_senha")
    var senha_atual = inp_senha_atual.value;
    var senha_nova = inp_senha_nova.value;
    var senha_confirmar = inp_confirmar_senha.value;
    var idUsuario = sessionStorage.ID_USUARIO;

    if (senha_atual == senha_nova) {
        msgErro_senha.innerHTML = `Ambas as senhas são iguais`
    } else if (senha_nova != senha_confirmar) {
        msgErro_senha.innerHTML = `As senhas não coincidem`
    } else {
    fetch("/usuarios/atualizarsenha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            senhaNovaServer: senha_nova,
            idServer: idUsuario
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            setTimeout(function () {
                msgErro_senha.innerHTML = `Senha atualizada com sucesso!`;
                msgErro_senha.style.color = `green`;
            }, 500);
                setTimeout(function () {
                    window.location = "../Page Login/paginalogin.html"
                    limparSessao();
                }, 2000);               
        } else {
            throw new Error("Houve um erro ao atualizar a senha!");
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
}
