function voltar_estatistica(){
    window.location.href = `../paginaestatisticas.html`
}

const grafico_gols = document.getElementById('grafico1');
const grafico_assistencias = document.getElementById('grafico2');
const grafico_participacoes = document.getElementById('grafico3');
const grafico_gols_argentina = document.getElementById('grafico4');
const grafico_assistencias_argentina = document.getElementById('grafico5');

const labels = [
    `2004/05`,
    `2005/06`,
    `2006/07`,
    `2007/08`,
    `2008/09`,
    `2009/10`,
    `2010/11`,
    `2011/12`,
    `2012/13`,
    `2013/14`,
    `2014/15`,
    `2015/16`,
    `2016/17`,
    `2017/18`,
    `2018/19`,
    `2019/20`,
    `2020/21`,
    `2021/22`,
    `2022/23`
]

/* GRÁFICO GOLS CLUBE */

const gols_clube = [1, 8, 17, 16, 38, 47, 53, 73, 60, 41, 58, 41, 54, 45, 51, 31, 38, 11, 20];

const data_gols_clube = {
    labels: labels,
    datasets: [{
        label: 'Gols',
        data: gols_clube,
        backgroundColor: '#880C0A',
        borderColor: 'black',
        borderWidth: 1

    }
    ]
};

const config_gols_clube = {
    type: 'bar',
    data: data_gols_clube,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
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

const grafico_gols_clube = new Chart(grafico_gols, config_gols_clube);

const gols_array = data_gols_clube.datasets.find(dataset => dataset.label == 'Gols').data;
const gols_array_valores = gols_array.map(Number);



/* GRÁFICO ASSISTÊNCIAS POR CLUBES */

const assistencias_clubes = [0, 3, 3, 13, 17, 11, 23, 29, 15, 14, 27, 23, 16, 18, 19, 25, 12, 15, 19];

const data_assistencias_clube = {
    labels: labels,
    datasets: [{
        label: 'Assistências',
        data: assistencias_clubes,
        backgroundColor: '#880C0A',
        borderColor: 'black',
        borderWidth: 1

    }
    ]
};

const config_assistencias_clube = {
    type: 'bar',
    data: data_assistencias_clube,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
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

const grafico_assistencias_clube = new Chart(grafico_assistencias, config_assistencias_clube);

const assistencias_array = data_assistencias_clube.datasets.find(dataset => dataset.label == 'Assistências').data;
const assistencias_array_valores = assistencias_array.map(Number);

// PARTICIPAÇÕES POR CLUBES

const participacoes_clubes = [];

for (var i = 0; i < gols_array_valores.length; i++) {
    var soma = gols_array_valores[i] + assistencias_array_valores[i];
    participacoes_clubes.push(soma);
}

const data_participacoes_clube = {
    labels: labels,
    datasets: [{
        label: 'Participações de gols',
        data: participacoes_clubes,
        backgroundColor: '#880C0A',
        borderColor: 'black',
        borderWidth: 1

    }
    ]
};

const config_participacoes_clube = {
    type: 'bar',
    data: data_participacoes_clube,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
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

const grafico_participacoes_clube = new Chart(grafico_participacoes, config_participacoes_clube);


const labels_selecao = [
    `2005 `,
    `2006`,
    `2007`,
    `2008`,
    `2009`,
    `2010`,
    `2011`,
    `2012`,
    `2013`,
    `2014`,
    `2015`,
    `2016`,
    `2017`,
    `2018`,
    `2019`,
    `2020`,
    `2021`,
    `2022`,
    `2023`
]
/* GRÁFICO GOLS POR SELEÇÃO */

const gols_selecao = [0, 2, 6, 2, 3, 2, 4, 12, 6, 8, 4, 8, 4, 4, 5, 1, 9, 18, 4];

const data_gols_selecao = {
    labels: labels_selecao,
    datasets: [{
        label: 'Gols',
        data: gols_selecao,
        backgroundColor: '#880C0A',
        borderColor: 'black',
        borderWidth: 1

    }
    ]
};

const config_gols_selecao = {
    type: 'bar',
    data: data_gols_selecao,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
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

const grafico_gols_selecao = new Chart(grafico_gols_argentina, config_gols_selecao);

const gols_selecao_array = data_gols_selecao.datasets.find(dataset => dataset.label == 'Gols').data;
const gols_selecao_array_valores = gols_selecao_array.map(Number);

/* GRÁFICO ASSISTÊNCIAS POR SELEÇÃO */

const assistencias_selecao = [2,2,4,3,1,2,9,1,4,2,3,6,0,3,3,0,5,3,1];

const data_assistencias_selecao = {
    labels: labels_selecao,
    datasets: [{
        label: 'Assistências',
        data: assistencias_selecao,
        backgroundColor: '#880C0A',
        borderColor: 'black',
        borderWidth: 1

    }
    ]
};

const config_assistencias_selecao = {
    type: 'bar',
    data: data_assistencias_selecao,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
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

const grafico_assistencias_selecao = new Chart(grafico_assistencias_argentina, config_assistencias_selecao);

const assistencias_selecao_array = data_assistencias_selecao.datasets.find(dataset => dataset.label == 'Assistências').data;
const assistencias_selecao_array_valores = assistencias_selecao_array.map(Number);