# example
This example app is on [vite](https://github.com/vitejs/vite)

## 🏃‍♀️ Run
```bash
$ npm install
$ npm run dev
```

## 🎭 For Mask Image
Example component is `/src/components/MaskImage.vue`
Please check the component or read below step to mask image!

### Step to mask
0. Preare image.
1. Set `<camvas />` and draw orign image with `useEditImage`'s `canvasRef` and `drawOriginImage`.
2. Make container DOM arround `<canvas />`, and make some DOMs to render seleted ares with `useMaskInfo`'s `maskAreaStyle` and `maskAreas`.
3. Convert canvas data to image URL with canvas API(`toDataURL`)!
4. You can emit url or render image DOM.

#### Future Feature of Mask
- Delete selected area

## ⚔️ For Crop Image
WIP🔥