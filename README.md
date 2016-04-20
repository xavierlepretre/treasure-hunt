# Treasure Hunt
This project was created during the 2 days of the Blockathon 2016 by Coinsilium. It was then known under the name __Been here, been there__.

## Addressed problem
Smart contracts often need access to data external to the blockchain. What do we do when this external data is a location, like a pair of latitude - longitude?

## Offered solution
This project offers a solution based on an interaction between a mesh of Bluetooth beacons, an authoritative smart contract and users of this infrastructure. In order to give a concrete example, we use the case of a dog owner who hires a dog walker to walk the dog a certain distance, before he gets automatically paid for it.

In this system:

* each beacon is known by:
 * its latitude / longitude location, so that for each location, there is 1 or more candidate beacons.
 * its `major` id.
 * on the other hand, the `minor` id is kept secret by the beacon until such time it discloses it.
* the beacon regularly changes its `minor`
* a `Proofs` contract:
 * records disclosed `minor` ids, and timestamps, for each beacon in the system.
 * calls back contracts that have paid the fee and provided correct timing information.
* a `WalkDog` contract that:
 * records a beacon's `minor` secret, and a timestamp.
 * asks the `Proofs` contract to confirm the information.
 * pays out in case of success. 

The dog walker, in effect, is given the following challenge:
> Save into the `WalkDog` contract, the secret `minor` of the target beacon, before the same beacon discloses it into the `Proofs` contract.

## Used tech
No Bluetooth beacon was used during the project. However their presence was simulated with the use of the `major` and `minor` ids typically broadcast by the device. Other tech used included:

* Ethereum for smart contracts
* Consensys' Truffle as the deployment / build environment
* AngularJS for the Web interface of these participants:
 * The authoritative location contract
 * A given beacon
 * The dog walking contract
* IPFS to save temporary secrets
* Vagrant to orchestrate installation, see [Vagrant-Truffle](https://github.com/xavierlepretre/truffle-vagrant)
* Oraclize, although not tested for lack of time

__Ethereum is central__ to this system as it gives the following facilities:

* when a secret is updated in a contract:
 * the contract updates a timestamp
 * this timestamp cannot be modified in isolation
* when a contract calls another:
 * it is there for all to see, and agree on, what are the parameters
 * this provides confidence in the contractual terms.

## What was built
### Slides
Found [here](https://docs.google.com/presentation/d/1_ld1m_6RaDJbTL0cCeuPJoD8wdNLN52oSEJ0tsM1B2A/edit?usp=sharing) 

### Diagrams
The first idea was to use IPFS fully to store temporary secrets, then use Oraclize to fetch them in order to prove precedence. For the sake of time, we skipped the Oraclize part, and created a system as per this:
[Diagram as done](https://github.com/xavierlepretre/treasure-hunt/blob/master/doc/Prove%20your%20location.svg.xml.svg)

Had the larger system been done, it would have looked like this:
[Diagram that could have been done](https://github.com/xavierlepretre/treasure-hunt/blob/master/doc/Prove%20your%20location%20with%20IPFS.svg.xml.svg)

### Smart contracts
* `Prover` contract interface, which is meant to be called by `NeedProof` contracts.
* `NeedProof` contract interface, which is meant to be called by a `Prover` contract.
* `Proofs` contract, which implements `Prover` and records beacons' obsolete secrets and timestamps.
* `WalkDog` contract, which implements `NeedProof` and saves 1 beacon's discovered secret, and calls `Prover` when prompted.

### Web pages
* `index.html`, which:
 * shows the state of the `Proofs` contract, including the total of fees collected.
 * lets you add beacons.
 * lets you create a `WalkDog` contract with this `Proofs` contract as the `Prover`.
* `beacon.html`, which:
 * lets you see the previous and current states of a participating beacon.
 * lets you update its secret `minor`.
 * shows you the JSON statuses saved in IPFS.
* `walkDog.html`, which:
 * lets you see the target beacon and reward of the contract.
 * lets you see the dog owner and walker addresses and balances.
 * lets you update the discovered `minor` secret.
 * lets you ask for confirmation from the `Prover`.

## Ups and downs
Ups:

* discussion flowed freely
* I got to hear about great ideas
* once figured out, IPFS worked like a charm
* never went hungry :)

Downs:

* None really