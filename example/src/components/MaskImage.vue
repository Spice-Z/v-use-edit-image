<template>
  <div>
    <h2>{{ title }}</h2>
    <input
      type="file"
      name="originImage"
      accept="image/png, image/jpeg"
      @change="onFileChange"
    />
    <div class="canvas-container">
      <!-- Need Canvas DOM -->
      <canvas ref="canvasRef" class="canvas" />
      <!-- You can sync current selected area with maskAreaStyle -->
      <div
        style="position: absolute; background: beige"
        :style="maskAreaStyle"
      />
      <!-- You can sync defined selected area with maskAreas -->
      <div
        v-for="maskArea in maskAreas"
        :key="`${maskArea.start.x}-${maskArea.start.y}-${maskArea.width}-${maskArea.height}`"
        style="position: absolute; background: gray"
        :style="{
          top: `${maskArea.start.y}px`,
          left: `${maskArea.start.x}px`,
          width: `${maskArea.width}px`,
          height: `${maskArea.height}px`,
        }"
      />
    </div>
    <button @click="mask">Mask!</button>
    <img :src="maskedImage" class="masked-image" alt="masked image" />
  </div>
  <img
    style="visibility: hidden"
    ref="originImageRef"
    :src="originImage"
    alt="uploaded image"
  />
</template>

<script lang="ts">
import { useEditImage, useMaskInfo } from "v-use-edit-image";
import { defineComponent, ref, watchEffect } from "vue";
export default defineComponent({
  setup() {
    const {
      canvasRef,
      drawOriginImage,
      clipRect,
      drawShape,
      area2CanvasArea,
    } = useEditImage();
    const { maskAreaStyle, maskAreas, resetMaskAreas } = useMaskInfo(
      canvasRef,
      {}
    );

    const originImageRef = ref<null | HTMLImageElement>(null);
    const originImage = ref<string | ArrayBuffer | null | undefined>(null);
    const maskedImage = ref<string | null>(null);

    const uploadImage = (
      file: File
    ): Promise<string | ArrayBuffer | null | undefined> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result);
        };
        reader.readAsDataURL(file);
      });
    };
    const onFileChange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files as FileList;
      const image = await uploadImage(files[0]);
      originImage.value = image;

      setTimeout(() => {
        drawOriginImage(originImageRef, { maxImageSide: 1024 });
      }, 100);
    };
    const mask = () => {
      if (canvasRef.value === null) {
        return;
      }

      maskAreas.value.map((v) => {
        const targetArea = area2CanvasArea(v);
        const startX = targetArea.start.x;
        const startY = targetArea.start.y;
        const width = targetArea.width;
        const height = targetArea.height;

        // main
        const mainCoordinates = [
          { x: startX, y: startY },
          { x: startX + width, y: startY },
          { x: startX + width, y: startY + height },
          { x: startX, y: startY + height },
        ];
        const mainShape = {
          coordinates: mainCoordinates,
          color: "black",
          shouldStroke: false,
        };
        drawShape(mainShape);
      });
      maskedImage.value =
        canvasRef.value !== null ? canvasRef.value.toDataURL("image/jpeg") : "";
    };

    return {
      title: "maskimage",
      canvasRef,
      onFileChange,
      originImage,
      originImageRef,
      maskAreas,
      maskAreaStyle,
      mask,
      maskedImage,
    };
  },
});
</script>

<style scoped>
.canvas-container {
  display: block;
  width: fit-content;
  height: auto;
  max-width: 80%;
  margin: 24px auto;
  background-color: #f1f1f1;
  position: relative;
  cursor: crosshair;
}
.canvas {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 50vh;
  display: block;
}

.absolute {
  position: absolute;
}

.masked-image {
  height: auto;
  max-width: 80%;
  margin: 24px auto;
}
</style>
