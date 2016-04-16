// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"majors","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"beacon","type":"address"}],"name":"removeBeacon","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"beacon","type":"address"},{"name":"major","type":"bytes32"},{"name":"hash","type":"string"}],"name":"addBeacon","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"string"}],"name":"updatePrevious","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"minValue","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"beacons","outputs":[{"name":"major","type":"bytes32"},{"name":"hash","type":"string"},{"name":"index","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"major","type":"bytes32"}],"name":"proveMe","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"getMajorsCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"major","type":"bytes32"},{"indexed":false,"name":"hash","type":"string"}],"name":"onUpdatedPrevious","type":"event"}],
    binary: "606060405260008054600160a060020a0319163317905567016345785d8a0000600155610908806100306000396000f3606060405236156100825760e060020a600035046309c30e9281146100845780631eea8e45146100c1578063699f200f146100e65780637468054f14610107578063753c48ed146101705780638da5cb5b14610222578063963e63c7146102345780639cad172a1461023d578063be61559214610262578063cd77f0441461027a575b005b61027e60043560048054829081101561000257506000527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b015481565b610082600435600080548190600160a060020a03908116339091161461055f57610002565b610290600435600360205260009081526040902054600160a060020a031681565b604080516020604435600481810135601f810184900484028501840190955284845261008294813594602480359593946064949293910191819084018382808284375094965050505050505060008054600160a060020a03908116339091161461034457610002565b6040805160206004803580820135601f810184900484028501840190955284845261008294919360249390929184019190819084018382808284375094965050505050505033600160a060020a0316600090815260026020818152604083206001908101805486518287529584902091959281161561010002600019011693909304601f908101839004840193919286019083901061071157805160ff19168380011785555b506107419291506103f9565b610290600054600160a060020a031681565b61027e60015481565b600260208190526004356000908152604090208054918101546102ad92916001019083565b61008260043560015460009034101561080557610002565b6004545b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b60408051848152908101829052606060208201818152845460026001821615610100026000190190911604918301829052906080830190859080156103335780601f1061030857610100808354040283529160200191610333565b820191906000526020600020905b81548152906001019060200180831161031657829003601f168201915b505094505050505060405180910390f35b600083815260036020526040812054600160a060020a03161461036657610002565b50600454604080516060810182528481526020818101858152828401859052600160a060020a038816600090815260028084529481208451815591518051600184810180548186529487902097989597909691851615610100026000190190941694909404601f9081018590048401949193929091019083901061040d57805160ff19168380011785555b5061043d9291505b808211156104a457600081556001016103f9565b828001600101855582156103f1579182015b828111156103f157825182600050559160200191906001019061041f565b5050604091820151600291909101556000848152600360205220805473ffffffffffffffffffffffffffffffffffffffff191685179055600480546001810180835582818380158290116104a8578183600052602060002091820191016104a891906103f9565b5090565b50505091909060005260206000209001600085909190915055507f0ca0c016e1f87af3cbf716780a39c64df6cf9b60c7152051a7cbf696a6aaeef3838360405180838152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561054b5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a150505050565b5050600160a060020a038116600090815260026020819052604082208054818301548483556001838101805487825593969295929390929181161561010002600019011604601f81901061068357505b50506000600291909101819055828152600360205260409020805473ffffffffffffffffffffffffffffffffffffffff19169055600480546000198101908110156100025750805460008290527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19a8101549190839081101561000257507f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b830191909155805460001981018083559091908280158290116106a1578183600052602060002091820191016106a191906103f9565b601f0160209004906000526020600020908101906105af91906103f9565b505050508060026000506000600360005060006004600050868154811015610002575050507f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b9093015481526020928352604080822054600160a060020a03168252928290529190912001555050565b82800160010185558215610216579182015b82811115610216578251826000505591602001919060010190610723565b50507f0ca0c016e1f87af3cbf716780a39c64df6cf9b60c7152051a7cbf696a6aaeef36002600050600033600160a060020a03168152602001908152602001600020600050600001600050548260405180838152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156107f45780820380516001836020036101000a031916815260200191505b50935050505060405180910390a150565b50600081815260036020908152604080832054600160a060020a0390811680855260028085529483902092517f9d4968850000000000000000000000000000000000000000000000000000000081526004810194855260019384018054600019958116156101000295909501909416959095046024860181905290943390921693639d49688593929091829160440190849080156108e45780601f106108b9576101008083540402835291602001916108e4565b820191906000526020600020905b8154815290600101906020018083116108c757829003601f168201915b5050925050506000604051808303816000876161da5a03f11561000257505050505056",
    unlinked_binary: "606060405260008054600160a060020a0319163317905567016345785d8a0000600155610908806100306000396000f3606060405236156100825760e060020a600035046309c30e9281146100845780631eea8e45146100c1578063699f200f146100e65780637468054f14610107578063753c48ed146101705780638da5cb5b14610222578063963e63c7146102345780639cad172a1461023d578063be61559214610262578063cd77f0441461027a575b005b61027e60043560048054829081101561000257506000527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b015481565b610082600435600080548190600160a060020a03908116339091161461055f57610002565b610290600435600360205260009081526040902054600160a060020a031681565b604080516020604435600481810135601f810184900484028501840190955284845261008294813594602480359593946064949293910191819084018382808284375094965050505050505060008054600160a060020a03908116339091161461034457610002565b6040805160206004803580820135601f810184900484028501840190955284845261008294919360249390929184019190819084018382808284375094965050505050505033600160a060020a0316600090815260026020818152604083206001908101805486518287529584902091959281161561010002600019011693909304601f908101839004840193919286019083901061071157805160ff19168380011785555b506107419291506103f9565b610290600054600160a060020a031681565b61027e60015481565b600260208190526004356000908152604090208054918101546102ad92916001019083565b61008260043560015460009034101561080557610002565b6004545b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b60408051848152908101829052606060208201818152845460026001821615610100026000190190911604918301829052906080830190859080156103335780601f1061030857610100808354040283529160200191610333565b820191906000526020600020905b81548152906001019060200180831161031657829003601f168201915b505094505050505060405180910390f35b600083815260036020526040812054600160a060020a03161461036657610002565b50600454604080516060810182528481526020818101858152828401859052600160a060020a038816600090815260028084529481208451815591518051600184810180548186529487902097989597909691851615610100026000190190941694909404601f9081018590048401949193929091019083901061040d57805160ff19168380011785555b5061043d9291505b808211156104a457600081556001016103f9565b828001600101855582156103f1579182015b828111156103f157825182600050559160200191906001019061041f565b5050604091820151600291909101556000848152600360205220805473ffffffffffffffffffffffffffffffffffffffff191685179055600480546001810180835582818380158290116104a8578183600052602060002091820191016104a891906103f9565b5090565b50505091909060005260206000209001600085909190915055507f0ca0c016e1f87af3cbf716780a39c64df6cf9b60c7152051a7cbf696a6aaeef3838360405180838152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561054b5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a150505050565b5050600160a060020a038116600090815260026020819052604082208054818301548483556001838101805487825593969295929390929181161561010002600019011604601f81901061068357505b50506000600291909101819055828152600360205260409020805473ffffffffffffffffffffffffffffffffffffffff19169055600480546000198101908110156100025750805460008290527f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19a8101549190839081101561000257507f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b830191909155805460001981018083559091908280158290116106a1578183600052602060002091820191016106a191906103f9565b601f0160209004906000526020600020908101906105af91906103f9565b505050508060026000506000600360005060006004600050868154811015610002575050507f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b9093015481526020928352604080822054600160a060020a03168252928290529190912001555050565b82800160010185558215610216579182015b82811115610216578251826000505591602001919060010190610723565b50507f0ca0c016e1f87af3cbf716780a39c64df6cf9b60c7152051a7cbf696a6aaeef36002600050600033600160a060020a03168152602001908152602001600020600050600001600050548260405180838152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156107f45780820380516001836020036101000a031916815260200191505b50935050505060405180910390a150565b50600081815260036020908152604080832054600160a060020a0390811680855260028085529483902092517f9d4968850000000000000000000000000000000000000000000000000000000081526004810194855260019384018054600019958116156101000295909501909416959095046024860181905290943390921693639d49688593929091829160440190849080156108e45780601f106108b9576101008083540402835291602001916108e4565b820191906000526020600020905b8154815290600101906020018083116108c757829003601f168201915b5050925050506000604051808303816000876161da5a03f11561000257505050505056",
    address: "0x0fcdc95325205ffbd4a73b190e1504fd20201917",
    generated_with: "2.0.6",
    contract_name: "Proofs"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Proofs error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("Proofs error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Proofs error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Proofs error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Proofs = Contract;
  }

})();
