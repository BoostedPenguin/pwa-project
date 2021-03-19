<template>
  <v-container fluid class="main-background">
    <v-row class="justify-center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="py-5" elevation="2">
          <v-card-actions>
            <v-row class="justify-center">
              <v-col cols="12" sm="12">
                <div class="headline">Login</div>
              </v-col>

              <v-col cols="12" sm="12">
                <v-text-field
                  required
                  v-model="email"
                  counter="50"
                  :rules="[rules.required, rules.email]"
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  type="password"
                  required
                  v-model="password"
                  counter="50"
                  :rules="[rules.required, rules.counter]"
                  label="Password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-row class="mt-5">
            <v-col cols="6" class="text-left">
              <v-btn to="/" outlined class="ma-2" @click="currentPage = 0">
                <v-icon left dark> mdi-arrow-left </v-icon>
                Back
              </v-btn>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn @click="handleSubmit" color="secondary" class="ma-2">
                <v-icon left dark> mdi-plus </v-icon>
                Login
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => {
          if (value) return value.length < 50 || "Max 50 characters";
          return false;
        },
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  computed: {
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
  },
  created() {
    // reset login status
    this.$store.dispatch("authentication/logout");
    localStorage.clear();
  },
  methods: {
    handleSubmit() {
      const { email, password } = this;
      const { dispatch } = this.$store;
      if (email && password) {
        dispatch("authentication/login", { email, password });
      }
    },
  },
};
</script>
<style>
body,
html .main-background {
  background-color: #3949ab;
  min-height: 100%;
}
</style>