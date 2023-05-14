insert into customers (name, email)
values ('John Smith', 'john@example.com'),
       ('Mary Johnson', 'mary@example.com'),
       ('Bob Williams', 'bob@example.com'),
       ('Alice Brown', 'alice@example.com'),
       ('David Lee', 'david@example.com'),
       ('Jennifer Kim', 'jennifer@example.com'),
       ('Michael Davis', 'michael@example.com'),
       ('Karen Johnson', 'karen@example.com');

insert into orders (customer_id, product, quantity, price)
values (1, 'Widget', 5, 10.99),
       (1, 'Gadget', 2, 23.45),
       (2, 'Thingamajig', 1, 50.00),
       (2, 'Gadget', 1, 23.45),
       (3, 'Widget', 2, 10.99),
       (4, 'Doohickey', 2, 7.99),
       (4, 'Thingamajig', 2, 50.00),
       (5, 'Widget', 1, 10.99),
       (5, 'Gadget', 3, 23.45),
       (5, 'Doohickey', 1, 7.99),
       (7, 'Gadget', 2, 13.99);