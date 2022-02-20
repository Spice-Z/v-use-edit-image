type Props = {
  canvas: HTMLCanvasElement,
  start: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
};

export const resize2CanvasSize = ({
  canvas,
  start,
  width,
  height,
}:Props) => {
  const rect = canvas.getBoundingClientRect();
  const wRatio = canvas.width / rect.width;
  const hRatio = canvas.height / rect.height;

  return {
    start: {
      x: start.x * wRatio,
      y: start.y * hRatio,
    },
    width: width * wRatio,
    height: height * hRatio,
  };
};
