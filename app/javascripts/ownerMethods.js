/**
* contract: the Owned contract object
* $scope: the Angular scope
* owner: object empty or not ready to have "address" set
*/
function getOwnerAddress (contract, $scope, owner) {
	contract.owner()
		.catch(function (e) {
			console.error("Failed to contract.owner(), " + e);
		})
		.then(function (result) {
			$scope.$apply(function () {
				owner.address = result;
			});
		});
}