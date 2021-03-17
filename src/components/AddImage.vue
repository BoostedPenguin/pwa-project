<template>
  <div>
    <camera />
  </div>
</template>

<script>
import Camera from "./Camera";
export default {
  components: {
    Camera,
  },
  props: ["addImageDialog"],
};
</script>

<style>
</style>