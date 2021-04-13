<template>
  <div>insert</div>
  <input
    type="file"
    name="originImage"
    accept="image/png, image/jpeg"
    @change="onFileChange"
  />
  <div class="canvas-container">
    <canvas ref="canvasRef" class="canvas" />
  </div>
  <textarea name="text" v-model="text" cols="30" rows="10"></textarea>
  <button @click="write">write</button>
  <img
    style="visibility: hidden"
    ref="originImageRef"
    :src="originImage"
    alt="uploaded image"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useEditImage } from "v-use-edit-image";
export default defineComponent({
  setup() {
    const { canvasRef, drawOriginImage, writeText } = useEditImage();
    const originImageRef = ref<null | HTMLImageElement>(null);
    const originImage = ref<string | ArrayBuffer | null | undefined>(null);
    const text = ref<string>("");
    
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

    const write = () => {
      console.log('write')
      writeText({
        fSize: 24,
        x: 0,
        y: "bottom",
        text: text.value,
        isTextAlignCenter: true,
      });
    };
    return {
      canvasRef,
      onFileChange,
      text,
      write,
      originImage,
      originImageRef,
    };
  },
});
</script>

<style></style>
