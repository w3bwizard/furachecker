<template>
  <input type="text" v-model="key">
  <button v-on:click="check()">search</button>
  <div>{{balance}}</div>
</template>

<script>
export default {
  data() {
    return {
      key: '',
      balance: ''
    }
  },
  methods: {
    async check()  {
      let url = 'https://eth-mainnet.alchemyapi.io/v2/demo'
      let request = {
        "id": 1,
        "jsonrpc": "2.0",
        "params": 
        [
          this.key,
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
    this.balance = parseInt(result.result, 16)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
