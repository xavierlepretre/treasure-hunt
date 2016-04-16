/**
* ProofInfo = {
      minValue	
* }
*/
function getProofInfo(proofs, $scope, proofInfo) {
	proofs.minValue()
		.catch(function (e) {
			console.error("Failed to proofs.minValue(), " + e);
		})
		.then(function (minValue) {
			$scope.$apply(function() {
				proofInfo.minValue = minValue;
			});
		});
}

/**
* BeaconInfo = {
*     address,
*     major,
*     hash,
*     index	
* }
*/
function getBeacons(proofs, $scope, $q, beaconInfos) {
	proofs.getMajorsCount.call()
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
			return proofs.beacons(address)
				.catch(function (e) {
					console.error("Failed to proofs.beacons(" + address + "), " + e);
				})
				.then(function (beaconInfo) {
					$scope.$apply(function () {
						beaconInfos.push({
							"index": index,
							"major": web3.toAscii(beaconInfo[0]),
							"hash": beaconInfo[1],
							"address": address
						});
					});
				});
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
				beaconInfo.hash = received[1];
				beaconInfo.address = address;
			});
		})
}

function addBeaconTo(proofs, $scope, beaconInfos, adminAccount, newBeaconInfo) {
	proofs.addBeacon(
		newBeaconInfo.address,
		newBeaconInfo.major,
		newBeaconInfo.hash,
		{ from: adminAccount, gas: BOOM_GAS })
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
					"hash": newBeaconInfo.hash,
					"adding": true
				});
			});
		});	
}

function updateHashAt(proofs, $scope, beaconInfo, newBeaconHash) {
	proofs.updatePrevious(
		newBeaconHash,
		{ from: beaconInfo.address, gas: BOOM_GAS })
		.catch(function (e) {
			console.error("Failed to proofs.updatePrevious(" + beaconInfo.address + "), " + e);
		})
		.then(function (txn) {
			$scope.$apply(function () {
				beaconInfo.hash = newBeaconHash;
			});
		});
}
