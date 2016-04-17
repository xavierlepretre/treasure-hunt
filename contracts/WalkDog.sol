import "UsingOraclize.sol";
import "Prover.sol";

contract WalkDog is UsingOraclize {
	address public owner;
	address public walker;
	address public proof;

	bytes32 public major;
	uint public timeLimit;
	string public minor;
	uint public minorTimestamp;

	function WalkDog(address _walker, address _proof, bytes32 _major, uint _timeLimit) {
		owner = msg.sender;
		walker = _walker;
		proof = _proof;
		major = _major;
		timeLimit = _timeLimit;
		minorTimestamp = _timeLimit;
	}

	modifier onlyOwner() {
		if (msg.sender != owner) {
			throw;
		}
		_
	}

	modifier onlyWalker() {
		if (msg.sender != walker) {
			throw;
		}
		_
	}

	modifier onlyProof() {
		if (msg.sender != proof) {
			throw;
		}
		_
	}

	modifier onlyOraclize() {
		if (msg.sender != oraclize_cbAddress()) {
			throw;
		}
		_
	}

	function setMinor(string _minor) 
		onlyWalker() {
		minor = _minor;
		minorTimestamp = now;
		if (timeLimit < minorTimestamp) {
			suicide(owner);
		}
	}

	function completeWalk() {
		Prover(proof).proveMe.value(msg.value)(major, minorTimestamp);
	}

	function prove(string _minor) 
		onlyProof() {
		if (strCompare(minor, _minor) == 0) {
			suicide(walker);
		}
	}

	function completeWalkOracle() {
		Prover(proof).proveMeOracle.value(msg.value)(major, minorTimestamp);
	}

	function proveOracle(string _hash) 
		onlyProof() {
		oraclize_query("URL", strConcat("json(http://gateway.ipfs.io/ipfs/", _hash, ").minor"));
	}

	function __callback(bytes32 myid, string _minor) 
		onlyOraclize() {

	 	if (strCompare(minor, _minor) == 0) {
			suicide(walker);
		}
	}

	function kill() {
		if (timeLimit < minorTimestamp) {
			suicide(owner);
		}		
	}
}