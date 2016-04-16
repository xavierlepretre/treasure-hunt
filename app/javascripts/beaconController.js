var app = angular.module('proofsApp', []);

app.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.controller("beaconController", [ '$scope', '$location', '$http', '$q', function($scope , $location, $http, $q) {
	
	$scope.beaconAddress = $location.search().address;
	$scope.beaconInfo = {};
	$scope.beaconBalance = web3.eth.getBalance($scope.beaconAddress);

	getBeaconInfoAtAddress(Proofs.deployed(), $scope, $scope.beaconInfo, $scope.beaconAddress);

	$scope.updateMinor = function (newBeaconMinor) {
		// TODO
	};

	$scope.updateHash = function (newBeaconHash) {
		updateHashAt(
			Proofs.deployed(), 
			$scope,
			$scope.beaconInfo,
			newBeaconHash);
	};

}]);