/**
* BeaconInfo = {
*     address,
*     major,
*     previousHash,
*     currentHash,
*     index	
*     balance
*     balanceInFinney
* }
*
* TradeUpdate = {
*     major,
*     minor,
*     timestamp,
*     previousHash	
* }
*/
function createTraceUpdate(beaconInfo, newBeaconMinor) {
	return {
		"major": beaconInfo.major,
		"minor": newBeaconMinor,
		"timestamp": web3.eth.getBlock().timestamp,
		"previousHash": beaconInfo.currentHash
	};
}

function putTraceUpdate(proofs, $scope, beaconInfo, traceUpdate, beaconAddress) {
	// First we put the current hash into the proofs
	proofs.updatePrevious
		(
			beaconInfo.currentMinor,
			beaconInfo.currentHash,
			{
				"from": beaconAddress,
				"gas": BOOM_GAS
			}
		)
		.catch(function(e) {
			console.error("Failed to proofs.updatePrevious(" + 
				beaconInfo.previousMinor + ", " + beaconInfo.previousHash + "), " + e);
		})
		.then(function (result) {
			beaconInfo.previousMinor = beaconInfo.currentMinor;
			beaconInfo.previousHash = beaconInfo.currentHash;
			beaconInfo.previousIpfsContent = beaconInfo.currentIpfsContent;
			beaconInfo.updatedTimestamp = new Date();
			var string = JSON.stringify(traceUpdate);
			console.log("Sending to IPFS: " + string);
			// Next we put the new hash in the buffer object
			ipfs.add(
				string,
				function(err, hash) {
					if (err) {
						console.error("Failed to ipfs.add(" + string + "), " + err);
					}
					console.log(hash);
					if (hash) {
						$scope.$apply(function () {
							beaconInfo.currentMinor = traceUpdate.minor;
							beaconInfo.currentHash = hash;
						});
						ipfs.catText(hash, function (e, text) {
							if(e) {
								console.error("Failed to ipfs.catText(" + hash + "), " + e);
							}
							$scope.$apply(function () {
								beaconInfo.currentIpfsContent = text;
							});
						});
					}
				});
		});
}