create database main;
use main;

create table user_roles (
    id int primary key identity,
    name varchar(50) not null
);

insert into user_roles (name) values ('admin'), ('user');

create table users (
    id int primary key identity,
    username varchar(50) not null unique,
    email varchar(50) not null unique,
    password varchar(300) not null,
    active bit not null default 0,
    role_id int foreign key references user_roles(id)
);

create table [statistics] (
    id int primary key identity,
    tasks_completed int not null default 0,
    score int not null default 0,
    user_id int foreign key references users(id)
);

create table task_complexities (
    id int primary key identity,
    name varchar(50) not null
);

insert into task_complexities (name) values ('easy'), ('medium'), ('hard');

create table tasks (
    id int primary key identity,
    title varchar(50) not null,
    description varchar(max) not null,
    creation_time datetime not null default getdate(),
    solved_times int not null default 0,
    solution varchar(max) not null,
    complexity_id int foreign key references task_complexities(id)
);

create table solutions (
    id int primary key identity,
    query varchar(max) not null,
    solution_time datetime not null default getdate(),
    task_id int foreign key references tasks(id),
    user_id int foreign key references users(id)
);

create table comments (
    id int primary key identity,
    content varchar(max) not null,
    creation_time datetime not null default getdate(),
    user_id int foreign key references users(id),
    task_id int foreign key references tasks(id)
);

create table discussions (
    id int primary key identity,
    topic varchar(50) not null
);

create table messages (
    id int primary key identity,
    content varchar(max) not null,
    creation_time datetime not null default getdate(),
    discussion_id int foreign key references discussions(id),
    user_id int foreign key references users(id)
);

