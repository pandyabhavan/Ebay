var ejs = require("ejs");
var mysql = require("./mysql");

function Login(req,res)
{
	var username = req.param('username');
	var password = req.param('password');
	var response;
	
	var query = "select first_name from user where handle='"+username+"' and password = '"+password+"'";
	mysql.fetchData(function(err,results){
		if(err)
		{
			console.log('in error');
			response = {"statusCode":401,"data":null};
		}
		else
		{
			if(results.length > 0)
			{
				console.log('in if');
				var rows = results;
				console.log(results);
				req.session.first_name = results.first_name;
				response = {"statusCode":200,"data":results};
			}
			else
			{
				console.log('in else');
				response = {"statusCode":401,"data":null};
			}
		}
		res.send(JSON.stringify(response));
	},query);
}

exports.Login = Login;