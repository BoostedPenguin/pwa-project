<template>
  <div>
    <user-posts :post="p" v-for="p in getPosts" v-bind:key="p.id"></user-posts>
    <div v-if="getPosts.length == 0">
      <v-card class="py-5 mx-5" elevation="5" color="blue-grey lighten-4">
        <p class="text-lg-h5 text-md-h3 mt-5">Welcome to your organization!</p>
        <p class="text-lg-h6 text-md-h3 mt-5">
          Feels a bit empty? Add your first post from the left menu.
        </p>
      </v-card>
    </div>
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