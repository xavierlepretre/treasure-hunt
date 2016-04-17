// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"_minor","type":"string"}],"name":"__callback","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"completeWalk","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"minorTimestamp","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"string"}],"name":"proveOracle","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"walker","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"completeWalkOracle","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_minor","type":"string"}],"name":"setMinor","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_minor","type":"string"}],"name":"prove","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"minor","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"timeLimit","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"major","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"proof","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[{"name":"_walker","type":"address"},{"name":"_proof","type":"address"},{"name":"_major","type":"bytes32"},{"name":"_timeLimit","type":"uint256"}],"type":"constructor"}],
    binary: "6060604081905260008054600160a060020a031916731d11e5eae3112dbd44f99266872ff1d07c77dce8179055608080610eea833960e06040529051905160a05160c0516002805433600160a060020a031991821617909155600380548216909517909455600480549094169092179092556005919091556006819055600855610e5d8061008d6000396000f3606060405236156100ae5760e060020a600035046327dc297e81146100b057806339f66d36146101ce57806341c0e1b514610248578063444ede7f146102665780634a679edb1461026f57806352f02816146102cf57806356fc8647146102e15780638da5cb5b1461035a5780638f7b45d01461036c5780639d496885146103cd578063bb834b0e1461042d578063c08d1fe51461048d578063f86d0b3814610496578063faf924cf1461049f575b005b60408051602060248035600481810135601f81018590048502860185019096528585526100ae9581359591946044949293909201918190840183828082843750949650505050505050610ac0604080516000805460e060020a6338cc483102835292519092600160a060020a0316916338cc4831916004828101926020929190829003018187876161da5a03f1156100025750506040805180516001805473ffffffffffffffffffffffffffffffffffffffff1916909117908190557fc281d19e0000000000000000000000000000000000000000000000000000000082529151600160a060020a0392909216925063c281d19e916004828101926020929190829003018187876161da5a03f1156100025750506040515191505090565b6100ae60048054600554600854604080517f505d810c00000000000000000000000000000000000000000000000000000000815294850192909252602484015251600160a060020a039091169163505d810c913491604481810192600092909190829003018185886185025a03f11561000257505050505b565b6100ae60065460085490101561024657600254600160a060020a0316ff5b6104b160085481565b6040805160206004803580820135601f81018490048402850184019095528484526100ae94919360249390929184019190819084018382808284375094965050505050505060045433600160a060020a0390811691161461077357610002565b6104c3600354600160a060020a031681565b6100ae60048054600554600854604080517f61ed17fd00000000000000000000000000000000000000000000000000000000815294850192909252602484015251600160a060020a03909116916361ed17fd913491604481810192600092909190829003018185886185025a03f1156100025750505050565b6104c3600254600160a060020a031681565b6040805160206004803580820135601f81018490048402850184019095528484526100ae949193602493909291840191908190840183828082843750949650505050505050600354600160a060020a03908116339091161461058157610002565b6040805160206004803580820135601f81018490048402850184019095528484526100ae94919360249390929184019190819084018382808284375094965050505050505060045433600160a060020a0390811691161461063e57610002565b6104e060078054604080516020601f600260001960018716156101000201909516949094049384018190048102820181019092528281529291908301828280156105795780601f1061054e57610100808354040283529160200191610579565b6104b160065481565b6104b160055481565b6104c3600454600160a060020a031681565b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156105405780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b820191906000526020600020905b81548152906001019060200180831161055c57829003601f168201915b505050505081565b8060076000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106105e857805160ff19168380011785555b506106189291505b8082111561063757600081556001016105d4565b828001600101855582156105cc579182015b828111156105cc5782518260005055916020019190600101906105fa565b5050426008819055600654101561063b57600254600160a060020a0316ff5b5090565b50565b6007805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181526106a09390929091908301828280156106e15780601f106106b6576101008083540402835291602001916106e1565b6000141561063b57600354600160a060020a0316ff5b820191906000526020600020905b8154815290600101906020018083116106c457829003601f168201915b5050505050826040805160208181018352600091829052825190810190925290819052825182518491849184908290101561071b57825191505b5060005b81811015610c7957828181518110156100025790602001015160f860020a900460f860020a02848281518110156100025790602001015160f860020a900460f860020a021015610c8d576000199450610cf8565b604080518082018252600381527f55524c00000000000000000000000000000000000000000000000000000000006020828101919091528251606081018452602181527f6a736f6e28687474703a2f2f676174657761792e697066732e696f2f69706673818301527f2f00000000000000000000000000000000000000000000000000000000000000818501528351808501909452600784527f292e6d696e6f7200000000000000000000000000000000000000000000000000918401919091526109679261096b919085906040805160208181018352600080835283518083018552818152845192830190945281529091610d029186918691869190604080516020818101835260008083528351808301855281905283518083018552819052835180830185528190528351808301855281905283518083018552819052835180830185528181528451928301855281835293518551875189518b518d5197988e988e988e988e988e9894979296919586959401909101909101909101908059106108fc5750595b9080825280602002602001820160405250935083925060009150600090505b8851811015610d0a57888181518110156100025790602001015160f860020a900460f860020a028383806001019450815181101561000257600083901a9101602001535060010161091b565b5050565b600080546040805160e060020a6338cc483102815290518392600160a060020a0316916338cc4831916004828101926020929190829003018187876161da5a03f11561000257505060405180516001805473ffffffffffffffffffffffffffffffffffffffff1916909117908190557f524f388900000000000000000000000000000000000000000000000000000000825260206004838101828152895160248601528951600160a060020a0394909416955063524f3889948a94919384936044929092019286820192909182918591839186918e9190601f850104600f02600301f150905090810190601f168015610a785780820380516001836020036101000a031916815260200191505b50925050506020604051808303816000876161da5a03f11561000257505060405151915050670de0b6b3a764000062030d403a0201811115610b5357600091505b5092915050565b600160a060020a031633600160a060020a0316141515610adf57610002565b6040805160078054602060026001831615610100026000190190921691909104601f8101829004820284018201909452838352610b3d93908301828280156106e15780601f106106b6576101008083540402835291602001916106e1565b6000141561096757600354600160a060020a0316ff5b600160009054906101000a9004600160a060020a0316600160a060020a031663adf59f9982600087876040518560e060020a0281526004018084815260200180602001806020018381038352858181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610bf25780820380516001836020036101000a031916815260200191505b508381038252848181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610c4b5780820380516001836020036101000a031916815260200191505b509550505050505060206040518083038185886185025a03f115610002575050604051519350610ab9915050565b825184511015610ce0576000199450610cf8565b828181518110156100025790602001015160f860020a900460f860020a02848281518110156100025790602001015160f860020a900460f860020a021115610cd85760019450610cf8565b60010161071f565b825184511115610cf35760019450610cf8565b600094505b5050505092915050565b949350505050565b5060005b8751811015610d5a57878181518110156100025790602001015160f860020a900460f860020a028383806001019450815181101561000257600083901a91016020015350600101610d0e565b5060005b8651811015610daa57868181518110156100025790602001015160f860020a900460f860020a028383806001019450815181101561000257600083901a91016020015350600101610d5e565b5060005b8551811015610dfa57858181518110156100025790602001015160f860020a900460f860020a028383806001019450815181101561000257600083901a91016020015350600101610dae565b5060005b8451811015610e4a57848181518110156100025790602001015160f860020a900460f860020a028383806001019450815181101561000257600083901a91016020015350600101610dfe565b50909d9c5050505050505050505050505056",
    unlinked_binary: "6060604081905260008054600160a060020a031916731d11e5eae3112dbd44f99266872ff1d07c77dce8179055608080610eea833960e06040529051905160a05160c0516002805433600160a060020a031991821617909155600380548216909517909455600480549094169092179092556005919091556006819055600855610e5d8061008d6000396000f3606060405236156100ae5760e060020a600035046327dc297e81146100b057806339f66d36146101ce57806341c0e1b514610248578063444ede7f146102665780634a679edb1461026f57806352f02816146102cf57806356fc8647146102e15780638da5cb5b1461035a5780638f7b45d01461036c5780639d496885146103cd578063bb834b0e1461042d578063c08d1fe51461048d578063f86d0b3814610496578063faf924cf1461049f575b005b60408051602060248035600481810135601f81018590048502860185019096528585526100ae9581359591946044949293909201918190840183828082843750949650505050505050610ac0604080516000805460e060020a6338cc483102835292519092600160a060020a0316916338cc4831916004828101926020929190829003018187876161da5a03f1156100025750506040805180516001805473ffffffffffffffffffffffffffffffffffffffff1916909117908190557fc281d19e0000000000000000000000000000000000000000000000000000000082529151600160a060020a0392909216925063c281d19e916004828101926020929190829003018187876161da5a03f1156100025750506040515191505090565b6100ae60048054600554600854604080517f505d810c00000000000000000000000000000000000000000000000000000000815294850192909252602484015251600160a060020a039091169163505d810c913491604481810192600092909190829003018185886185025a03f11561000257505050505b565b6100ae60065460085490101561024657600254600160a060020a0316ff5b6104b160085481565b6040805160206004803580820135601f81018490048402850184019095528484526100ae94919360249390929184019190819084018382808284375094965050505050505060045433600160a060020a0390811691161461077357610002565b6104c3600354600160a060020a031681565b6100ae60048054600554600854604080517f61ed17fd00000000000000000000000000000000000000000000000000000000815294850192909252602484015251600160a060020a03909116916361ed17fd913491604481810192600092909190829003018185886185025a03f1156100025750505050565b6104c3600254600160a060020a031681565b6040805160206004803580820135601f81018490048402850184019095528484526100ae949193602493909291840191908190840183828082843750949650505050505050600354600160a060020a03908116339091161461058157610002565b6040805160206004803580820135601f81018490048402850184019095528484526100ae94919360249390929184019190819084018382808284375094965050505050505060045433600160a060020a0390811691161461063e57610002565b6104e060078054604080516020601f600260001960018716156101000201909516949094049384018190048102820181019092528281529291908301828280156105795780601f1061054e57610100808354040283529160200191610579565b6104b160065481565b6104b160055481565b6104c3600454600160a060020a031681565b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156105405780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b820191906000526020600020905b81548152906001019060200180831161055c57829003601f168201915b505050505081565b8060076000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106105e857805160ff19168380011785555b506106189291505b8082111561063757600081556001016105d4565b828001600101855582156105cc579182015b828111156105cc5782518260005055916020019190600101906105fa565b5050426008819055600654101561063b57600254600160a060020a0316ff5b5090565b50565b6007805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181526106a09390929091908301828280156106e15780601f106106b6576101008083540402835291602001916106e1565b6000141561063b57600354600160a060020a0316ff5b820191906000526020600020905b8154815290600101906020018083116106c457829003601f168201915b5050505050826040805160208181018352600091829052825190810190925290819052825182518491849184908290101561071b57825191505b5060005b81811015610c7957828181518110156100025790602001015160f860020a900460f860020a02848281518110156100025790602001015160f860020a900460f860020a021015610c8d576000199450610cf8565b604080518082018252600381527f55524c00000000000000000000000000000000000000000000000000000000006020828101919091528251606081018452602181527f6a736f6e28687474703a2f2f676174657761792e697066732e696f2f69706673818301527f2f00000000000000000000000000000000000000000000000000000000000000818501528351808501909452600784527f292e6d696e6f7200000000000000000000000000000000000000000000000000918401919091526109679261096b919085906040805160208181018352600080835283518083018552818152845192830190945281529091610d029186918691869190604080516020818101835260008083528351808301855281905283518083018552819052835180830185528190528351808301855281905283518083018552819052835180830185528181528451928301855281835293518551875189518b518d5197988e988e988e988e988e9894979296919586959401909101909101909101908059106108fc5750595b9080825280602002602001820160405250935083925060009150600090505b8851811015610d0a57888181518110156100025790602001015160f860020a900460f860020a028383806001019450815181101561000257600083901a9101602001535060010161091b565b5050565b600080546040805160e060020a6338cc483102815290518392600160a060020a0316916338cc4831916004828101926020929190829003018187876161da5a03f11561000257505060405180516001805473ffffffffffffffffffffffffffffffffffffffff1916909117908190557f524f388900000000000000000000000000000000000000000000000000000000825260206004838101828152895160248601528951600160a060020a0394909416955063524f3889948a94919384936044929092019286820192909182918591839186918e9190601f850104600f02600301f150905090810190601f168015610a785780820380516001836020036101000a031916815260200191505b50925050506020604051808303816000876161da5a03f11561000257505060405151915050670de0b6b3a764000062030d403a0201811115610b5357600091505b5092915050565b600160a060020a031633600160a060020a0316141515610adf57610002565b6040805160078054602060026001831615610100026000190190921691909104601f8101829004820284018201909452838352610b3d93908301828280156106e15780601f106106b6576101008083540402835291602001916106e1565b6000141561096757600354600160a060020a0316ff5b600160009054906101000a9004600160a060020a0316600160a060020a031663adf59f9982600087876040518560e060020a0281526004018084815260200180602001806020018381038352858181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610bf25780820380516001836020036101000a031916815260200191505b508381038252848181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f168015610c4b5780820380516001836020036101000a031916815260200191505b509550505050505060206040518083038185886185025a03f115610002575050604051519350610ab9915050565b825184511015610ce0576000199450610cf8565b828181518110156100025790602001015160f860020a900460f860020a02848281518110156100025790602001015160f860020a900460f860020a021115610cd85760019450610cf8565b60010161071f565b825184511115610cf35760019450610cf8565b600094505b5050505092915050565b949350505050565b5060005b8751811015610d5a57878181518110156100025790602001015160f860020a900460f860020a028383806001019450815181101561000257600083901a91016020015350600101610d0e565b5060005b8651811015610daa57868181518110156100025790602001015160f860020a900460f860020a028383806001019450815181101561000257600083901a91016020015350600101610d5e565b5060005b8551811015610dfa57858181518110156100025790602001015160f860020a900460f860020a028383806001019450815181101561000257600083901a91016020015350600101610dae565b5060005b8451811015610e4a57848181518110156100025790602001015160f860020a900460f860020a028383806001019450815181101561000257600083901a91016020015350600101610dfe565b50909d9c5050505050505050505050505056",
    address: "",
    generated_with: "2.0.6",
    contract_name: "WalkDog"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("WalkDog error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("WalkDog error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("WalkDog error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("WalkDog error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.WalkDog = Contract;
  }

})();
