var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , session = require('client-sessions')
  , login = require('./routes/login')
  , header = require('./routes/header')
  , home = require('./routes/home')
  , product = require('./routes/product')
  , cart = require('./routes/cart')
  , checkout = require('./routes/checkout')
  , profile = require('./routes/profile');

var app = express();

app.use(session({   
	  
	cookieName: 'session',    
	secret: 'cmpe273_test_string',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/home',login.getHomePage);
app.get('/login',home.getLoginPage);
app.get('/search',header.getSearchPage);
app.get('/product',product.getProductPage);
app.get('/cart',cart.getCartPage);
app.get('/checkout',checkout.getCheckoutPage);
app.get('/user/*',profile.getProfilePage);


app.post('/Login',login.Login);
app.post('/Register',login.register);
app.post('/getLoginSessionValues',header.getLoginSessionValues);
app.post('/logout',header.logout);
app.post('/searchQ',header.search);
app.post('/getSearchSession',header.getSearchSession);
app.post('/getProductDetails',product.getProductDetails);
app.post('/getProductSession',product.getProductSession);
app.post('/addtocart',product.add_to_cart);
app.post('/getCartNumber',header.getCartNumber);
app.post('/getCart',cart.getCart);
app.post('/removeFromCart',cart.removeFromCart);
app.post('/checkOut',cart.checkout);
app.post('/getCheckoutSession',checkout.getCheckoutSession);
app.post('/productSold',checkout.productSold);
app.post('/getPurchaseHistory',profile.getPurchaseHistory);
app.post('/getSellingHistory',profile.getSellingHistory);
app.post('/removeItem',profile.removeItem);
app.post('/addItem',profile.addItem);
app.post('/getLastLogin',home.getLastLogin);
app.post('/getTwoItems',home.getTwoItems);
app.post('/logData',home.logData);
app.post('/getProfile',profile.getProfile);
app.post('/updateProfile',profile.updateProfile);
app.post('/placebid',product.placebid);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});