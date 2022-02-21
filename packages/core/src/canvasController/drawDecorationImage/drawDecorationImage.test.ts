// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { dataUrlToImage } from '../../../.jest/utils/dataUrlToImage';
import { drawDecorationImage } from './drawDecorationImage';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  resources: 'usable',
});
global.document = dom.window.document;

describe('drawDecorationImage', () => {
  const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAFVBMVEUAAAD///8/Pz+/v78fHx9/f3+fn5/z3jLhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVQokWNgGKZA2RgMFFAEXUNDA1NDQx3QFTsqoIuMCtJHcLgAACjwCtfPR6QgAAAAAElFTkSuQmCC';
  it('draw no option', async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;

    const image = await dataUrlToImage(base64Image);

    const result = await drawDecorationImage({ canvas, decorationImage: image });

    expect(canvas.toDataURL()).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABS0lEQVRoge3YMYqDQBSA4d+ZhRQBqwT0AGnS5ATJETxKzrBNbqYHsLIKpEtEk0qUhIm75RbKwuqGPOR97YzO/IyI6AFfTIB59wb+i4ZIoyHSaIg0GiKNhkjzMfRCYwxhGLLZbFgsFoM3cDqdyLKMoigG3wNGhFhrWS6XbLdbVqtV75z5fE4QBOR5Tl3XtG3bmRPHMefz+X0hz+eTPM9J05SyLDvjnuexXq/Z7XakacrxeKSu6868LMu43W5Dt/GzHiM+440xzGYzrLWdMd/3iaKIw+HAfr8njmOu12tnnnOOx+PRe1p/MfhEANq2pWma3jFrLff7HYCmaaiqiqqqxiz3q8m8tTREGg2RRkOk0RBpNEQaDZFGQ6TREGk0RJrJhFjg81U3d85xuVxIkoSiKHDOvWqpcb+DJJnMo6Uh0miINBoijYZIoyHSfANSiWmXYY60gAAAAABJRU5ErkJggg==');
    expect(result).toStrictEqual({
      dWidth: 50, dHeight: 50, dx: 0, dy: 0,
    });
  });
  it('draw with 50%', async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;

    const image = await dataUrlToImage(base64Image);

    const result = await drawDecorationImage({ canvas, decorationImage: image, sizePer: 50 });

    expect(canvas.toDataURL()).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAw0lEQVRoge3XsQmDQBiG4dcjiGLvAM7gKq7gOo7gFlfauISNSyhYWHgpAimNCZz8hO+Bqw65/y1OMQEC8SWxD3CxD7iLQqxRiDWPs82yLGnblqIoAHDOkec527YRwutl571nHMf4k35wGrIsC8MwkKYpAFVV0TQNXdex7zsA8zzHn/KicHXVdR36vg9Zll1+hnu+U/9zRxRijUKsUYg1CrHmq5B1XZmmieM4Ys3zswT96tqiEGsUIiIiIiIiIiIiIvL2BDFBP78/2yicAAAAAElFTkSuQmCC');
    expect(result).toStrictEqual({
      dWidth: 25, dHeight: 25, dx: 0, dy: 0,
    });
  });
  it('draw with 50% on center', async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;

    const image = await dataUrlToImage(base64Image);

    const result = await drawDecorationImage({
      canvas, decorationImage: image, sizePer: 50, dxPer: 'center', dyPer: 'center',
    });

    expect(canvas.toDataURL()).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABJ0lEQVRoge3YwWrCMBzH8W9jPHgSD96E4pNsb+able3sE4ggCl70ECqFWmqb7jAYzJPbEgju94Ee23++KaFQEBEREZFYsl/c8wK8Bl7HvTfgPfIMVsAQ+Vr9dFHmD0FJUUhqnibEhnzYeDwmz3MWiwWj0YgsyzDmc6/6vgfAOcdut+NyuYQcHTbEGMNsNiPPc6y1TCYTlsslTdOw3+/x3mOt5Xg8hhwLBA653W5st1tOpxPGGObzOdPpFOccRVHQ9z11XQd/GxA4xHtPWZaUZQlA27Y45zifzxwOB7quCznum6c57ApJjUJSo5DUKOQRXddRVRV1XTMMQ8xRYb/s96qqYr1e0zQN3vuYo+KGXK9XNptNzBFfdEZSo5DU/OsfdCIiIiLymA80eX674aZZQQAAAABJRU5ErkJggg==');
    expect(result).toStrictEqual({
      dWidth: 25, dHeight: 25, dx: 12.5, dy: 12.5,
    });
  });
  it('draw with 50% on right bottom', async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;

    const image = await dataUrlToImage(base64Image);

    const result = await drawDecorationImage({
      canvas, decorationImage: image, sizePer: 50, dxPer: 'right', dyPer: 'bottom',
    });

    expect(canvas.toDataURL()).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAvklEQVRoge3XsQ2DMBBG4RcrQiB6BmAGVmEF1mEEtqCkYQkalgCJgoJLkSpNRArwKfo/yaU5v8JIBhEREREREREREYnmcdMcu3pAuHrAXRTijUK8ecY+QFEUNE1DnucAhBDIsoxt2zB7/+z6vmccx6/fiR6yLAvDMJAkCQBlWVLXNW3bsu87APM8xzziBzu7qqqyrussTdPTewD7mzuiEG8U4o1CvFGIN+5C1nVlmiaO4/hpn5663ijEG4V48wLMgT+9FiEH1gAAAABJRU5ErkJggg==');
    expect(result).toStrictEqual({
      dWidth: 25, dHeight: 25, dx: 25, dy: 25,
    });
  });
});
