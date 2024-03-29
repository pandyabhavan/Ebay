var ejs = require("ejs");
var bcrypt = require('bcryptjs');
var log = require('./log');
var soap = require('soap');
var baseURL = "http://localhost:8080/Lab3_ebay_Server/services";


function Login(req,res)
{
	var username = req.param('username');
	var password = req.param('password');
	var response;
	console.log(password);

	var option = {
			ignoredNamespaces : true	
	};
	var url = baseURL+"/Login?wsdl";
	var args = {"username":username,"password":password};
	soap.createClient(url,option, function(err, client) {
		client.login(args, function(err, result) {
			if(result.loginReturn != null){
				var results = JSON.parse(result.loginReturn)};
				if(password == results[0].password)
					//if(bcrypt.compareSync(password,results[0].password))
				{
					console.log('in if');
					var rows = results;
					console.log(results);
					req.session.login = results[0];
					var option = {
							ignoredNamespaces : true	
					};
					var url = baseURL+"/Login?wsdl";
					var query = "update user set last_login = now() where id="+req.session.login.id+"";
					var args = {"query":query};
					soap.createClient(url,option, function(err, client) {
						client.updateLastLogin(args, function(err, result) {
							if(result.updateLastLoginReturn != null)
							{
								response = {"statusCode":200,"data":JSON.parse(result.updateLastLoginReturn)};
								res.send(JSON.stringify(response));
							}
							else{
								res.send({"statusCode":401,"data":null});
							}
						});
					});
				}
				else{
					res.send({"statusCode":401,"data":null});
				}
		});
	});

}

function Register(req,res)
{
	var email = req.param('email');
	var password = req.param('password');
	var first_name = req.param('first_name');
	var last_name = req.param('last_name');
	var handle = req.param('handle');
	var passwordToSave = bcrypt.hashSync(password);
	var response;
	
	var option = {
			ignoredNamespaces : true	
	};
	var url = baseURL+"/Login?wsdl";
	var args = {"first_name":first_name,"last_name":last_name,"email":email,"password":passwordToSave,"handle":handle};
	soap.createClient(url,option, function(err, client) {
		client.register(args, function(err, result) {
			if(result.registerReturn != null)
			{
				response = {"statusCode":200,"data":JSON.parse(result.registerReturn)};
				res.send(JSON.stringify(response));
			}
			else
			{
				res.send({"statusCode":401,"data":null});
			}
		});
	});
}

exports.Login = Login;
exports.register = Register;