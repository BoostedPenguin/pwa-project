<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col sm="12" md="8" xl="6">
        <v-card :loading="loading" class="mx-auto">
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
                src="https://americanindependent.com/wp-content/uploads/2019/01/AP_19014569142266-1068x721.jpg"
              ></v-img>
            </v-avatar>
            <span class="ml-2">Look at the office space</span>
          </v-card-title>
          <v-img
            contain
            height="250"
            src="https://www.coworker.com/mag/wp-content/uploads/2018/04/1104x777-1104x640.png"
          ></v-img>

          <v-card-text>
            <div>
              Some small description about the given topic above it's optional
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
};
</script>

<style>
</style>