var mysql = require("./mysql");
var ejs = require("ejs");

function getCheckoutSession(req,res)
{
	var response;
	if(req.session.login)
	{
		response = {"statusCode":200,"data":req.session.checkout.total};
		console.log(req.session.checkout);
		res.send(JSON.stringify(response));
	}
	else
	{
		response = {"statusCode":401,"data":null};
		res.send(JSON.stringify(response));
	}
}

function getCheckoutPage(req,res)
{
	ejs.renderFile('./views/checkout.ejs',function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}

function deleteCart(item_id,user_id)
{
	var query1 = "delete from cart where user_id="+user_id+" and item_id = "+item_id+"";
	mysql.fetchData(function(err,results){
		if(err)
		{
			return false;
		}
		else
		{
			return true;
		}
	},query1);
}

function updateItem(item_id,quantity)
{
	var query2 = "update item set quantity_remaining = quantity_remaining-"+quantity+" where id = "+item_id+"";
	mysql.fetchData(function(err,results){
		if(err)
		{
			return false;
		}
		else
		{
			return true;
		}
	},query2);
}

function insertBuySell(item_id,quantity,user_id)
{
	var query3 = "select user_id from item where id = "+item_id+"";
	mysql.fetchData(function(err,results){
		if(err)
		{
			return false;
		}
		else
		{
			var query4 = "insert into buy_sell (seller_id,buyer_id,item_id,quantity,purchase_date) values("+results[0].user_id+","+user_id+","+item_id+","+quantity+",now())";
			mysql.fetchData(function(err,results){
				if(err)
				{
					return false;
				}
				else
				{
					return true;
				}
			},query4);
		}
	},query3);
}

function productSold(req,res)
{
	if(req.session.login)
	{
		var a = true;
		var item_quantity = req.session.checkout.quantity;
		console.log(req.session.checkout);
		var user_id = req.session.login.id;
		
		for(var i =0;i<item_quantity.length;i++)
		{ 
			var item_id = item_quantity[i].item_id;
			var quantity = item_quantity[i].quantity;
			console.log("Item Id "+item_id +" Quantity "+quantity);
			
			deleteCart(item_id,user_id);
			updateItem(item_id, quantity);
			insertBuySell(item_id, quantity,user_id);
		}
		response = {"statusCode":200,"data":null};
		res.send(JSON.stringify(response));
	}
	else
	{
		response = {"statusCode":401,"data":null};
		res.send(JSON.stringify(response));
	}
}

exports.getCheckoutSession = getCheckoutSession;
exports.getCheckoutPage = getCheckoutPage;
exports.productSold = productSold;