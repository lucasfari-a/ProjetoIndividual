create database projetoindividual;
use projetoindividual;

create table usuario (
	idUsuario int primary key auto_increment,
    nome varchar(45),
    sobrenome varchar(45),
    email varchar(100),
    senha varchar(45));
    
select * from usuario;

alter table usuario modify column senha varchar(200);
desc usuario;
select * from usuario;

truncate table usuario;