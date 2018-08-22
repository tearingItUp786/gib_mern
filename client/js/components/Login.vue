<template>
<div class="flex justify-center items-center w-screen h-screen">
  <div class="w-3/5 max-w-lg">
    <form v-on:submit.prevent="handleFormSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input required v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
      </div>
      <div class="mb-6">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input required v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign In
        </button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { signIn } from '../helpers/authHelper.js';

export default {
  data() {
    return {
      username: 'Bains_t',
      password: 'testPass',
      isSubmitted: false
    };
  },
  methods: {
    async handleFormSubmit() {
      console.log('the form was submitted');
      const { username, password } = this;

      try {
        await signIn({ username, password });
        console.log('push');
        this.$router.push('/admin');
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
