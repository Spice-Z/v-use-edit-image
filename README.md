# v-use-edit-image


<p>
<a href="https://www.npmjs.com/package/v-use-edit-image" target="__blank"><img alt="NPM Version" src="https://img.shields.io/npm/v/v-use-edit-image"/></a>
</p>

v-use-edit-image is a Vue Composition API library for editing image with canvas API.

## 🚀 Installation

Use the package manager [npm](https://www.npmjs.com/package/v-use-edit-image) to install v-use-edit-image.

```bash
$ npm i v-use-edit-image
```

**You also have to install [Composition API](https://github.com/vuejs/composition-api) library if you use Vue 2.x**

## ✏️ Usage

Currently, `v-use-edit-image` has 3 methods.

```ts
import { useEditImage, useCropInfo } from 'v-use-edit-image'

export default defineComponent({
  setup(props, context) {
    const originImageRef = ref(null)
    const originImage = ref(null)

    const { canvasRef, drawOriginImage, clipRect, area2CanvasArea } = useEditImage()
    const { cropArea, cropAreaStyle, hideBoxPositions } = useCropInfo(canvasRef, {})

    const createImage = (file: File): Promise<string | ArrayBuffer | null | undefined> => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          resolve(e.target?.result)
        }
        reader.readAsDataURL(file)
      })
    }

    const onFileChange = async (e) => {
      const target = e.target
      const files = target.files
      if (files.lenfth <= 0) {
        return
      }
      originImage.value = await createImage(files[0])
    }

    const crop = () => {
      if (canvasRef.value === null) {
        return
      }
      const targetArea = area2CanvasArea(cropArea.value)
      const prop = {
        x: targetArea.start.x,
        y: targetArea.start.y,
        width: targetArea.width,
        height: targetArea.height,
        imageRef: originImageRef,
      }
      clipRect(prop)
      originImage.value = canvasRef.value !== null ? canvasRef.value.toDataURL('image/jpeg') : ''
    }

    return {
      canvasRef,
      onFileChange,
      originImage,
      originImageRef,
      hideBoxPositions,
      cropAreaStyle,
      crop,
    }
  },
})

```

## 📚 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## 👓 License
[MIT](https://choosealicense.com/licenses/mit/)