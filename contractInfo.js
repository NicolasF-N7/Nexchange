function initVars(scope) {
  scope.contractAddr = "0x0";
  scope.metaMaskInstalledMsg = "MetaMask not installed."
  if (typeof window.ethereum !== 'undefined') {
    scope.metaMaskInstalledMsg = 'MetaMask is installed!';
  }
}

function initView(scope) {

}

function retrieveContractInfo(scope, http){
  scope.contractAddr = "0x1";
}

function connectMetaMask($scope, $http){
  ethereum.request({ method: 'eth_requestAccounts' }).then(function(res){console.log("Logged in as " + res[0].address + " !");});
}

var app = angular.module('neighborExchgApp', []);
app.controller('neighborExchgCtrl', function($scope,$http) {
	initVars($scope);
 	initView($scope);
  retrieveContractInfo($scope, $http);
  $scope.connect=function() {connectMetaMask($scope, $http);}
});
