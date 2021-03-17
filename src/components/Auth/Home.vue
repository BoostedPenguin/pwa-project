<template>
  <v-container fluid class="main-background">
    <transition name="fade" mode="out-in">
      <v-row key="1" v-if="currentPage == 0" class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../../assets/main-logo.png')"
            class="my-3"
            contain
            height="200"
          />
          <h1 class="display-1 mb-3 white--text">Project Name</h1>
          <v-row class="text-center mt-16">
            <v-col cols="12">
              <v-btn
                x-large
                color="secondary"
                class="ma-2 white--text"
                @click="currentPage = 1"
              >
                <v-icon left dark> mdi-plus </v-icon>
                CREATE ORGANIZATION
              </v-btn>
            </v-col>
          </v-row>
          <v-btn to="login" color="white" x-large class="mt-2">Login</v-btn>
        </v-col>
      </v-row>

      <v-row key="2" class="justify-center" v-if="currentPage == 1">
        <v-col cols="12" sm="7" md="6">
          <v-card class="py-5" elevation="2">
            <v-card-actions>
              <v-row>
                <v-col cols="12" sm="12">
                  <div class="text-left headline">Organization</div>
                  <v-text-field
                    v-model="organizationData.organizationName"
                    :rules="[rules.required, rules.counter]"
                    counter="50"
                    maxlength="50"
                    label="Organization name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="mt-5 text-left headline">
                  Your details
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    required
                    v-model="organizationData.firstName"
                    counter="50"
                    :rules="[rules.required, rules.counter]"
                    label="First name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    required
                    v-model="organizationData.lastName"
                    counter="50"
                    :rules="[rules.required, rules.counter]"
                    label="Last name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    required
                    v-model="organizationData.email"
                    counter="50"
                    :rules="[rules.required, rules.email]"
                    label="Email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    type="password"
                    required
                    v-model="organizationData.password"
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
              <v-col cols="6" class="text-left">
                <v-btn outlined class="ma-2" @click="currentPage = 0">
                  <v-icon left dark> mdi-arrow-left </v-icon>
                  Back
                </v-btn>
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn
                  color="secondary"
                  class="ma-2"
                  @click="handleOrganizationCreate"
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

    <!-- <v-footer color="accent" padless fixed>
      <v-card flat tile width="100%" class="accent text-center">
        <v-card-text>
          <v-btn icon class="mx-4" small
            ><v-icon>mdi-information</v-icon></v-btn
          >
          <v-btn icon class="mx-4" small><v-icon>mdi-newspaper</v-icon></v-btn>
          <v-btn icon class="mx-4" small><v-icon>mdi-paperclip</v-icon></v-btn>
        </v-card-text>
      </v-card>
    </v-footer> -->
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      organizationData: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        organizationName: "",
      },
      repeatPassword: "",
      currentPage: 0,
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
  methods: {
    handleOrganizationCreate() {
      // Handle later :)
      if (this.repeatPassword !== this.organizationData.password) {
        return alert("Passwords don't match");
      }
      const { dispatch } = this.$store;

      if (
        this.organizationData.email &&
        this.organizationData.firstName &&
        this.organizationData.lastName &&
        this.organizationData.password &&
        this.organizationData.organizationName &&
        this.repeatPassword
      ) {
        dispatch("authentication/createOrganization", this.organizationData);
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