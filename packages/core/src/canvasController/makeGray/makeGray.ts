type Props = {
  canvas: HTMLCanvasElement
}

export const makeImageGray = ({ canvas }:Props) => {
  const cWidth = canvas.width;
  const cHeight = canvas.height;
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    return;
  }
  const image = ctx.getImageData(0, 0, cWidth, cHeight);
  const dst = ctx.createImageData(cWidth, cHeight);
  for (let i = 0; i < cHeight; i++) {
    for (let j = 0; j < cWidth; j++) {
      const pix = (i * cWidth + j) * 4;
      /* Gray */
      const gray = 0.299 * image.data[pix]
       + 0.587 * image.data[pix + 1]
       + 0.114 * image.data[pix + 2];
      for (let k = 0; k < 3; k++) {
        dst.data[pix + k] = gray;
      }
      dst.data[pix + 3] = image.data[pix + 3];
    }
  }
  ctx.putImageData(dst, 0, 0);
};
