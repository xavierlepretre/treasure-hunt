module.exports = {
  build: {
    "index.html": "index.html",
    "beacon.html": "beacon.html",
    "walkDog.html": "walkDog.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "proofs.js": [
      "javascripts/_vendor/angular.js",
      "javascripts/ownerMethods.js",
      "javascripts/proofsMethods.js",
      "javascripts/walkDogMethods.js",
      "javascripts/proofsController.js"
    ],
    "beacon.js": [
      "javascripts/_vendor/angular.js",
      "javascripts/proofsMethods.js",
      "javascripts/beaconController.js"
    ],
    "walkDog.js": [
      "javascripts/_vendor/angular.js",
      "javascripts/ownerMethods.js",
      "javascripts/walkDogMethods.js",
      "javascripts/walkDogController.js",
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  deploy: [
    "Proofs"
  ],
  rpc: {
    host: "0.0.0.0",
    port: 8101
  }
};
