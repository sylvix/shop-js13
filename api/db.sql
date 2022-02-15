create schema shop collate utf8_general_ci;
use shop;

create table categories
(
    id    int auto_increment
        primary key,
    title varchar(255) not null
);

create table products
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null,
    price       int          null,
    image       varchar(31)  null,
    category_id int          null,
    qty         int          null,
    constraint products_categories_id_fk
        foreign key (category_id) references categories (id)
            on update cascade on delete set null
);

insert into categories (id, title)
values  (3, 'HDDs'),
        (6, 'Monitors'),
        (7, 'CPUs');

insert into products (id, title, description, price, image, category_id, qty)
values  (1, 'Intel Core i7 10700 KF', 'Some kinda description', 500, 'w_yK0VUTqvn_RjsavWEKs.jpg', 7, 5),
        (2, 'NVIDIA GeForce RTX 3070', 'GPU description, etc.', 900, 'MA4VzUwITRNH5MqGrP-ac.jpg', null, 5),
        (3, 'Seagate Barracuda 4TB', 'Something', 120, null, null, 3),
        (4, 'Intel Core i5 10500', 'fkdjflkdf', 300, null, 7, 2);