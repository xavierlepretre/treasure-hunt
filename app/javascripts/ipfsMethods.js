function getIpfsId($scope) {
	ipfs.id()
		.catch(function (e) {
			console.error(e);
		})
  		.then(function (id) {
    		console.log('my id is: ', id)
  		});
}
