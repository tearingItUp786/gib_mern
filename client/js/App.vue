<template>
  <div class="full-width center-content">
    <h1 @click='addPosts'>Hello World!</h1>
    <ul v-for="(post,index) in posts" :key="index">
      <li>{{post}}</li>
    </ul>
  </div>
</template>;

<script>
import '../styles/index.css';

export default {
  name: 'app',
  data() {
    return {
      posts: []
    };
  },
  methods: {
    addPosts() {
      this.posts.push('cat');
    }
  }
};
</script>
