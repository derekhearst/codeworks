CREATE TABLE
    IF NOT EXISTS accounts(
        id VARCHAR(255) NOT NULL primary key COMMENT 'primary key',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
        name varchar(255) COMMENT 'User Name',
        email varchar(255) COMMENT 'User Email',
        picture varchar(255) COMMENT 'User Picture'
    ) default charset utf8 COMMENT '';

create table
    if not exists chores(
        id int AUTO_INCREMENT primary key COMMENT 'primary key',
        name text not null,
        user_id varchar(255) not null,
        FOREIGN KEY (user_id) REFERENCES accounts(id)
    ) DEFAULT charset utf8 COMMENT '';