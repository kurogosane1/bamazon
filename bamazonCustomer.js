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

var start = function() {
  inquirer.prompt({
    name: "forSale",
    type: "list",
    message: "Welcome to Bamazon. The following items are up for sale",
    choices: function(value){
        connection.query("SELECT * FROM products", function(err, result){
            var answer = result;
            console.log(result);
            for (var i = 0; i<answer.length; i++){
                console.log('Item id '+ answer[i].item_id);
                console.log('Name :' +answer[i].product_name);
                console.log('Price: '+ "$"+answer[i].price);
            }
            inquirer.prompt({
                name:"toBuy",
                type: "input",
                message:"Please enter the ITEM ID that you would like to buy",
                answer: 'answer',
                itemSearch(answer);
                },
                {
                name: 'toPrice',
                type:'input',
                message: "how many would you like to buy",
                answer: 'quan',
                checkInv(quan);
                })
            
            })
    },
  })
};

            
  

// this function would be used to find the items that we would be looking for from mySQL

function itemSearch(answer){
    var choice = answer;
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; res.length; i++)
        {
            if (res.item_id === choice)
            {
                function checkInv(answer);
            }
            else{
                console.log("Please enter the correct item id");
                start();

            }
        };
        console.log(res)
        console.log('line172');
});
};

// this function would be used to check the inventory to see if the item is availble enough to purchase
function checkInv(answer, quan){
    this.looking = answer;
    this.quantity = quan;
    console.log("Line 83 "+looking );
    connection.query("SELECT * FROM products FROM?", {id : looking}, function(req, res ){
        console.log('this is line 85'+res);
        if (this.quantity < res.quantity)
        {
            var remainder = res.quantity - this.quantity;
            console.log('The total cost is');
            console.log(res.price * quan);
            console.log('this is line 91');
            updateInv(remainder, answer);
        }
        else {
            console.log("insufficient qunatity");
            start();
        }

    })
};

// this function would update the inventory that is stored in SQL and update accordingly with the purchases of the customer

function updateInv(remainder, answer)
{
    var remaining = remainder;
    var id = answer;
    connection.query("UPDATE products SET? WHERE?",{item_id : id}, {quantity : remaining.parseInt() }, function(err, res) {

    })
};

