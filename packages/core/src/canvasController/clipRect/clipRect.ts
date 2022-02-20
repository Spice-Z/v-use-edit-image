import { setCanvasSize } from "../utils";


type Props = {
  canvas: HTMLCanvasElement,
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
};

export const clipRect = ({
  canvas, x, y, width, height, image,
}:Props) => {
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error('cannot get context');
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setCanvasSize(canvas, width, height);
  ctx.drawImage(
    image,
    x,
    y,
    width,
    height,
    0,
    0,
    width,
    height,
  );
};
