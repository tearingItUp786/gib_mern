<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <div class="w-3/5 max-w-lg">
      <form 
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
        @submit.prevent="handleFormSubmit"
      >
        <div class="mb-4">
          <label 
            class="block text-grey-darker text-sm font-bold mb-2" 
            for="username"
          >
            Username
          </label>
          <input 
            id="username" 
            v-model="username" 
            required 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="Username"
          >
        </div>
        <div class="mb-6">
          <label 
            class="block text-grey-darker text-sm font-bold mb-2" 
            for="password"
          >
            Password
          </label>
          <input 
            id="password" 
            v-model="password" 
            required 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" 
            placeholder="******************"
          >
        </div>
        <div class="flex items-center justify-between">
          <button 
            type="submit" 
            class="text-white bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { signIn } from '../helpers/authHelper.js';

@Component({})
class Login extends Vue {
  username = 'Bains_t';
  password = 'testPass';
  isSubmitted = false;

  async handleFormSubmit() {
    console.log('form was sumbitted');
    const { username, password } = this;
    console.log(username, password);
    try {
      await signIn({ username, password });
      console.log('push');
      this.$router.push('/admin');
    } catch (error) {
      console.log(error);
    }
  }
}

export default Login;
</script>
