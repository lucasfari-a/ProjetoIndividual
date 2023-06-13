function abrir_menu_flutuante(){
    var menu_flutuante = document.getElementById("bloco_flutuante")

    if(menu_flutuante.style.display == 'none'){
        menu_flutuante.style.display = `flex`
    } else {
        menu_flutuante.style.display = 'none'
    }
}

var MostrarEscolherBola = document.getElementById("bola_no_gol")
var TextoExplicativo = document.getElementById("texto_explicativo")
var botaoNovoChute = document.getElementById("botao_novo_chute")
var divGoleiro = document.getElementById("goleiro")
var BlocoIniciarJogo = document.getElementById("container_inicio_jogo")

function jogar(){
    
    BlocoIniciarJogo.style.display = "none"   
    MostrarEscolherBola.style.display = "flex"
    TextoExplicativo.style.display = "flex"
}

var goleiroEsquerda = `<img src="../assets/goleiroesquerda-removebg.png" alt="" style="transform: rotate(310deg)">`;
var goleiroDireita = `<img src="../assets/goleirodireita-removebg-preview.png" alt="" style="transform: rotate(30deg)">`;
var goleiroMeio = `<img src="../assets/goleiromeio-removebg-preview.png" alt="">`;

var bolaFutebol1 = document.getElementById("bola_futebol1");
var bolaFutebol2 = document.getElementById("bola_futebol2");
var bolaFutebol3 = document.getElementById("bola_futebol3");

var bolaInicial = document.getElementById("bola_marca_inicial")

var bolaFutebolVerde = `<img src="../assets/bolafutebolverde (2).png">`
var erro = `<img src="../assets/erro.png">`


async function defesaGoleiro(){
    var min = 1;
    var max = 3;
    var direcaoDefesaGoleiro = parseInt(Math.random() * (max - min + 1) + min);

    switch(direcaoDefesaGoleiro) {
        case 1:
            divGoleiro.innerHTML = goleiroEsquerda
            divGoleiro.style.marginLeft = "-12%" 
            break; 
        case 3:
            divGoleiro.innerHTML = goleiroDireita
            divGoleiro.style.marginLeft = "17.5%"
            break; 
    }

    return direcaoDefesaGoleiro;
}

var qtdChutes = 0;

async function chutar(n){

    var chute = n;
    var quedaGoleiro =  await defesaGoleiro();

    bolaInicial.style.display = "none"

    switch(n) {
        case 1:
            bolaFutebol2.style.visibility = "hidden"
            bolaFutebol3.style.visibility = "hidden"
            break;
        case 2:
            bolaFutebol1.style.visibility = "hidden"
            bolaFutebol3.style.visibility = "hidden"
            break;
        case 3:
            bolaFutebol1.style.visibility = "hidden"
            bolaFutebol2.style.visibility = "hidden"
            break;
    }

    TextoExplicativo.style.display = "none"
    botaoNovoChute.style.display = "flex"

    resultado(chute, quedaGoleiro)

    if (qtdChutes < 4) {
        qtdChutes++
    } else {
        finalizar()
    }
}

var qtdAcertosArgentina = 0;
var qtdAcertosFranca = parseInt(Math.random() * (5 - 0 + 1));

function resultado(chute, defesa){
    if (chute == defesa) {
        score.innerHTML += erro;
    } else {
        score.innerHTML += bolaFutebolVerde;
        qtdAcertosArgentina++
    }
}



function novo_chute(){
    botao_novo_chute.style.display = "none"

    bolaFutebol1.style.visibility = "visible"
    bolaFutebol2.style.visibility = "visible"
    bolaFutebol3.style.visibility = "visible"

    divGoleiro.style.marginLeft = "0" 
    divGoleiro.innerHTML = goleiroMeio
}

function finalizar(){
    placar_argentina.innerHTML = qtdAcertosArgentina
    placar_franca.innerHTML = qtdAcertosFranca

    inicio_jogo.style.width = "22%"
    meio_inicio_jogo.style.marginBottom = "5%"


    if (qtdAcertosArgentina > qtdAcertosFranca) {
        texto_inicio_jogo.innerHTML = "ARGENTINA CAMPEÃ!"
    } else if (qtdAcertosArgentina < qtdAcertosFranca) {
        texto_inicio_jogo.innerHTML = "FRANÇA CAMPEÃ!"
    } else {
        var resultado = resolverParImpar()

        if ((resultado % 2) == 0) {
            texto_inicio_jogo.innerHTML = "DECICIDO NO PAR OU ÍMPAR... <br> ARGENTINA CAMPEÃ!"
        } else {
            texto_inicio_jogo.innerHTML = "DECICIDO NO PAR OU ÍMPAR... <br> FRANÇA CAMPEÃ!"
        }
    }
    botao_jogo.innerHTML = `<button onclick="sair_jogo()">SAIR</button>`

    BlocoIniciarJogo.style.display = "flex"
}

function resolverParImpar(){
    var min = 0;
    var max = 10;
    var argentina = parseInt(Math.random() * (max - min + 1) + min);
    var franca = parseInt(Math.random() * (max - min + 1) + min);
    console.log(argentina + franca)
    return argentina + franca;
}

function sair_jogo(){
    window.location = `../Page Inicial/paginainicial.html`
}

