CREATE DATABASE IF NOT EXISTS BamazonDB;

USE BamazonDB;

-- I created the item id to be a varchar because the items would also have strings 
CREATE TABLE IF NOT EXISTS products(
item_id VARCHAR(100) NOT NULL PRIMARY KEY,
product_name VARCHAR(100),
department_name VARCHAR(100),
price INTEGER(100) UNSIGNED NOT NULL,
quantity INTEGER(100) UNSIGNED

);

