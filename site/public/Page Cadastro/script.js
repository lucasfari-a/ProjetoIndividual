
const msgErro = document.getElementById("msgErro")

function cadastrar() {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome.value;
    var sobrenomeVar = sobrenome.value;
    var emailVar = email.value;
    var senhaVar = senha.value;

    
    // Validações de Cadastro

    // msgErro é uma div dentro do meu site que exibe uma mensagem de erro, por padrão é msgErro é display: none
    // finalizarAguardar() fica no funcoes.js
    if (nomeVar == "" || sobrenomeVar == "" || emailVar == "" || senhaVar == "") {
        msgErro.style.display = "block"
        msgErro.innerHTML = "Todos os campos devem estar preenchidos";
        finalizarAguardar();
        return false;
    }
   else if (emailVar.indexOf("@") == -1) {
        msgErro.style.display = "flex"
        msgErro.innerHTML = "O e-mail deve conter @"
        finalizarAguardar();
        return false;
    } else if (senhaVar.length < 6) {
        msgErro.style.display = "block"
        msgErro.innerHTML = "A senha deve conter no mínimo 6 caracteres"
        finalizarAguardar();
        return false;
    }

    // Intervalo para sumir a mensagem de erro em ms, essa função se encontra no final do script
    else {
        setInterval(sumirMensagem, 5000)
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            sobrenomeServer: sobrenomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        // Aqui basicamente ele ta enviando uma request pro meu servidor verificando se o insert na tabela foi TRUE
        if (resposta.ok) {

            // Mensagem de Errro
            // cardErro.style.display = "block";

            // mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

            // "=>" é uma abreviação para função, aqui basicamente ele após validar o cadastro, ele te redireciona para pagina de login em 500ms
            setTimeout(() => {
                window.location = `"../Page Login/paginalogin.html"`
            }, "500")


            // Ambas funções estão explicadas lá na funcoes.js
            limparSessao();
            finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });

    

    return false;
}
// Some a mensagem
function sumirMensagem() {
    msgErro.style.display = "none"
}