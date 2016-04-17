import "Prover.sol";
import "NeedProof.sol";

contract Proofs is Prover {
	address public owner;
	uint public minValue;

	struct Beacon {
		bytes32 major;
		string previousHash;
		uint updatedTimestamp;
		uint index;
	}

	mapping(address => Beacon) public beacons;
	mapping(bytes32 => address) public addresses;
	bytes32[] public majors;

	event onUpdatedPrevious(bytes32 major, string previousHash, uint updatedTimestamp);

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

	function addBeacon(address beacon, bytes32 major, string previousHash) 
		onlyOwner() {
		if (addresses[major] != 0) {
			throw;
		}
		uint index = majors.length;
		beacons[beacon] = Beacon(major, previousHash, now, index);
		addresses[major] = beacon;
		majors.push(major);
		onUpdatedPrevious(major, previousHash, now);
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

	function updatePrevious(string previousHash) {
		beacons[msg.sender].previousHash = previousHash;
		beacons[msg.sender].updatedTimestamp = now;
		onUpdatedPrevious(beacons[msg.sender].major, previousHash, now);
	}

	function proveMe(bytes32 major, uint updatedTimestamp) 
		hasPayment() {
		address beacon = addresses[major];
		if (beacons[beacon].updatedTimestamp < updatedTimestamp) {
			// It means that NeedProof updated its info too recently
			throw;
		}
		NeedProof(msg.sender).prove(beacons[beacon].previousHash);
	}
}
