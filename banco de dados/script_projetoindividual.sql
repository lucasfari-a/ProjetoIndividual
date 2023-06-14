create database projetoindividual;
use projetoindividual;

create table usuario (
	idUsuario int primary key auto_increment,
    nome varchar(45),
    sobrenome varchar(45),
    email varchar(100),
    senha varchar(200),
    data_nascimento date,
    genero varchar(45),
    estado varchar(45),
    cidade varchar(100),
    cep char(9));
    
create table respostas (
	idResposta int primary key auto_increment,
    Pergunta1 varchar(45),
    Pergunta2 varchar(45),
    Pergunta3 varchar(45),
    Pergunta4 varchar(45),
    Pergunta5 varchar(45),
    fkUsuario int,
    constraint fkUsuario foreign key (fkUsuario) references usuario(idUsuario)
    );
    
insert into respostas (pergunta1,pergunta2,pergunta3,pergunta4,pergunta5, fkUSuario) values
(1,2,3,4,5,1),
(1,2,3,4,5,1),
(1,2,3,4,5,1),
(1,2,3,4,5,1),
(1,2,3,4,5,1),
(1,2,3,4,5,1),
(1,2,3,4,5,1),
(1,2,3,4,5,1),
(1,2,3,4,5,1),
(1,2,3,4,5,1);
desc usuario;

select * from usuario;
select * from respostas;

select count(pergunta1) from respostas where pergunta1 = 5;
select count(n) from respostas where n = 2;
select count(n) from respostas where n = 3;
select count(n) from respostas where n = 4;

SELECT 
    SUM(CASE WHEN pergunta1 = 1 THEN 1 ELSE 0 END) AS resposta_a,
    SUM(CASE WHEN pergunta1 = 2 THEN 1 ELSE 0 END) AS resposta_b,
    SUM(CASE WHEN pergunta1 = 3 THEN 1 ELSE 0 END) AS resposta_c,
    SUM(CASE WHEN pergunta1 = 4 THEN 1 ELSE 0 END) AS resposta_d,
    SUM(CASE WHEN pergunta1 = 5 THEN 1 ELSE 0 END) AS resposta_e
FROM respostas;

select count(Pergunta1) from respostas where pergunta1 = 5;

select count(pergunta3) from respostas where pergunta5 = 1;

select sum(pergunta2) from respostas;

truncate table usuario;