<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.mobile"
        @click.stop="mobile_drawer_left = !mobile_drawer_left"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="white">mdi-account-circle</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="white">mdi-bell</v-icon>
      </v-btn>
      <v-btn
        icon
        v-show="$vuetify.breakpoint.mobile"
        @click.stop="mobile_drawer_right = !mobile_drawer_right"
      >
        <v-icon color="white">mdi-account-multiple</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Left drawer -->
    <v-navigation-drawer
      color="#BDC2DF"
      v-model="mobile_drawer_left"
      fixed
      left
      app
      :temporary="$vuetify.breakpoint.mobile"
      :permanent="!$vuetify.breakpoint.mobile"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> PWA Application </v-list-item-title>
          <v-list-item-subtitle> Settings </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link @click="onHomePage">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Homepage</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="currentPage = 'AddImage'">
          <v-list-item-icon>
            <v-icon>mdi-image</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Upload image</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="currentPage = 'Camera'">
          <v-list-item-icon>
            <v-icon>mdi-camera</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Take a photo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/login">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Right drawer -->
    <v-navigation-drawer
      color="#BDC2DF"
      v-if="mobile_drawer_right || !$vuetify.breakpoint.mobile"
      v-model="mobile_drawer_right"
      fixed
      app
      right
      class="right-nav"
      :temporary="$vuetify.breakpoint.mobile"
      :permanent="!$vuetify.breakpoint.mobile"
    >
      <v-list-item class="mt-5">
        <v-list-item-content>
          <v-list-item-title class="title"> Organization </v-list-item-title>
          <v-list-item-subtitle>
            <v-btn
              v-if="getAdminStatus"
              @click="addingUserDialog = true"
              rounded
              class="mt-2 mb-5"
            >
              Add participants
              <v-icon right>mdi-account-multiple-plus</v-icon>
            </v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list v-for="item in getOrganizationParticipants" :key="item.id" dense>
        <v-list-item link>
          <v-list-item-avatar>
            <v-img
              src="https://image-cdn.essentiallysports.com/wp-content/uploads/20201011203851/cyberpunk2077-credit-cdprojektred%402000x1270-1-1110x705.jpg"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{
              `${item.firstName} ${item.lastName}`
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <!-- Adding user -->
    <v-dialog v-model="addingUserDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add a new participant</span>
        </v-card-title>
        <v-card-text>
          <p class="text-left red--text" v-show="addingUserRequired">
            {{ addingUserError }}
          </p>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="addingUser.firstName"
                  label="First name*"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="addingUser.lastName"
                  label="Last name*"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="addingUser.email"
                  label="Email*"
                  :rules="[rules.required, rules.email]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="addingUserDialog = false">
            Close
          </v-btn>
          <v-btn color="primary" @click="AddUser"> Get invite link </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- User invite link -->
    <v-dialog v-model="addingUserVerificationLinkDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Invite link</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <p>
              Send this invite link to the user so he can confirm his identity.
            </p>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  ref="inviteLink"
                  :value="addingUserVerificationLink"
                  label="Verification link"
                  outlined
                  append-icon="mdi-content-copy"
                  @click:append="copyURL"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="addingUserDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-alert v-if="!getInternetStatus" dense outlined type="error">
      There seems to be a problem with your connection to the server. Currently
      browsing history mode.
    </v-alert>

    <!-- Main content interface  -->
    <transition name="fade" mode="out-in">
      <component v-bind:is="currentComponent" />
    </transition>
  </v-container>
</template>

<script>
import { userService } from "../_services/user.service";
import AddImage from "./AddImage.vue";
import ShowPosts from "./ShowPosts.vue";
import Camera from "./Camera.vue";

export default {
  components: {
    AddImage,
    ShowPosts,
    Camera,
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",

        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      mobile_drawer_left: false,
      mobile_drawer_right: false,
      group: false,
      lastState: !this.$vuetify.breakpoint.mobile,

      // Current page
      currentPage: "ShowPosts",

      // Adding user
      addingUserDialog: false,
      addingUser: {
        email: "",
        firstName: "",
        lastName: "",
      },
      addingUserRequired: false,
      addingUserError: "",

      addingUserVerificationLinkDialog: false,
      addingUserVerificationLink: "",
    };
  },
  mounted() {
    this.$store.dispatch("organization/getOrganization");
  },
  computed: {
    currentComponent() {
      return this.currentPage;
    },
    getAdminStatus() {
      return this.$store.state.authentication.user.admin;
    },
    getInternetStatus() {
      return this.$store.state.organization.status;
    },
    getOrganizationParticipants() {
      return this.$store.state.organization.users;
    },
  },
  methods: {
    onHomePage() {
      if (this.currentPage == "ShowPosts") return;
      this.$store.dispatch("organization/getOrganization");
      this.currentPage = "ShowPosts";
    },
    copyURL() {
      navigator.clipboard.writeText(this.addingUserVerificationLink);
    },
    AddUser() {
      if (
        this.addingUser.email &&
        this.addingUser.firstName &&
        this.addingUser.lastName
      )
        userService
          .addUser(this.addingUser)
          .then((response) => {
            this.addingUserRequired = false;
            this.addingUserDialog = false;
            this.addingUserVerificationLinkDialog = true;
            this.addingUserVerificationLink = `${process.env.VUE_APP_BASE_FRONTEND_ROOT}#/account/verify/${response}`;
          })
          .catch((error) => {
            this.addingUserError = error;
            this.addingUserRequired = true;
          });
      else {
        this.addingUserRequired = true;
        this.addingUserError =
          "Please fill out all of the fields before submitting";
      }
    },
  },
};
</script>

<style scoped>
.top-nav-icon {
  opacity: 75%;
}
</style>