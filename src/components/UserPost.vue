<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col sm="12" md="8" xl="6">
        <v-card :loading="loading" elevation="5" class="mx-auto">
          <template slot="progress">
            <v-progress-linear
              color="secondary"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-title>
            <v-avatar>
              <v-img
                src="https://image-cdn.essentiallysports.com/wp-content/uploads/20201011203851/cyberpunk2077-credit-cdprojektred%402000x1270-1-1110x705.jpg"
              ></v-img>
            </v-avatar>
            <span class="ml-2">{{ post.title }}</span>
          </v-card-title>
          <v-img max-height="300px" contain :src="post.url"></v-img>

          <v-card-text>
            <div>
              {{ post.description }}
            </div>
          </v-card-text>

          <div class="d-flex caption justify-space-between mx-5 mt-4 mb-1">
            <span>500 Likes</span>
            <span>500 Comments</span>
          </div>
          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-row no-gutters>
              <v-col>
                <v-btn block>
                  <v-icon left dark> mdi-thumb-up </v-icon>
                  Like
                </v-btn>
              </v-col>
              <v-col>
                <v-btn block>
                  <v-icon left dark> mdi-message-reply-text </v-icon>
                  Comment
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  props: ["post"],
};
</script>

<style>
</style>