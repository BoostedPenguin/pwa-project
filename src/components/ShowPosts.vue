<template>
  <div>
    <user-posts :post="p" v-for="p in getPosts" v-bind:key="p.id"></user-posts>
  </div>
</template>

<script>
import UserPosts from "./UserPost.vue";
export default {
  components: {
    UserPosts,
  },
  computed: {
    getPosts() {
      return this.$store.state.images.images;
    },
  },
};
</script>

<style>
</style>