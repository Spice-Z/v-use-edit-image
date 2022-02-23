// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { setCanvasSize } from '../utils';
import { writeText } from './writeText';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  resources: 'usable',
});
global.document = dom.window.document;

describe('setCanvasSize', () => {
  it('', async () => {
    const canvas = document.createElement('canvas');
    setCanvasSize(canvas, 100, 100);
    const result = writeText({ canvas, text: 'あい' });
    expect(result.renderdTexts).toEqual(['あい']);
  });

  it('multie lines', async () => {
    const canvas = document.createElement('canvas');
    setCanvasSize(canvas, 100, 100);
    const result = writeText({ canvas, text: 'あ\nい\nは', fSize: 100 });
    expect(result.renderdTexts).toEqual(['あ', 'い', 'は']);
  });

  // TODO: Mock context and test with toHaveBeenCalled to check text styles
});
