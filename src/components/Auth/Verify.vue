<template>
  <v-container fluid class="main-background">
    <transition name="fade" mode="out-in">
      <v-row key="2" class="justify-center">
        <v-col cols="12" sm="7" md="6">
          <v-card class="py-5" elevation="2">
            <v-card-actions>
              <v-row>
                <v-col cols="12" class="mt-5 text-left headline">
                  Confirm account
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
                <v-col cols="12" sm="12">
                  <v-text-field
                    type="password"
                    v-model="repeatPassword"
                    counter="50"
                    required
                    :rules="[rules.required, rules.counter]"
                    label="Repeat password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-actions>
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn
                  @click="sendVerificationRequest"
                  color="secondary"
                  class="ma-2"
                >
                  <v-icon left dark> mdi-plus </v-icon>
                  CREATE
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
export default {
  name: "Verify",
  data() {
    return {
      repeatPassword: "",
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => {
          if (value) return value.length < 50 || "Max 50 characters";
          return false;
        },
      },
    };
  },
  methods: {
    sendVerificationRequest() {
      if (
        this.repeatPassword &&
        this.password &&
        this.repeatPassword === this.password
      ) {
        const { dispatch } = this.$store;

        let password = this.password;
        let inviteToken = this.$router.currentRoute.params.token;

        const data = { password, inviteToken };

        dispatch("authentication/verifyAccount", data);
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