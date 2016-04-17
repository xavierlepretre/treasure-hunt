/**
* ProofInfo = {
*     minValue	
*     minValueInFinney
*     balance
*     balanceInFinney
* }
*/
function getProofInfo(proofs, $scope, proofInfo) {
	proofInfo.balance = web3.eth.getBalance(proofs.address);
	proofInfo.balanceInFinney = web3.fromWei(proofInfo.balance, "finney");
	proofs.minValue()
		.catch(function (e) {
			console.error("Failed to proofs.minValue(), " + e);
		})
		.then(function (minValue) {
			$scope.$apply(function() {
				proofInfo.minValue = minValue;
				proofInfo.minValueInFinney = web3.fromWei(minValue, "finney");
			});
		});
}

/**
* BeaconInfo = {
*     address,
*     major,
*     previousMinor,
*     previousHash,
*     previousIpfsContent,
*     updatedTimestamp,
*     currentMinor,
*     currentHash,
*     currentIpfsContent,
*     index	
*     balance
*     balanceInFinney
* }
*/
function getBeacons(proofs, $scope, $q, beaconInfos) {
	return proofs.getMajorsCount.call()
		.catch(function (e) {
			console.error("Failed to proofs.getMajorsCount(), " + e);
		})
		.then(function (count) {
			// Like this, we avoid warnings about promises created but not returned
			var allRequests = [];
			for (index = 0; index < count; index++) {
				allRequests.push(getBeaconInfoAtIndex(proofs, $scope, beaconInfos, index));
			}
			return $q.all(allRequests);
		});
}

function getBeaconInfoAtIndex(proofs, $scope, beaconInfos, index) {
	return proofs.majors(index)
		.catch(function (e) {
			console.error("Failed to proofs.majors(" + index + "), " + e);
		})
		.then(function (major) {
			return proofs.addresses(major)
				.catch(function (e) {
					console.error("Failed to proofs.addresses(" + major + "), " + e);
				});
		})
		.then(function (address) {
			var beaconInfo = {
				"index": index
			};
			beaconInfos.push(beaconInfo);
			return getBeaconInfoAtAddress(proofs, $scope, beaconInfo, address);
		});
}

function getBeaconInfoAtMajor(proofs, $scope, beaconInfo, major) {
	return proofs.addresses(major)
		.catch(function(e) {
			console.error("Failed to proofs.addresses(" + major + "), " + e);
		})
		.then(function (address) {
			return getBeaconInfoAtAddress(proofs, $scope, beaconInfo, address);
		});
}

function getBeaconInfoAtAddress(proofs, $scope, beaconInfo, address) {
	return proofs.beacons(address)
		.catch(function (e) {
			console.error("Failed to proofs.beacons(" + address + "), " + e);
		})
		.then(function (received) {
			$scope.$apply(function () {
				beaconInfo.major = web3.toAscii(received[0]);
				beaconInfo.previousMinor = received[1];
				beaconInfo.previousHash = received[2];
				beaconInfo.currentMinor = received[1];
				beaconInfo.currentHash = received[2];
				beaconInfo.updatedTimestamp = new Date(parseInt(received[3].toString()) * 1000);
				beaconInfo.address = address;
				beaconInfo.balance = web3.eth.getBalance(address);
				beaconInfo.balanceInFinney = web3.fromWei(beaconInfo.balance, "finney")
			});
			ipfs.catText(received[2], function (e, text) {
				if(e) {
					console.error("Failed to ipfs.catText(" + received[2] + "), " + e);
				}
				$scope.$apply(function () {
					beaconInfo.previousIpfsContent = text;
					beaconInfo.currentIpfsContent = text;
				});
			});
		});
}

function addBeaconTo(proofs, $scope, beaconInfos, adminAccount, newBeaconInfo) {
	return proofs.addBeacon(
		newBeaconInfo.address,
		newBeaconInfo.major,
		newBeaconInfo.previousMinor,
		newBeaconInfo.previousHash,
		{ "from": adminAccount, "gas": BOOM_GAS })
		.catch(function (e) {
			console.error("Failed to proofs.addBeaconTo(" + newBeaconInfo.address 
				+ ", " + newBeaconInfo.major
				+ ", " + newBeaconInfo.hash + "), " + e);
		})
		.then(function (result) {
			var indexUpdated = -1;
			beaconInfos.forEach(function (beaconInfo, index, array) {
				if (beaconInfo.id == newBeaconInfo.id) {
					indexUpdated = index;
				}
			});
			$scope.$apply(function () {
				if (indexUpdated >= 0) {
					beaconInfos.splice(indexUpdated, 1);
				}
				beaconInfos.push({
					"address": newBeaconInfo.address,
					"major": newBeaconInfo.major,
					"previousMinor": newBeaconInfo.previousMinor,
					"previousHash": newBeaconInfo.previousHash,
					"balance": web3.eth.getBalance(newBeaconInfo.address),
					"balanceInFinney": web3.fromWei(web3.eth.getBalance(newBeaconInfo.address), "finney"),
					"adding": true
				});
			});
		});	
}

function updatePreviousHashAt(proofs, $scope, beaconInfo, newBeaconPreviousMinor, newBeaconPreviousHash) {
	return proofs.updatePrevious(
		newBeaconPreviousMinor,
		newBeaconPreviousHash,
		{ "from": beaconInfo.address, "gas": BOOM_GAS })
		.catch(function (e) {
			console.error("Failed to proofs.updatePrevious(" + newBeaconPreviousHash + "), " + e);
		})
		.then(function (txn) {
			$scope.$apply(function () {
				beaconInfo.previousMinor = newBeaconPreviousMinor;
				beaconInfo.previousHash = newBeaconPreviousHash;
			});
		});
}
