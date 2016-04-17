var app = angular.module('proofsApp', []);

app.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.controller("beaconController", [ '$scope', '$location', '$http', '$q', function($scope , $location, $http, $q) {
	
	$scope.beaconAddress = $location.search().address;
	$scope.beaconInfo = {};
	$scope.beaconBalance = web3.eth.getBalance($scope.beaconAddress);
	$scope.beaconBalanceInFinney = web3.fromWei($scope.beaconBalance, "finney");

	getBeaconInfoAtAddress(Proofs.deployed(), $scope, $scope.beaconInfo, $scope.beaconAddress);

	$scope.updateMinor = function (newBeaconMinor) {
		var traceUpdate = createTraceUpdate($scope.beaconInfo, newBeaconMinor);
		console.log(traceUpdate);
		putTraceUpdate(Proofs.deployed(), $scope, $scope.beaconInfo, traceUpdate, $scope.beaconAddress);
	};

	$scope.updateHash = function (newBeaconMinor, newBeaconHash) {
		updatePreviousHashAt(
			Proofs.deployed(), 
			$scope,
			$scope.beaconInfo,
			newBeaconMinor,
			newBeaconHash);
	};

	$scope.init = function() {
		getIpfsId($scope);
	}

}]);