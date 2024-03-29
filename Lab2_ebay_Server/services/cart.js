var mongo = require('./mongo');
var mongoURL = "mongodb://localhost:27017/ebay";

function getCart(msg,callback)
{
	var res = {};
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('user');

		coll.findOne({"handle": msg.user},{"_id":0,"first_name":1,"cart.quantity":1,"cart.item_id":1}, function(err, user){
			if (user) 
			{
				console.log('in if');
				var col = mongo.collection('item');
				col.findOne({"item_id":user.cart.item_id},{"name":1,"description":1,"price":1,"item_id":1},function(error,result)
				{
					if(result)
					{
						for (var attrname in result) 
						{ 
							user[attrname] = result.attrname; 
						}
						res.code = "200",
						res.value = user;
					}	
					else
					{
						console.log("returned false");
						res.code = "401";
					}	
				});
			} else {
				console.log("returned false");
				res.code = "401";
			}
			callback(null, res);
		});
	});
}

function removeFromCart(msg,callback)
{
	var res = {};
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var col = mongo.collection('user');
		col.update({"user":msg.user},{$pull:{"cart":{"item_id":msg.item_id}}},function(error,result)
				{
			if(result)
			{
				res.code = "200",
				res.value = result;
			}	
			else
			{
				console.log("returned false");
				res.code = "401";
			}	
			callback(null, res);
			});
	});
}
exports.getCart = getCart;
exports.removeFromCart = removeFromCart;