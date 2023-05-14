create database airport;

-- Airport --
create table company
(
    id   serial primary key,
    name varchar(255) not null
);

create table trip
(
    id         serial primary key,
    company_id int         not null references company (id),
    plane      varchar(50) not null,
    town_from  varchar(50) not null,
    town_to    varchar(50) not null,
    time_out   timestamp   not null,
    time_in    timestamp   not null
);

create table passenger
(
    id   serial primary key,
    name varchar(255) not null
);

create table pass_in_trip
(
    id        serial primary key,
    trip      int not null references trip (id),
    passenger int not null references passenger (id),
    place     varchar(10)
);

-- SalesTracker --
create table customers
(
    id    serial primary key,
    name  text not null,
    email text not null
);

create table orders
(
    id          serial primary key,
    customer_id integer references customers (id),
    product     text    not null,
    quantity    integer not null,
    price       numeric not null
);

-- user --
create user taskuser with password 'qwerty11';
grant connect on database airport to taskuser;
grant usage on schema public to taskuser;
grant select on all tables in schema public to taskuser;