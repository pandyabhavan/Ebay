var ejs = require("ejs");
var log = require('./log');
var soap = require('soap');
var baseURL = "http://localhost:8080/Lab3_ebay_Server/services";

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

function deleteCart(item_id,user_id)
{
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/Checkout?wsdl";
	  var args = {"user_id":user_id,"item_id":item_id};
	  soap.createClient(url,option, function(err, client) {
	      client.deleteCart(args, function(err, result) {
	    	  if(result.deleteCartReturn != null){
	    		  return true;
	    	  }
	    	  else{
	    		  return false;
	    	  }
	      });
	  });
}

function updateItem(item_id,quantity)
{
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/Checkout?wsdl";
	  var args = {"quantity":quantity,"item_id":item_id};
	  soap.createClient(url,option, function(err, client) {
	      client.updateItem(args, function(err, result) {
	    	  if(result.updateItemReturn != null){
	    		  return true;
	    	  }
	    	  else{
	    		  return false;
	    	  }
	      });
	  });
}

function insertBuySell(item_id,quantity,user_id)
{
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/Checkout?wsdl";
	  var args = {"user_id":user_id,"quantity":quantity,"item_id":item_id};
	  soap.createClient(url,option, function(err, client) {
	      client.insertBuySell(args, function(err, result) {
	    	  if(result.insertBuySellReturn != null){
	    		  return true;
	    	  }
	    	  else{
	    		  return false;
	    	  }
	      });
	  });
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
exports.productSold = productSold;