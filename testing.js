// Loads the NPM packages
var inquirer = require("inquirer");
var mysql      = require('mysql');

//connection for the mysql server//
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'saadkhurshid310588',
  database : 'BamazonDB'
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});
// this is when the application would run and the user would be informed about the items available for sale

inquirer.prompt([
    {
        name: 'forSale',
        type: 'list',
        message: "Welcome to Bamamzon. The Following items are up for sale",
        choices: function(value){
            connection.query("SELECT * FROM products", function (err, res){
                var answer = res;
                console.log("this is line 28" +res);
                for (var i = 0; i<answer.length; i++)
                {
                    console.log('Item id '+ answer[i].item_id);
                    console.log('Name : '+answer[i].product_name);
                    console.log("Price : "+ ' $'+answer[i].price);

                }
            })
        }
        
    },
    {
        name: 'toPrice',
        type: 'input',
        message: "how many would you like to buy",
        answer: 'quan',
        checkInv(quan)
    }
]);