type OptionProps = {
  canvas: HTMLCanvasElement,
  text: string,
  fSize?: number;
  x?: number;
  y?: number | 'bottom';
  fonts?: string;
  strokeStyle?: string;
  lineWidth?: number;
  textAlign?: 'left' | 'right' | 'center' | 'start' | 'end';
  multilineTextAlign?:'top'|'center'|'bottom';
  color?: string;
  shouldShowShadow?: boolean;
  hasStroke?: false;
  backgroundColor?: string;
};

export const writeText = (
  {
    canvas,
    text,
    fSize = 24,
    x = 0,
    y = 0,
    fonts = '"ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", "Meiryo", "verdana", sans-serif',
    strokeStyle = '#000',
    lineWidth = 0,
    textAlign = 'start',
    multilineTextAlign = 'center',
    color = '#000',
    shouldShowShadow = false,
    hasStroke = false,
    backgroundColor = 'transparent',
  }: OptionProps,
) => {
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    throw new Error('cannot get ctx');
  }

  ctx.font = `bold ${fSize}px ${fonts}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = textAlign;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  const basePosY = y === 'bottom' ? canvas.height - fSize : y;
  if (shouldShowShadow) {
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  } else {
    ctx.shadowColor = 'none';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  const lineHeight = fSize * 1.1618;
  const renderdTexts:string[] = [];
  text.split('\n').forEach((t, i, all) => {
    const allLineCount = all.length;
    let y = 0;
    if (multilineTextAlign === 'center' && allLineCount > 1) {
      y = basePosY - lineHeight * (allLineCount - (i + 1)) + lineHeight * (allLineCount / 2);
    } else if (multilineTextAlign === 'top' && allLineCount > 1) {
      y = basePosY + lineHeight * (i);
    } else {
      y = basePosY - lineHeight * (allLineCount - (i + 1));
    }
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      const bgW = ctx.measureText(t).width * 1.1;
      ctx.fillRect(x - bgW / 2, y - lineHeight / 2, bgW, lineHeight);
    }

    ctx.fillStyle = color;
    ctx.fillText(t, x, y);
    if (hasStroke) {
      ctx.strokeText(t, x, y);
    }
    renderdTexts.push(t);
  });

  return { renderdTexts };
};
