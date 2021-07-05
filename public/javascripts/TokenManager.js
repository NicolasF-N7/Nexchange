//let Web3 = require("web3");
let tokenMngrFctnSelector = {
  mint: "0x2004ffd9",
  totalSupply: "0x18160ddd",
  tokenByIndex: "0x4f6ccce7",
  tokenOfOwnerByIndex: "0x2f745c59",
  transferFrom: "0x23b872dd",
  burnToken: "0x7b47ec1a",
  safeTransferFrom: "0x42842e0e",
  balanceOf: "0x70a08231",
}
let accountAddr = "";
ethereum.on('chainChanged', (chainId) => {
  window.location.reload();//recommended
});

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else {
    console.log('Connected to MetaMask with ' + accounts[0]);
    accountAddr = accounts[0];
  }
}

function metamaskConnect(callback){
  if(window.ethereum){
      ethereum.request({ method: 'eth_requestAccounts' })
      .then((acc) => {
        handleAccountsChanged(acc);
        callback();
      })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });//window.web3 and ethereum.enable() are deprecated
    return true;
  }else{
    return false
  }
}

async function getBalance() {
  if (accountAddr == "") {return false;}
  let balance = -1;
  await ethereum.request({ method: 'eth_getBalance', params:  [accountAddr, "latest"]})
  .then((res) => {
    balance = parseInt(res, 16)
    console.log("Got it! " + balance);
  })
  .catch((err) => {
    if (err.code === 4001) {console.log('Please connect to MetaMask.');}
    else {console.error(err);}
  });
  return balance;
}

//Add callback to send data to the DB when mint finished
function mintToken(){
  if (accountAddr == "") {return false;}
  let mintData = tokenMngrFctnSelector.mint;
  let rawTransaction = {
    from: accountAddr,
    to: "0x83B33907DE3469B030f058B06bA893E5352B5ec6",
    gas: "80000",
    data: mintData,
  };
  ethereum.request({ method: 'eth_sendTransaction', params:  [rawTransaction]})
  .then((res) => {
    console.log("Token minted !");
  })
  .catch((err) => {
    if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      console.log('Please connect to MetaMask.');
    } else {
      console.error(err);
    }
  });
}

//Takes a callback function with the tokenBalance as parameter and execute it when the response is received
function getTokenBalance(callback){
  if (accountAddr == "") {return false;}
  let balanceData = tokenMngrFctnSelector.balanceOf + "000000000000000000000000"  + accountAddr.substring(2);

  let rawTransaction = {
    from: accountAddr,
    to: "0x83B33907DE3469B030f058B06bA893E5352B5ec6",
    data: balanceData,
  };
  ethereum.request({ method: 'eth_call', params:  [rawTransaction, "latest"]})
  .then((res) => {
    let balance = parseInt(res, 16);
    callback(balance);
  })
  .catch((err) => {
    if (err.code === 4001) {console.log('Please connect to MetaMask.');}
    else {console.error(err);}
  });
}

function getAccountAddr(){
  return accountAddr;
}

//callback takes the tokenID and is executed when the request is satisfied
function gettokenOfOwnerByIndex(index, callback){
  if (accountAddr == "") {return false;}
  let indexParam = (parseInt(index, 10).toString(16)).padStart(64, "0");
  let tokData = tokenMngrFctnSelector.tokenOfOwnerByIndex + "000000000000000000000000" + accountAddr.substring(2) + indexParam;
//0x2f745c59000000000000000000000000343da20c010148b4e4d4d3203e7c445e0a7468a400000000000000000000000000000001
//0x2f745c59 343da20c010148b4e4d4d3203e7c445e0a7468a4 0000000000000000000000000000000000000000000000000000000000000001
//FROM ETHERSCAN: 0x2f745c59000000000000000000000000343da20c010148b4e4d4d3203e7c445e0a7468a40000000000000000000000000000000000000000000000000000000000000001
  let rawTransaction = {
    from: accountAddr,
    to: "0x83B33907DE3469B030f058B06bA893E5352B5ec6",
    data: tokData,
  };
  ethereum.request({ method: 'eth_call', params:  [rawTransaction, "latest"]})
  .then((res) => {
    let tokID = parseInt(res, 16);
    callback(tokID);
  })
  .catch((err) => {
    if (err.code === 4001) {console.log('Please connect to MetaMask.');}
    else {console.error(err);}
  });
}
