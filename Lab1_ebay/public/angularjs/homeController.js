ebay.controller('homeController',function($scope, $http,$state,$window) {
	$scope.items = null;
	$http({
		method: "POST",
		url: "/getTwoItems",
	}).success(function (data) {
		if(data.statusCode == 401)
		{
			$window.alert('Something went wrong.Please try again.');
		}
		else if(data.statusCode == 200)
		{
			$scope.items = data.data;
		}
	}).error(function (error) {
		$window.alert('Something went wrong.Please try again.');
	});
	
	$("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
	    $("#success-alert").slideUp(500);
	});
	
	$scope.last_login1 = true;
	
	$http({
		method: "POST",
		url: "/getLastLogin",
	}).success(function (data) {
		if(data.statusCode == 401)
		{
			$scope.last_login1 = true;
		}
		else if(data.statusCode == 200)
		{
			$scope.last_login1 = false;
			$scope.last_login = data.data[0].last_login;
		}
	}).error(function (error) {
		$window.alert('Something went wrong.Please try again.');
	});
	
	$scope.search_category1 = function(search1) {
		$http({
	        method: "POST",
	        url: "/searchQ",
	        data : {
	        	"search_txt":"",
	        	"search_category": search1
	        }
	    }).success(function (data) {
        	if(data.statusCode == 200)
    		{
        		$window.location = '/search';
    		}
        	else if(data.statusCode == 403)
    		{
        		$window.alert('No items found for search category. Please try again.');
    		}
        	else
    		{
        		$window.alert('Something went wrong. Please try again.');
    		}
	    }).error(function (error) {
	    	$window.alert('Something went wrong. Please try again.');
	    });
	};
	
});