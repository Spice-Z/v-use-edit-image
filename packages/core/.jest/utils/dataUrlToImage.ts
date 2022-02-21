export const dataUrlToImage = async (dataUrl):Promise<HTMLImageElement> => new Promise(((resolve) => {
  const img = document.createElement('img');
  img.crossOrigin = 'Anonymous';

  img.onload = function () {
    resolve(img);
  };

  img.src = dataUrl;
}));