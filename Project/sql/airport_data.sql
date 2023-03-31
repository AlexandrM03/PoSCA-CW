-- company --
insert into company (id, name)
values (1, 'Don_avia'),
       (2, 'Aeroflot'),
       (3, 'Dale_avia'),
       (4, 'Air_france'),
       (5, 'British_AW');

-- passenger --
insert into passenger (id, name)
values (1, 'Bruce Willis'),
       (2, 'George Clooney'),
       (3, 'Kevin Costner'),
       (4, 'Brad Pitt'),
       (5, 'Tom Cruise'),
       (6, 'Johnny Depp'),
       (7, 'Leonardo DiCaprio'),
       (8, 'Matt Damon'),
       (9, 'Tom Hanks'),
       (10, 'Will Smith'),
       (11, 'Robert De Niro'),
       (12, 'Denzel Washington'),
       (13, 'Jack Nicholson'),
       (14, 'Al Pacino'),
       (15, 'Morgan Freeman'),
       (16, 'Eddie Murphy'),
       (17, 'Nicolas Cage'),
       (18, 'Tom Hanks'),
       (19, 'Gary Oldman'),
       (20, 'Johny Depp');

-- trip --
insert into trip (id, company_id, plane, town_from, town_to, time_out, time_in)
values (1, 4, 'Boeing', 'Rostov', 'Paris', '2022-06-22 19:10:25-07', '2022-06-22 23:12:22-07'),
       (2, 4, 'Boeing', 'Paris', 'Rostov', '2022-06-27 15:10:25-07', '2022-06-27 19:12:22-07'),
       (3, 3, 'TU-154', 'Rostov', 'Vladivostok', '2022-06-25 15:10:25-07', '2022-06-25 19:12:22-07'),
       (4, 3, 'TU-154', 'Vladivostok', 'Rostov', '2022-07-11 14:12:23-07', '2022-07-11 18:11:52-07');

-- pass_in_trip --
insert into pass_in_trip (id, trip, passenger, place)
values (1, 1, 1, '1a'),
       (2, 2, 3, '2a'),
       (3, 2, 1, '4c'),
       (4, 3, 2, '3a'),
       (5, 3, 4, '3b'),
       (6, 3, 5, '3c'),
       (7, 4, 7, '4a'),
       (8, 4, 8, '4b'),
       (9, 4, 9, '4c'),
       (10, 4, 10, '4d'),
       (11, 4, 11, '4e'),
       (12, 4, 12, '4f'),
       (13, 4, 13, '4g'),
       (14, 4, 14, '4h'),
       (15, 4, 15, '4i'),
       (16, 4, 16, '4j'),
       (17, 4, 17, '4k'),
       (18, 4, 18, '4l'),
       (19, 4, 19, '4m'),
       (20, 4, 20, '4n');


