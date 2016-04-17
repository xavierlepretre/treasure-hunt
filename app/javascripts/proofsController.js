var app = angular.module('proofsApp', []);

app.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.controller("proofsController", [ '$scope', '$location', '$http', '$q', function($scope , $location, $http, $q) {
	
	$scope.proofAddress = Proofs.deployed().address;
	$scope.proofInfo = {};
	$scope.beaconInfos = [];
	$scope.owner = {};
	$scope.walkDogAddresses = [];

	getProofInfo(Proofs.deployed(), $scope, $scope.proofInfo);
	getOwnerAddress(Proofs.deployed(), $scope, $scope.owner);
	getBeacons(Proofs.deployed(), $scope, $q, $scope.beaconInfos);

	$scope.addBeacon = function (newBeaconAddress, newBeaconMajor, newBeaconMinor, newBeaconHash) {
		addBeaconTo(
			Proofs.deployed(), 
			$scope,
			$scope.beaconInfos,
			$scope.owner.address,
			{
				"address": newBeaconAddress,
				"major": newBeaconMajor,
				"previousMinor": newBeaconMinor,
				"previousHash": newBeaconHash
			});
	};

	$scope.fund = function (beaconAddress) {
		web3.eth.sendTransaction(
			{
				from: web3.eth.coinbase,
				to: beaconAddress,
				value: web3.toWei(1, "ether")
			},
			function (txn) {
				console.log(txn);
			});
	};

	$scope.createWalkDog = function (dogOwnerAccount, newWalkerAddress, beaconMajor, newWalkerDuration, newWalkerReward) {
		createWalkDogContract(
			$scope, 
			$scope.newWalkerAddress, 
			Proofs.deployed().address,
			beaconMajor, 
			newWalkerDuration, 
			$scope.walkDogAddresses,
			dogOwnerAccount,
			newWalkerReward);
	}

	$scope.init = function() {
		getIpfsId($scope);
	}

}]);