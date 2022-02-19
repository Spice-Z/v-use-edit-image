<template>
  <div>
    <p>Choose example</p>
    <button @click="showMask">Mask</button>
    <button @click="showCrop">Crop</button>
    <button @click="showInsert">Insert</button>
  </div>
  <MaskImage v-if="shouldShowMask" />
  <CropImage v-else-if="shouldShowCrop" />
  <Insert v-else-if="shouldShowInsert" />
</template>

<script>
import MaskImage from "./components/MaskImage.vue";
import CropImage from "./components/CropImage.vue";
import Insert from "./components/Insert.vue";

export default {
  name: "App",
  components: {
    MaskImage,
    CropImage,
    Insert,
  },
  data() {
    return {
      example: "mask",
    };
  },
  computed: {
    shouldShowMask() {
      return this.example === "mask";
    },
    shouldShowCrop() {
      return this.example === "crop";
    },
    shouldShowInsert() {
      return this.example === "insert";
    },
  },
  methods: {
    showMask() {
      this.example = "mask";
    },
    showCrop() {
      this.example = "crop";
    },
    showInsert() {
      this.example = "insert";
    },
  },
};
</script>
