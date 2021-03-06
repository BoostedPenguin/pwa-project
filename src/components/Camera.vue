<template>
  <div>
    <div v-if="takingPicture">
      <div v-show="videoDevices.length > 0" class="container">
        <v-row class="justify-center">
          <video
            class="video"
            :class="facingMode === 'user' ? 'front' : ''"
            ref="video"
          />
          <canvas style="display: none" ref="canva" />
        </v-row>

        <v-row class="justify-center mt-4">
          <v-btn elevation="2" outlined @click="TakePhoto">Shoot</v-btn>
        </v-row>
      </div>
      <div v-show="videoDevices == 0">No camera on this device</div>
    </div>
    <photos-gallery
      v-else-if="!takingPicture"
      class="gallery"
      :photo="photo"
      :takingPicture.sync="takingPicture"
    />
  </div>
</template>

<script>
import PhotosGallery from "./PhotosGallery.vue";
export default {
  components: {
    PhotosGallery,
  },
  data() {
    return {
      takingPicture: true,
      photo: null,
      mediaStream: null,
      videoDevices: [],
      facingMode: "environment",
      counter: 0,
      switchingCamera: false,
    };
  },

  watch: {
    takingPicture: {
      handler: function (oldValue, newValue) {
        if (newValue) {
          return this.StopRecording();
        }
        this.GetDevicesMounted();
      },
    },
  },
  beforeDestroy() {
    this.StopRecording();
  },
  methods: {
    StopRecording() {
      if (this.mediaStream == null) return;
      this.mediaStream.getTracks().forEach(function (track) {
        track.enabled = false;
        track.stop();
      });
      this.$refs.video = null;
      console.log(this.mediaStream.getTracks());
    },
    async StartRecording(facingMode) {
      this.facingMode = facingMode;
      let video = this.$refs.video;
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
      });
      video.srcObject = this.mediaStream;
      return await video.play();
    },
    async TakePhoto() {
      let video = this.$refs.video;
      let canva = this.$refs.canva;
      let width = video.videoWidth;
      let height = video.videoHeight;
      canva.width = width;
      canva.height = height;
      let ctx = canva.getContext("2d");
      ctx.save();
      if (this.facingMode === "user") {
        ctx.scale(-1, 1);
        ctx.drawImage(video, width * -1, 0, width, height);
      } else {
        ctx.drawImage(video, 0, 0);
      }
      ctx.restore();
      this.photo = {
        id: this.counter++,
        src: canva.toDataURL("image/png"),
      };
      this.takingPicture = false;
    },
    async switchCamera() {
      this.switchingCamera = true;
      const tracks = this.mediaStream.getVideoTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      await this.StartRecording(
        this.facingMode === "environment" ? "user" : "environment"
      );
      this.switchingCamera = false;
    },
    async GetDevicesMounted() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.videoDevices = devices.filter((d) => d.kind === "videoinput");

      if (this.videoDevices.length == 0) return;
      await this.StartRecording(
        this.videoDevices.length === 1 ? "user" : "environment"
      );
    },
  },
  async mounted() {
    await this.GetDevicesMounted();
  },
};
</script>

<style scoped>
.video.front {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.video {
  height: 100%;
  grid-column: left/right;
  grid-row: top / bottom;
  user-select: none;
  max-width: unset;
  overflow: hidden;
}
.switch-button {
  grid-column: bs / es;
  grid-row: bs / es;
  z-index: 5;
  border-radius: 100%;
  width: 6vh;
  height: 6vh;
  font-size: 2vh;
}
.photo-button-container {
  grid-column: left / right;
  grid-row: middle / bottom;
  z-index: 5;
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: center;
}
.photo-button {
  width: 10vh;
  height: 10vh;
  border-radius: 100%;
}
.photo-button {
  font-size: 4vh;
  color: black;
}
</style>