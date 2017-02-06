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


var start = function(){
    inquirer.prompt([
        {
            name: "toAnounce",
            type: 'rawlist',
            choices:['buy', 'nothing'],
                      
        }
    ]).then(function(answer){
        if (answer.toAnounce.toUpperCase() === "BUY")
        {
            buying();
        }
        else{
            console.log("thank you for visiting Bamazon and we shall send you to the first page");
            start();
        }
    })

    
};

var buying =  function (){
    connection.query("SELECT * FROM products", function (err, res){
        console.log("this is line 43");
        for (var i = 0; i<res.length; i++)
        {
            console.log('Item id : '+ res[i].item_id);
            console.log('name: ' + res[i].product_name);
            console.log('price: '+ res[i].price);
        }
    })
    inquirer.prompt([{
        name: 'toBuy',
        type: 'input',
        message: "please enter the item ID number that you would like to buy"
    },
    {   name: "quan",
        type: 'input',
        message: "How many would you like to buy"
    
    }]).then(function(user){
            var id = user.toBuy;
            var quantity = user.quan;
        connection.query("SELECT * FROM products WHERE item_id=?",{quantity}, function (err, res){
            var itemquan = res.quantity;
            if (quantity <= itemquan) 
            {   
                var remaining = parseInt(itemquan)-parseInt(quantity)
                purchase(id, remaining);
            }
            else{
                console.log("insuffucient quantity");
            }


        })
    })
};

// now that the user has entered the quantity and item to buy. A check is also placed on the inventory and its good. now the time has come to update the quantity in the server 

var purchase = function(id, remaining){
    connection.query("UPDATE products SET? WHERE?",{quantity : remaining},{item_id : id}, function(err, res){})
    start();
},
