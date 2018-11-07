
var mysql = require('mysql');
var inquirer = require("inquirer");
var Table = require('cli-table3');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon', 
});

connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
  });

function displayProducts() {
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
        if (err) console.log(err);
        var table = new Table({
            head: ['Item Id', 'Product Name', 'Price']
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, "$" + res[i].price]
            );
        }
        console.log(table.toString());
        orderProducts();
    });
}

function orderProducts() {
    inquirer
        .prompt([
        {
            name: "id",
            type: "input",
            message: "What is the id of the product you'd like to order?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units of this product would you like to order?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
        ])
        .then(function(answer) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answer.id }, function(err, res) {
                if (err) throw err;
                else if (res[0].stock_quantity < answer.quantity) {
                    console.log("Insufficient quantity!");
                    displayProducts();
                }
                else {
                    var totalCost = answer.quantity * res[0].price;
                    var query = "UPDATE products SET ? WHERE ?";
                    connection.query(query, 
                        [
                            { 
                                stock_quantity: res[0].stock_quantity - answer.quantity
                            },
                            {
                                item_id: res[0].item_id
                            }
                        ],
                    function(err, res) {
                        if (err) throw err;
                        console.log("Your order was processed for a total cost of: $" + totalCost);
                        displayProducts();
                    });
                }
            });
        });
}