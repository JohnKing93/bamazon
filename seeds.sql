DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nutella", "Groceries", 3.50, 20), ("Milk", "Groceries", 2.25, 15), ("Avacados", "Groceries", 1.50, 25), ("Beer", "Groceries", 11.75, 5), ("Brussel Sprouts", "Groceries", 2.5, 50), ("Motor Oil", "Car Parts", 30, 5), ("Oil Filter", "Car Parts", 8.50, 10), ("MacBook Pro", "Electronics", 2300, 2), ("Mouse", "Electronics", 60, 5), ("USB-C Cable", "Electronics", 25, 7);