
const estatistica_individual = document.getElementById("div_stats_individual");
const premios_individuais = document.getElementById("premios_individuais");
const estatistica_coletivo = document.getElementById("div_stats_coletivo");
const trofeus_coletivos = document.getElementById("trofeus_coletivos");
const resumo_titulo_individual = document.getElementById("conteudo-resumo-premio");
const resumo_titulo_coletivo = document.getElementById("conteudo-resumo-titulo")

trofeus_coletivos.style.display = `none`
estatistica_individual.style.backgroundColor = `#EACB96`

function stats_gerais(n) {
    switch (n) {
        case 1:
            estatistica_individual.style.backgroundColor = `#EACB96`
            premios_individuais.style.display = `block`
            trofeus_coletivos.style.display = `none`
            estatistica_coletivo.style.backgroundColor = `white`
            resumo_titulo_coletivo.style.display = `none`
            break;
        case 2:
            estatistica_coletivo.style.backgroundColor = `#EACB96`
            premios_individuais.style.display = `none`
            trofeus_coletivos.style.display = `block`
            estatistica_individual.style.backgroundColor = `white`
            resumo_titulo_individual.style.display = `none`
            break;
    }
}




var slideIndex = 1;
showDivs(slideIndex);

function passar_div(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var div_titulos = document.getElementsByClassName("titulos-imagens-visivel");
    if (n > div_titulos.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = div_titulos.length };
    for (i = 0; i < div_titulos.length; i++) {
        div_titulos[i].style.display = "none";
    }
    div_titulos[slideIndex - 1].style.display = "block";
}

const premio_bola_de_ouro = document.getElementById("premio-bola-de-ouro")
const premio_chuteira_de_ouro = document.getElementById("premio-chuteira-de-ouro")
const premio_golden_ball = document.getElementById("premio-golden-ball")
const premio_uefa = document.getElementById("premio-uefa")
const premio_the_best = document.getElementById("premio-the-best")
const premio_laureus = document.getElementById("premio-laureus")

function escolher_premio(n) {
    premio_bola_de_ouro.style.display = `none`
    premio_chuteira_de_ouro.style.display = `none`;
    premio_golden_ball.style.display = `none`;
    premio_uefa.style.display = `none`;
    premio_the_best.style.display = `none`;
    premio_laureus.style.display = `none`;
    resumo_titulo_individual.style.display = `flex`;
    switch (n) {
        case 1:
            premio_bola_de_ouro.style.display = `flex`
            break;
        case 2:
            premio_chuteira_de_ouro.style.display = `flex`
            break;
        case 3:
            premio_golden_ball.style.display = `flex`
            break;
        case 4:
            premio_the_best.style.display = `flex`
            break;
        case 5:
            premio_uefa.style.display = `flex`
            break;
        case 6:
            premio_laureus.style.display = `flex`
            break;
    }
}

const titulo_copa_do_mundo = document.getElementById("titulo-copadomundo")
const titulo_copa_america = document.getElementById("titulo-copaamerica")
const titulo_la_finalissima = document.getElementById("titulo-lafinalissima")
const titulo_champions = document.getElementById("titulo-champions")
const titulo_la_liga = document.getElementById("titulo-laliga")
const titulo_copa_del_rey = document.getElementById("titulo-copadelrey")
const titulo_mundial = document.getElementById("titulo-mundial")
const titulo_supercopa_espanha = document.getElementById("titulo-supercopaespanha")
const titulo_supercopa_uefa = document.getElementById("titulo-supercopauefa")
const titulo_ligue_1 = document.getElementById("titulo-ligue1")
const titulo_supercopa_franca = document.getElementById("titulo-supercopafranca")


function escolher_titulo(n) {
    titulo_copa_do_mundo.style.display = `none`
    titulo_copa_america.style.display = `none`
    titulo_la_finalissima.style.display = `none`
    titulo_champions.style.display = `none`
    titulo_la_liga.style.display = `none`
    titulo_copa_del_rey.style.display = `none`
    titulo_mundial.style.display = `none`
    titulo_supercopa_espanha.style.display = `none`
    titulo_supercopa_uefa.style.display = `none`
    titulo_ligue_1.style.display = `none`
    titulo_supercopa_franca.style.display = `none`
    resumo_titulo_coletivo.style.display = `flex`;

    switch (n) {
        case 1:
            titulo_copa_do_mundo.style.display = `flex`
            break;
        case 2:
            titulo_copa_america.style.display = `flex`
            break;
        case 3:
            titulo_la_finalissima.style.display = `flex`
            break;
        case 4:
            titulo_champions.style.display = `flex`
            break;
        case 5:
            titulo_la_liga.style.display = `flex`
            break;
        case 6:
            titulo_copa_del_rey.style.display = `flex`
            break;
        case 7:
            titulo_mundial.style.display = `flex`
            break;
        case 8:
            titulo_supercopa_espanha.style.display = `flex`
            break;
        case 9:
            titulo_supercopa_uefa.style.display = `flex`
            break;
        case 10:
            titulo_ligue_1.style.display = `flex`
            break;
        case 11:
            titulo_supercopa_franca.style.display = `flex`
            break;
    }
}