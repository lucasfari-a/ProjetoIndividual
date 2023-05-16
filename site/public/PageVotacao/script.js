function abrir_menu_flutuante() {
  var menu_flutuante = document.getElementById("bloco_flutuante")

  if (menu_flutuante.style.display == 'none') {
    menu_flutuante.style.display = `flex`
  } else {
    menu_flutuante.style.display = 'none'
  }
}

function sair_votacao() {
  window.location.href = `../Page Inicial/paginainicial.html`
}

function voltar_perguntas() {
  div_grafico.style.display = `none`
  div_escolher_grafico.style.display = `flex`
}

const pergunta1 = document.getElementById("pergunta1");
const pergunta2 = document.getElementById("pergunta2");
const pergunta3 = document.getElementById("pergunta3");
const pergunta4 = document.getElementById("pergunta4");
const pergunta5 = document.getElementById("pergunta5");
const div_escolher_grafico = document.getElementById("div_escolher_grafico")
const div_grafico = document.getElementById("div_grafico")
const grafico_final = document.getElementById("grafico_final")

var cliques = 0;

var respostas = [];
var respostas_select = [];

function proxima_questao() {
  cliques += 1;

  switch (cliques) {
    case 1:
      pergunta1.style.display = `none`;
      pergunta2.style.display = `flex`;
      obter_resposta("resposta1");
      break;
    case 2:
      pergunta2.style.display = `none`;
      pergunta3.style.display = `flex`;
      obter_resposta("resposta2")
      break;
    case 3:
      pergunta3.style.display = `none`;
      pergunta4.style.display = `flex`;
      obter_resposta("resposta3")
      break;
    case 4:
      pergunta4.style.display = `none`;
      pergunta5.style.display = `flex`;
      obter_resposta("resposta4")
      break;
    case 5:
      pergunta5.style.display = `none`;
      obter_resposta("resposta5");
      finalizar();
      break;
  }
}

function obter_resposta(resposta_id) {
  const radios = document.getElementsByName(resposta_id);


  for (var i = 0; i < radios.length; i++) {

    var resposta_selecionada = "";

    if (radios[i].checked) {
      resposta_selecionada = radios[i].value;
      break;
    }
  }

  respostas.push(resposta_selecionada);
  console.log(`Resposta da pergunta:`, resposta_selecionada);
  console.log(`Respostas: ${respostas}`)
}

/* CHARTJS - GRÁFICO RESPOSTAS PERGUNTAS */

const labels = [
  `a`,
  `b`,
  `c`,
  `d`,
  `e`,
]

/* GRÁFICO */


var resposta_pergunta1 = []
var resposta_pergunta2 = []
var resposta_pergunta3 = []
var resposta_pergunta4 = []
var resposta_pergunta5 = []
var resposta_pergunta = [resposta_pergunta1, resposta_pergunta2, resposta_pergunta3, resposta_pergunta4, resposta_pergunta5];

function atualizar_grafico_pergunta(n) {
  const atualizacao_grafico = resposta_pergunta[n - 1];
  data_pergunta.datasets[0].data = atualizacao_grafico;
  grafico_pergunta.update();
  console.log(resposta_pergunta)
}

const data_pergunta = {
  labels: labels,
  datasets: [{
    label: 'Qtd. Respostas',
    data: [0, 0, 0, 0, 0],
    backgroundColor: '#880C0A',
    borderColor: 'black',
    borderWidth: 1

  }
  ]
};

const config_pergunta = {
  type: 'bar',
  data: data_pergunta,
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            if (value % 1 === 0) {
              return value.toString();
            }
          },
          padding: 15,
          beginAtZero: true,
          color: '#2E2109;',
          font: {
            size: 18,
            family: 'Poppins',
            weight: 500
          }
        },
      },
      x: {
        ticks: {
          padding: 10,
          color: '#2E2109;',
          font: {
            size: 15,
            family: 'Poppins',
            weight: 500
          }
        }
      }
    },
    plugins: {
      title: {
        display: false,
        font: {
          size: 18,
          color: 'black',
          family: 'Poppins',
          weight: 800
        }

      },
      legend: {
        display: false,
        labels: {
          font: {
            size: 30,
            family: 'Poppins',
            weight: 500
          }
        }
      }
    }
  }
};

const grafico_pergunta = new Chart(grafico_final, config_pergunta);

/* CONEXAO BANCO DE DADOS */

function finalizar() {

  fetch("/usuarios/enviarrespostas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      respostasServer: respostas,
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        setTimeout(function () {
          div_escolher_grafico.style.display = `flex`
        }, 100);

      } else {
        throw new Error("Houve um erro ao enviar os dados");
      }
    })
    .catch(function (resposta) {
      console.log("#ERRO: " + resposta);
    });

  return false;
}

function escolher_pergunta(n) {
  div_escolher_grafico.style.display = `none`;
  div_grafico.style.display = `flex`;

  if (n == 1) {
    respostas_select = n;
  } else if (n == 2) {
    respostas_select = n;
  } else if (n == 3) {
    respostas_select = n;
  } else if (n == 4) {
    respostas_select = n;
  } else {
    respostas_select = n;
  }

  fetch("/usuarios/receberrespostas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      respostas_selectServer: respostas_select,
    })
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(json => {
          for (var i = 0; i < 5; i++) {
            if (n == 1) {
              resposta_pergunta1.push(json[i][0].qtd);
            } else if (n == 2) {
              resposta_pergunta2.push(json[i][0].qtd);
            } else if (n == 3) {
              resposta_pergunta3.push(json[i][0].qtd);
            } else if (n == 4) {
              resposta_pergunta4.push(json[i][0].qtd);
            } else {
              resposta_pergunta5.push(json[i][0].qtd);
            }
          }
          atualizar_grafico_pergunta(n);
          console.log(json);
        })
      } else {
        throw new Error("Houve um erro ao receber os dados");
      }
    })
    .then(function () {
      setTimeout(function () {
        div_grafico.style.display = `flex`;
      }, 100);
    })
    .catch(function (error) {
      console.log("#ERRO: " + error);
    });

  return false;

}


