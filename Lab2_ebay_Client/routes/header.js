var mongo = require('./mongo');
var ejs = require("ejs");
var log = require('./log');
var mq_client = require('../rpc/client');

function getLoginSessionValues(req,res)
{
	var json_response;
	if(req.session.login)
		json_response = {"statusCode":200,"data":req.session.login};
	else
		json_response = {"statusCode":401,"data":null};

	res.send(JSON.stringify(json_response));
}

function logout(req,res)
{
	var response;
	req.session.destroy();
	response = {"statusCode":200,"data":null};
	res.send(JSON.stringify(response));
}

function search(req,res)
{
	var search_txt = req.param('search_txt');
	var search_category = req.param('search_category');
	var response,query;
	console.log('search');
	var msg_payload = {"search_txt":search_txt,"search_category":search_category,"action":"search"};
	mq_client.make_request('header_queue',msg_payload, function(err,results){

		console.log(results);
		if(err){
			response = {"statusCode":403,"data":null};
			res.send(JSON.stringify(response));
		}
		else 
		{
			if(results.code == 200){
				response = {"statusCode":200,"data":results};
				req.session.search = results;
				console.log(response);
				res.send(JSON.stringify(response));
			}
			else {    
				response = {"statusCode":401,"data":null};
				res.send(JSON.stringify(response));
			}
		}  
	});
}

function getSearchSession(req,res)
{
	var json_response;
	if(req.session.search)
		json_response = {"statusCode":200,"data":req.session.search};
	else
		json_response = {"statusCode":401,"data":null};

	res.send(JSON.stringify(json_response));
}

function getCartNumber(req,res)
{
	var response;
	if(req.session.login)
	{
		var msg_payload = {"user":req.session.login.handle,"action":"getCartNumber"};
		mq_client.make_request('header_queue',msg_payload, function(err,results){

			console.log(results);
			if(err){
				response = {"statusCode":401,"data":0};
				res.send(JSON.stringify(response));
			}
			else 
			{
				if(results.code == 200){
					response = {"statusCode":200,"data":results.value};
					console.log(response);
					res.send(JSON.stringify(response));
				}
				else {    
					response = {"statusCode":403,"data":0};
					res.send(JSON.stringify(response));
				}
			}  
		});
	}
	else
	{
		response = {"statusCode":401,data:0};
		res.send(JSON.stringify(response));
	}
}

exports.getLoginSessionValues = getLoginSessionValues;
exports.logout = logout;
exports.search = search;
exports.getSearchSession = getSearchSession;
exports.getCartNumber = getCartNumber;