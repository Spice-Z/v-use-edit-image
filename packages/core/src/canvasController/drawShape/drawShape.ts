type Props = {
 canvas: HTMLCanvasElement,
 coordinates: { x: number; y: number }[];
 color?: string;
 shouldStroke?: Boolean;
 lineWidth?: number;
};

export const drawShape = ({
  canvas,
  coordinates,
  color = '#000',
  shouldStroke = false,
  lineWidth = 4,
}: Props) => {
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error('cannot get context');
  }

  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  coordinates.forEach((v, i) => {
    if (i === 0) {
      ctx.moveTo(v.x, v.y);
      return;
    }
    ctx.lineTo(v.x, v.y);
  });
  ctx.closePath();

  if (shouldStroke) {
    ctx.strokeStyle = color;
    ctx.stroke();
  } else {
    ctx.fillStyle = color;
    ctx.fill();
  }
};
