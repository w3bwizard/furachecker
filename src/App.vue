<template>
  <form @submit.prevent class="container mx-auto px-4 mt-20 max-w-lg" >   
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
      <div class="relative">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input v-model="key" type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900  rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Eth addr" required>
          <button @submit.prevent v-on:click="check()" type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Check balance</button>          
      </div>
      <div class="relative text-2xl mt-10 text-gray-900 dark:text-white text-center">{{balance}} eth</div>      
  </form>
  <div class="container mx-auto px-4 my-20 max-w-lg">
    <textarea id="memo"  v-model="memo" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
    <button type="button" v-on:click="massCheck()" class="w-full mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Mass Check balance</button>
  </div>
</template>

<!-- 
0x62f07D9C49347f609b0114f5f276EB8fD51999ae
0xa79d08efb2df7587c0469c6a2da8291954fc261e
-->

<!-- todo:
  + Адаптивность текста
  + hex to float
  + подключение js файлов
  + убрать мерзкий бордер при фокусе на инпут

  - Многострочный мемо с кошельками
  - Массовая проверка
  - балланс в конце каждой строчки
  - адаптивность
 -->

<script>

import {getBalance} from "./app.js";

export default {
  data() {
    return {
      key: '',
      balance: '0',
      memo: ''
    }
  },
  methods: {
    async check() {
    this.balance = await getBalance(this.key)
    },
    async massCheck() {
      let wallets = this.memo.split(/\r\n|\r|\n/)
      let checkedWallets = []

      for (let i = 0; i < wallets.length; i++) {
        let balance = await(getBalance(wallets[i]))
        checkedWallets.push(wallets[i] + '           #'+ balance + ' eth')
      }

      this.memo = checkedWallets.join('\r')
    }
  }
}
</script>

<style>
body {
  background-color: rgb(14, 18, 28);
}
textarea:focus, input:focus {
   outline: none;
}
</style>
