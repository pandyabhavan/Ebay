ebay.controller('profileController', function ($scope, $http, $window,$state) {
	
	$scope.category = "1";
	
	$scope.basic = function()
	{
		$http({
			method: "POST",
			url: "/getPurchaseHistory",
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('You need to login first. To view this page');
				$window.location = "/login";
			}
			else if(data.statusCode == 200)
			{
				$scope.purchases = data.data;
			}
			else
			{
				$window.alert('Something went wrong.Please try again.');
			}
		}).error(function (error) {
			$window.alert('Something went wrong.Please try again.');
		});

		$http({
			method: "POST",
			url: "/getSellingHistory",
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('You need to login first. To view this page');
				$window.location = "/login";
			}
			else if(data.statusCode == 200)
			{
				$scope.selling = data.data;
			}
			else
			{
				$window.alert('Something went wrong.Please try again.');
			}
		}).error(function (error) {
			$window.alert('Something went wrong.Please try again.');
		});
		
		$http({
			method: "POST",
			url: "/getProfile",
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('You need to login first. To view this page');
				$window.location = "/login";
			}
			else if(data.statusCode == 200)
			{
				$scope.profile = data.data;
			}
			else
			{
				$window.alert('Something went wrong.Please try again.');
			}
		}).error(function (error) {
			$window.alert('Something went wrong.Please try again.');
		});
	};
	$scope.basic();

	$scope.removeItem = function(item_id)
	{
		$http({
			method: "POST",
			url: "/removeItem",
			data:{
				"item_id":item_id
			}
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('You need to login first. To view this page');
				$window.location = "/login";
			}
			else if(data.statusCode == 200)
			{
				$scope.basic();
			}
			else
			{
				$window.alert('Something went wrong.Please try again.');
			}
		}).error(function (error) {
			$window.alert('Something went wrong.Please try again.');
		});
	};
	
	$scope.addItem = function () 
	{
		$http({
			method: "POST",
			url: "/addItem",
			data:{
				"name":$scope.name,
				"description":$scope.description,
				"price":$scope.price,
				"quantity":$scope.quantity,
				"category":$scope.category
			}
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('You need to login first. To view this page');
				$window.location = "/login";
			}
			else if(data.statusCode == 200)
			{
				$window.alert('Item added successfully');
				$scope.basic();
			}
			else if(data.statusCode == 405)
			{
				$window.alert('You need to complete the profile first to sell the product.');
			}
			else
			{
				$window.alert('Something went wrong.Please try again.');
			}
		}).error(function (error) {
			$window.alert('Something went wrong.Please try again.');
		});
	};
	
	$scope.updateProfile = function()
	{
		$http({
			method: "POST",
			url: "/updateProfile",
			data:{
				"profile":$scope.profile
			}
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('Your session expired. Please Login again.');
				$window.location = '/login';
			}
			else
			{
				$window.alert('Profile Updated Successfully.');
				$scope.basic();
			}
		}).error(function (error) {
			$window.alert('Something went wrong. Please try again');
		});
	};
	
	$scope.logData = function(file,place)
	{
		$http({
			method: "POST",
			url: "/logData",
			data:{
				"file":file,
				"place":place
			}
		}).success(function (data) {
		}).error(function (error) {
		});
	};
});