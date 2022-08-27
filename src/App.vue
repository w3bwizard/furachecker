<template>
  <form @submit.prevent class="container mx-auto px-4 my-20" >   
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
      <div class="relative">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input v-model="key" type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900  rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Eth addr" required>
          <button @submit.prevent v-on:click="check()" type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get balance</button>
      </div>
  </form>
  <p class="text-9xl text-gray-900 dark:text-white text-center">{{balance}} eth</p>
</template>

<!-- 0x62f07D9C49347f609b0114f5f276EB8fD51999ae -->

<script>
export default {
  data() {
    return {
      key: '',
      balance: '0'
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
    this.balance = (result.result).toString()
    }
  }
}
</script>

<style>
body {
  background-color: rgb(14, 18, 28);
}
</style>
