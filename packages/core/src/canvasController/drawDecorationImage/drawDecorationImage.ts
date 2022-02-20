type Props = {
 canvas: HTMLCanvasElement,
 decorationImage: HTMLImageElement,
 sizePer: number,
 dxPer: 'auto' | 'right' | number,
 dyPer: 'auto' | 'right' | number,
}

  type Return = {
   dWidth: number;
   dHeight: number;
   dx: number;
   dy: number;
 };

export const drawDecorationImage = async (
  {
    canvas,
    decorationImage,
    sizePer = 100,
    dxPer = 'auto',
    dyPer = 'auto',
  }:Props,
): Promise<Return> => {
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error('cannot get ctx');
  }
  const sx = 0;
  const sy = 0;
  const sWidth = decorationImage.naturalWidth;
  const sHeight = decorationImage.naturalHeight;
  const dWidth = (canvas.width / 100) * sizePer;
  const dHeight = ((decorationImage.naturalHeight
       * (canvas.width / decorationImage.naturalWidth))
       / 100)
     * sizePer;
  const dx = dxPer === 'auto'
    ? (canvas.width / 100) * ((100 - sizePer) / 2)
    : dxPer === 'right'
      ? canvas.width - dWidth
      : (canvas.width / 100) * dxPer;

  const dy = dyPer === 'auto'
    ? canvas.height - dHeight - canvas.height * 0.05
    : dyPer === 'right'
      ? canvas.height - dHeight
      : (canvas.width / 100) * dyPer;

  await ctx.drawImage(
    decorationImage,
    sx,
    sy,
    sWidth,
    sHeight,
    dx,
    dy,
    dWidth,
    dHeight,
  );

  return {
    dWidth,
    dHeight,
    dx,
    dy,
  };
};
