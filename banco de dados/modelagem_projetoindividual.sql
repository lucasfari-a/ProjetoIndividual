create database projetoindividual;
use projetoindividual;

create table usuario (
	idUsuario int primary key auto_increment,
    nome varchar(45),
    sobrenome varchar(45),
    email varchar(100),
    senha varchar(200));
    
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
    
desc usuario;

select * from usuario;
select * from respostas;
select count(Pergunta5) from respostas where pergunta5 = 5;

select count(pergunta3) from respostas where pergunta5 = 1;

select sum(pergunta2) from respostas;

truncate table usuario;