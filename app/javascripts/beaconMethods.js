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
		"previousHash": beaconInfo.previousHash
	};
}

function putTraceUpdate(proofs, $scope, beaconInfo, traceUpdate, beaconAddress) {
	// First we put the current hash into the proofs
	proofs.updatePrevious
		(
			beaconInfo.hash,
			{
				"from": beaconAddress,
				"gas": BOOM_GAS
			}
		)
		.catch(function(e) {
			console.error("Failed to proofs.updatePrevious(" + beaconInfo.hash + "), " + e);
		})
		.then(function (result) {
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
							beaconInfo.hash = hash;
						});
					}
				});
		});
}