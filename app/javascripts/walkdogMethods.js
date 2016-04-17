/**
* walkDogInfo = {
*     walker
*     reward
*     rewardInFinney
*     walkerBalance
*     walkerBalanceInFinney
*     proof
*     major
*     timeLimit	
*     minor
* }
*/
function getWalkDogInfo(proofs, walkDog, $scope, walkDogInfo) {
	walkDog.walker()
		.catch(function (e) {
			console.error("Failed to walkDog.walker(), " + e);
		})
		.then(function (walker) {
			console.log("walker " + walker);
			$scope.$apply(function () {
				walkDogInfo.walker = walker;
				walkDogInfo.walkerBalance = web3.eth.getBalance(walker);
				walkDogInfo.walkerBalanceInFinney = web3.fromWei(
					walkDogInfo.walkerBalance,
					"finney");
			});
		})

	walkDog.proof()
		.catch(function (e) {
			console.error("Failed to walkDog.proof(), " + e);
		})
		.then(function (proof) {
			console.log("proof " + proof);
			$scope.$apply(function () {
				walkDogInfo.proof = proof;
			});
		})

	walkDog.major()
		.catch(function (e) {
			console.error("Failed to walkDog.major(), " + e);
		})
		.then(function (major) {
			console.log("major " + major);
			$scope.$apply(function () {
				walkDogInfo.major = web3.toAscii(major);
			});
			getBeaconInfoAtMajor(proofs, $scope, walkDogInfo.beaconInfo, major);
		})

	walkDog.timeLimit()
		.catch(function (e) {
			console.error("Failed to walkDog.timeLimit(), " + e);
		})
		.then(function (timeLimit) {
			console.log("timeLimit " + timeLimit);
			$scope.$apply(function () {
				walkDogInfo.timeLimit = new Date(timeLimit * 1000);
			});
		})

	walkDog.minor()
		.catch(function (e) {
			console.error("Failed to walkDog.minor(), " + e);
		})
		.then(function (minor) {
			console.log("minor " + minor);
			$scope.$apply(function () {
				walkDogInfo.minor = minor;
			});
		})
}

function createWalkDogContract(
	$scope,
	newWalkerAddress,
	proofsAddress,
	beaconMajor,
	newWalkerDuration,
	walkDogAddresses,
	dogOwnerAccount,
	newWalkerReward) {
	WalkDog.new
		(
			newWalkerAddress,
			proofsAddress,
			beaconMajor,
			web3.eth.getBlock().timestamp + newWalkerDuration, 
			{
				"from": dogOwnerAccount, 
				"gas": BOOM_GAS, 
				"value": web3.toWei(newWalkerReward, "ether") 
			}
		)
		.catch(function (e) {
			console.error("Failed to WalkDog.new(" + newWalkerAddress +
			", " + proofsAddress + 
			", " + beaconMajor + "), " + e);
		})
		.then(function (newWalkDog) {
			$scope.$apply(function () {
				walkDogAddresses.push(newWalkDog.address);
			});
		});
}

function updateMinorAt(walkDog, $scope, walkDogInfo, newMinor) {
	walkDog.setMinor
		(
			newMinor,
			{ 
				"from": walkDogInfo.walker, 
				"gas": BOOM_GAS 
			}
		)
		.catch(function (e) {
			console.error("Failed to walkDog.setMinor(" + newMinor + "), " + e);
		})
		.then(function (txn) {
			$scope.$apply(function() {
				walkDogInfo.minor = newMinor;
			});
		});
}

function completeWalkAt(walkDog, $scope, walkDogInfo) {
	walkDog.completeWalk({ "from": walkDogInfo.walker })
		.catch(function (e) {
			console.error("Failed to walkDog.completeWalk(), " + e);
		})
		.then(function (txn) {
			console.log(txn);
		});
}