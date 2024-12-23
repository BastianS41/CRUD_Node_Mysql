CREATE DATABASE Prueba01;

USE Prueba01;

CREATE table personas(
    id int auto_increment primary key,
    name varchar(50) not null,
    lastName varchar(50) not null,
    age int
)

select * from personas;