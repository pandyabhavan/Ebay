﻿ebay.controller('loginController', function ($scope, $http, $window,$state) {
	
	$scope.invalid_login = true;
	$scope.login = function (username, password) {
		$http({
            method: "POST",
            url: "/login",
            data: {
                "username": username,
                "password": password
            }
        }).success(function (data) {
            if(data.statusCode == 401)
            {
                $scope.invalid_login = false;
            }
            else
            {
                $scope.invalid_login = true;
                $window.alert('Login Successful '+data.data[0].first_name);
            }
        }).error(function (error) {
            $scope.invalid_login = false;
        });
	};

	$scope.forgotPassword = function (emailId) {
		$window.alert(emailId);
	};

	$scope.register = function () {
		$window.alert($scope.email + '\n' + $scope.reenteremail + '\n' + $scope.password_register + '\n' + $scope.first_name + '\n' + $scope.last_name);
	}
});