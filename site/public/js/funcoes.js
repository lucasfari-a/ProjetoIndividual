// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;


    const nomeSaudacao = document.getElementById("nome_saudacao");
    const emailSaudacao = document.getElementById("email_saudacao");

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        nomeSaudacao.innerHTML = `${nome}`;
        emailSaudacao.innerHTML = `${email}`;

        // finalizarAguardar();
    } else {
        window.location = "../Page Login/paginalogin.html";
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../Page Login/paginalogin.html";
}


