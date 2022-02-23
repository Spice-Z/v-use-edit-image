// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { setCanvasSize } from './setCanvasSize';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  resources: 'usable',
});
global.document = dom.window.document;

describe('setCanvasSize', () => {
  it('', async () => {
    const canvas = document.createElement('canvas');
    setCanvasSize(canvas, 50, 100);
    expect(canvas.width).toBe(50);
    expect(canvas.height).toBe(100);
  });
});
