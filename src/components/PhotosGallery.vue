<template>
  <v-container>
    <v-row>
      <v-alert v-if="getError" dense outlined type="error">
        An unexpected error occurred. Please try again later.
      </v-alert>
      <v-alert v-if="getSuccess" dense outlined type="success">
        Successfully uploaded an image
      </v-alert>
      <v-col cols="12">
        <img v-if="photo" :key="photo.id" :src="photo.src" alt="Well" />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="imageData.title"
          required
          label="Title"
        ></v-text-field>
        <v-text-field
          v-model="imageData.description"
          label="Description (optional)"
        ></v-text-field>
        <v-row no-gutters>
          <v-btn class="mt-2 mb-5" @click="goBack" outlined> Go back </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mt-2 mb-5" @click="uploadImage" color="primary">
            Upload
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      imageData: {
        title: "",
        description: "",
        currentFile: "",
      },
    };
  },
  props: ["photo", "takingPicture"],
  computed: {
    getError() {
      return this.$store.state.images.errorUpload;
    },
    getSuccess() {
      return this.$store.state.images.successUpload;
    },
  },
  beforeDestroy() {
    this.$store.commit("images/resetStatus");
  },
  methods: {
    goBack() {
      this.$emit("update:takingPicture", true);
    },

    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
    uploadImage() {
      if (this.photo && this.imageData.title) {
        const { dispatch } = this.$store;
        this.imageData.currentFile = this.dataURLtoFile(
          this.photo.src,
          "image.png"
        );
        dispatch("images/uploadImage", this.imageData);
      }
    },
  },
};
</script>

<style scoped>
.list-animated-item {
  transition: opacity 0.5s;
}
.list-animated-enter {
  opacity: 0;
  /* transform: translateX(30px); */
}
img {
  max-height: 250px;
}
</style>