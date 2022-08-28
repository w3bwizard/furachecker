export {getBalance}

async function getBalance(wallet) {
  let url = 'https://eth-mainnet.alchemyapi.io/v2/demo'
  let request = {
    "id": 1,
    "jsonrpc": "2.0",
    "params": 
    [
      wallet,
      "latest"
    ],
  "method": "eth_getBalance"
  }
  let response = await fetch(url, {
    method: 'POST',
    headers: 
    {
      'Content-Type': 'application/json;charset=utf-8'
    },
     body: JSON.stringify(request)
  })
  let result = await response.json();
  return roundBalance(result.result)
}

function roundBalance(balance) {
  return (parseInt(balance) / 1000000000000000000).toFixed(5)
}

