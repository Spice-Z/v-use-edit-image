/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { dataUrlToImage } from '../../../.jest/utils/dataUrlToImage';
import { drawOriginImage } from './drawOriginImage';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  resources: 'usable',
});
global.document = dom.window.document;

describe('drawOriginImage', () => {
  it('draw original size', async () => {
    const canvas = document.createElement('canvas');

    const image = await dataUrlToImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAFVBMVEUAAAD///8/Pz+/v78fHx9/f3+fn5/z3jLhAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVQokWNgGKZA2RgMFFAEXUNDA1NDQx3QFTsqoIuMCtJHcLgAACjwCtfPR6QgAAAAAElFTkSuQmCC');

    drawOriginImage({ canvas, image });

    expect(canvas.width).toBe(image.naturalWidth);
    expect(canvas.height).toBe(image.naturalHeight);
    // expect(canvas.toDataURL()).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAAh0lEQVRYhe3YsQ3AIAxE0UuUPRjFq3kURoFNvIlTpUsUkUMKxT3JpeEXVGwAEgvb/w54o0CWAlkKZCmQdYwumBncffgid0fvfXhvODAi0Fp7jKi1IiJu977KGVNKycxMM5ty3jXLv0EFshTIUiBLgSwFshTIUiBLgawN+t3iKJClQJYCWQpknbE0Qb5wBXcxAAAAAElFTkSuQmCC');
  });

  it('draw resized', async () => {
    const canvas = document.createElement('canvas');

    const image = await dataUrlToImage('data:image/png;base64,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');

    await drawOriginImage({ canvas, image, options: { maxImageSide: 11 } });

    expect(canvas.width).toBe(11);
    expect(canvas.height).toBe(11);
    // expect(canvas.toDataURL()).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABmJLR0QA/wD/AP+gvaeTAAAA3klEQVQYlU2Qu04DMRREz1j7//9CkxYJJApogERChIJmi2gVIBLawD5yh8L2LpWlsX3OnSvbNkYI20hgq5wGCWEwJAwCSo4NyEDOAYxAkIyXCNdrYcCVirFF4p92ITprlRHImdxUmb1q6zMjZDFeJl4PLQ2lHEWbp8oGR3Dsv7l923G939LIK0zFbefv/fjLZvvA1eMd3emDZK1j1OaSGS4TT+07m9093elIRJBEKSYVogFxHgdu9s90p0/CgYC0FgHJxWCGeeLl0DLP07KNZGtZRR0FYArz9dMTEUv2B8NfkalcRT/OAAAAAElFTkSuQmCC');
  });
});
