type Props = {
  canvas: HTMLCanvasElement,
  decorationImage: HTMLImageElement,
  sizePer?: number,
  dxPer?: 'center' | 'right' | number,
  dyPer?: 'center' | 'bottom' | number,
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
    dxPer = 0,
    dyPer = 0,
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
       * (canvas.width / decorationImage.naturalWidth)) / 100) * sizePer;
  const dx = dxPer === 'center'
    ? (canvas.width / 2) - (dWidth / 2)
    : dxPer === 'right'
      ? canvas.width - dWidth
      : (canvas.width / 100) * dxPer;

  const dy = dyPer === 'center'
    ? (canvas.height / 2) - (dHeight / 2)
    : dyPer === 'bottom'
      ? canvas.height - dHeight
      : (canvas.height / 100) * dyPer;

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
