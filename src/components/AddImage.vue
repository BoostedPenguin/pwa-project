<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col xl="6">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col cols="6" class="text-left"> Upload image </v-col>
              <v-col cols="6" class="text-right"> Camera </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <div class="canvas-border">
              <p style="text-align: center">Preview</p>
              <canvas id="canvas"></canvas>
            </div>

            <v-row>
              <v-col sm="12">
                <v-text-field
                  v-model="imageData.title"
                  required
                  label="Title"
                ></v-text-field>
                <v-text-field
                  v-model="imageData.description"
                  label="Description (optional)"
                ></v-text-field>
                <v-file-input
                  accept="image/*"
                  label="Image upload"
                  @change="selectImage"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="uploadImage" block color="primary">Upload</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <camera v-if="openCamera" />
  </v-container>
</template>

<script>
import Camera from "./Camera";
export default {
  components: {
    Camera,
  },
  data() {
    return {
      imageData: {
        currentFile: undefined,
        title: "",
        description: "",
      },

      openCamera: false,
      base64: undefined,
    };
  },

  methods: {
    selectImage(file) {
      this.imageData.currentFile = file;
      this.loadImage();
    },
    uploadImage() {
      if (this.imageData.currentFile && this.imageData.title) {
        const { dispatch } = this.$store;
        dispatch("images/uploadImage", this.imageData);
      }
    },
    loadImage() {
      var file, fr, img;

      if (typeof window.FileReader !== "function") {
        write("The file API isn't supported on this browser yet.");
        return;
      }

      file = this.imageData.currentFile;
      fr = new FileReader();
      fr.onload = createImage;
      fr.readAsDataURL(file);

      function createImage() {
        img = new Image();
        img.onload = imageLoaded;
        img.src = fr.result;
      }

      function imageLoaded() {
        var canvas = document.getElementById("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        this.base64 = canvas.toDataURL("image/png");
      }

      function write(msg) {
        var p = document.createElement("p");
        p.innerHTML = msg;
        document.body.appendChild(p);
      }
    },
  },
};
</script>

<style>
.canvas-border {
  border: solid black 1px;
}
canvas {
  max-height: 200px;
}
</style>