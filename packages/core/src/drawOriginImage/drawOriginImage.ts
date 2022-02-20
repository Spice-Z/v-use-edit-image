type Props = {
 canvas: HTMLCanvasElement,
 image: HTMLImageElement,
 options?: {
   maxImageSide?: number;
 },
}

const _setCanvasSize = (canvas:HTMLCanvasElement, width: number, height: number) => {
  canvas.width = width;
  canvas.height = height;
};

export const drawOriginImage = async (
  {
    canvas,
    image,
    options,
  }:Props,
) => {
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;
  const shouldResize = options?.maxImageSide
   && (imageWidth > options.maxImageSide || imageHeight > options.maxImageSide);
  // TODO:refactor
  if (options?.maxImageSide && shouldResize) {
    if (imageWidth > imageHeight) {
      const resolvedWidth = options.maxImageSide;
      const resolvedHeight = imageHeight * (options.maxImageSide / imageWidth);
      _setCanvasSize(canvas, resolvedWidth, resolvedHeight);
    } else {
      const resolvedHeight = options.maxImageSide;
      const resolvedWidth = imageWidth * (options.maxImageSide / imageHeight);
      _setCanvasSize(canvas, resolvedWidth, resolvedHeight);
    }
  } else {
    _setCanvasSize(canvas, imageWidth, imageHeight);
  }
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error('cannot get context');
  }

  await ctx.drawImage(
    image,
    0,
    0,
    imageWidth,
    imageHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );
};
