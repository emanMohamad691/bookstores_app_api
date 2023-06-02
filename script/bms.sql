--create book table
CREATE TABLE bms.book (
    bookID serial not null,
    title varchar(100) not null,
    isbn int,
    describtion varchar(100) null,
    auther varchar(100) not null,
    publisher varchar(100) not null,
    pages int null,
    storeCode varchar(100) not null,
    constraint book_pkey primary key(bookID)
);


-- create store table
CREATE TABLE bms.store (
    storeID serial  not null,
    storeName varchar(100) not null,
    code varchar(100) not null,
    address varchar(100) not null,
    constraint store_pkey primary key(storeID)
);