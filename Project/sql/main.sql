create database main;

create table user_roles
(
    id   serial primary key,
    name varchar(50) not null
);

insert into user_roles (name)
values ('admin'),
       ('user');

create table users
(
    id              serial primary key,
    username        varchar(50)  not null unique,
    email           varchar(50)  not null unique,
    password        varchar(300) not null,
    activation_code text,
    role_id         int default 2 references user_roles (id)
);

create table statistics
(
    id              serial primary key,
    tasks_completed int not null default 0,
    score           int not null default 0,
    user_id         int references users (id)
);

create table task_complexities
(
    id   serial primary key,
    name varchar(50) not null
);

insert into task_complexities (name)
values ('easy'),
       ('medium'),
       ('hard');

create table tasks
(
    id            serial primary key,
    title         varchar(50) not null,
    description   text        not null,
    creation_time timestamp   not null default timezone('utc-3', current_timestamp(0)),
    solved_times  int         not null default 0,
    solution      json        not null,
    accepted      boolean     not null default false,
    complexity_id int references task_complexities (id)
);

create table databases
(
    id         serial primary key,
    name       varchar(50) not null,
    image_path varchar(100) not null
);

insert into databases (name, image_path) values ('Airport', './assets/airport.png');
insert into databases (name, image_path) values ('SalesTracker', './assets/salestracker.png');

alter table tasks add column database_id int references databases (id);

create table solutions
(
    id            serial primary key,
    query         text      not null,
    solution_time timestamp not null default timezone('utc-3', current_timestamp(0)),
    task_id       int references tasks (id),
    user_id       int references users (id)
);

create table comments
(
    id            serial primary key,
    content       text      not null,
    creation_time timestamp not null default timezone('utc-3', current_timestamp(0)),
    user_id       int references users (id),
    task_id       int references tasks (id)
);

alter table comments
    add column reported boolean not null default false;

create table discussions
(
    id    serial primary key,
    topic varchar(50) not null
);

create table messages
(
    id            serial primary key,
    content       text      not null,
    creation_time timestamp not null default timezone('utc-3', current_timestamp(0)),
    discussion_id int references discussions (id),
    user_id       int references users (id)
);