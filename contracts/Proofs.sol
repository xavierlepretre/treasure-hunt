import "Prover.sol";
import "NeedProof.sol";

contract Proofs is Prover {
	address public owner;
	uint public minValue;

	struct Beacon {
		bytes32 major;
		string hash;
		uint index;
	}

	mapping(address => Beacon) public beacons;
	mapping(bytes32 => address) public addresses;
	bytes32[] public majors;

	event onUpdatedPrevious(bytes32 major, string hash);

	function Proofs() {
		owner = msg.sender;
		minValue = 100 finney;
	}

	modifier onlyOwner() {
		if (msg.sender != owner) {
			throw;
		}
		_
	}

	modifier hasPayment() {
		if (msg.value < minValue) {
			throw;
		}
		_
	}

	function getMajorsCount() returns (uint) {
		return majors.length;
	}

	function addBeacon(address beacon, bytes32 major, string hash) 
		onlyOwner() {
		if (addresses[major] != 0) {
			throw;
		}
		uint index = majors.length;
		beacons[beacon] = Beacon(major, hash, index);
		addresses[major] = beacon;
		majors.push(major);
		onUpdatedPrevious(major, hash);
	}

	function removeBeacon(address beacon) 
		onlyOwner() {
		bytes32 major = beacons[beacon].major;
		uint index = beacons[beacon].index;
		delete(beacons[beacon]);
		delete(addresses[major]);
		majors[index] = majors[majors.length - 1];
		majors.length--;
		beacons[addresses[majors[index]]].index = index;
	}

	function updatePrevious(string hash) {
		beacons[msg.sender].hash = hash;
		onUpdatedPrevious(beacons[msg.sender].major, hash);
	}

	function proveMe(bytes32 major) 
		hasPayment() {
		address beacon = addresses[major];
		NeedProof(msg.sender).prove(beacons[beacon].hash);
	}
}
