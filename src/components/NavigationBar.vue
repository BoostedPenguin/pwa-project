<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.mobile"
        @click.stop="mobile_drawer_left = !mobile_drawer_left"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="top-nav-icon">
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn
          icon
          v-show="$vuetify.breakpoint.mobile"
          @click.stop="mobile_drawer_right = !mobile_drawer_right"
        >
          <v-icon>mdi-account-multiple</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Left drawer -->
    <v-navigation-drawer
      v-model="mobile_drawer_left"
      absolute
      left
      :temporary="$vuetify.breakpoint.mobile"
      :permanent="!$vuetify.breakpoint.mobile"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Application </v-list-item-title>
          <v-list-item-subtitle> Settings </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Right drawer -->
    <v-navigation-drawer
      v-if="mobile_drawer_right || !$vuetify.breakpoint.mobile"
      v-model="mobile_drawer_right"
      absolute
      right
      class="right-nav"
      :temporary="$vuetify.breakpoint.mobile"
      :permanent="!$vuetify.breakpoint.mobile"
    >
      <v-list-item class="mt-5">
        <v-list-item-content>
          <v-list-item-title class="title"> Organization </v-list-item-title>
          <v-list-item-subtitle>
            <v-btn rounded class="mt-2 mb-5">
              Add participants
              <v-icon right>mdi-account-multiple-plus</v-icon>
            </v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list v-for="item in 5" :key="item" dense>
        <v-list-item link>
          <v-list-item-avatar>
            <v-img
              src="https://americanindependent.com/wp-content/uploads/2019/01/AP_19014569142266-1068x721.jpg"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Johny Silverhand</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Share image", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" },
      ],
      mobile_drawer_left: false,
      mobile_drawer_right: false,
      group: false,
    };
  },
  mounted() {},
};
</script>

<style scoped>
.top-nav-icon {
  opacity: 75%;
}
</style>