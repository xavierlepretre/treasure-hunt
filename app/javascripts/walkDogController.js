var app = angular.module('proofsApp', []);

app.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.controller("walkDogController", [ '$scope', '$location', '$http', '$q', function($scope , $location, $http, $q) {
	
	$scope.walkDogAddress = $location.search().address;
	$scope.walkDog = WalkDog.at($scope.walkDogAddress);
	$scope.owner = {};
	$scope.walkDogBalance = web3.eth.getBalance($scope.walkDogAddress);
	$scope.walkDogInfo = {
		"value": web3.eth.getBalance($scope.walkDogAddress)
	};

	getOwnerAddress($scope.walkDog, $scope, $scope.owner);
	getWalkDogInfo($scope.walkDog, $scope, $scope.walkDogInfo);

	$scope.updateMinor = function (newMinor) {
		updateMinorAt(
			$scope.walkDog, 
			$scope,
			$scope.walkDogInfo,
			newMinor);
	};

	$scope.completeWalk = function () {
		completeWalkAt(
			$scope.walkDog, 
			$scope,
			$scope.walkDogInfo);
	}

}]);