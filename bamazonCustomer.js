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

//this is where the function would begin when the customer starts the application//
var start = function(){
    inquirer.prompt([
        {   //the user is prompted to a welcome screen where they have to select to buy or do nothing//
            name: "toAnounce",
            type: 'rawlist',
            message: 'Welcome to Bamazon. Would you like to buy something?',
            choices:['buy', 'nothing'],
                      
        }
    ]).then(function(answer){
        if (answer.toAnounce.toUpperCase() === "BUY")
        {   //if the user wants to buy something, then the buying function would activate//
            buying();
        }
        else{
            //otherwise if the user does not have an purticular need then the user shall be welcomed to this message and then directed back to the bgeining of the page//
            console.log("thank you for visiting Bamazon and we shall send you to the first page");
            start();
        }
    })

    
};
//The buying function the looks for all the items in inventory and display to the user but also allow the user to select by using the id number that the user would be asked to input and to buy//
//if the user decides to purchase items, then the user will enter the item_id and after that then system would then search the inventory system to see if there is sufficient inventory to purchase//
// if the inventory does not have enough to full fill the request, then the user shall be prompted to not enough inventory otherwise the users purchase would be accepted and the new inventory count in the database would be updated
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
                start();
            }


        })
    })
};

// now that the user has entered the quantity and item to buy. A check is also placed on the inventory and its good. now the time has come to update the quantity in the server 

var purchase = function(id, remaining){
    connection.query("UPDATE products SET? WHERE?",{quantity : remaining},{item_id : id}, function(err, res){})
    start();
}

start();
