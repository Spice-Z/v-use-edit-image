import { ref, Ref } from "vue-demi";
import { ISelectedArea } from "../shared/types";

type writeTextProps = {
  fSize: number;
  x: number;
  y: number | "bottom";
  text: string;
  strokeStyle?: string;
  lineWidth?: number;
  isTextAlignCenter?: boolean;
  color?: string;
  shouldShowShadow?: boolean;
  hasStroke?: false;
  backgroundColor?: string;
};

const write = (
  context: CanvasRenderingContext2D,
  props: Required<writeTextProps>,
  canvasHeight: number
) => {
  context.font = `bold ${props.fSize}px "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", "Meiryo", "verdana", sans-serif`;
  context.textBaseline = "middle";
  context.textAlign = props.isTextAlignCenter ? "center" : "start";
  context.strokeStyle = props.strokeStyle;
  context.lineWidth = props.lineWidth;
  const posY = props.y === "bottom" ? canvasHeight - props.fSize : props.y;
  if (props.shouldShowShadow) {
    context.shadowColor = "#000";
    context.shadowBlur = 6;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  } else {
    context.shadowColor = "none";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }

  const lineHeight = props.fSize * 1.1618;
  props.text.split("\n").forEach((t, i, a) => {
    const y = posY - lineHeight * (a.length - (i + 1));
    if (props.backgroundColor) {
      context.fillStyle = props.backgroundColor;
      const bgW = context.measureText(t).width * 1.1;
      context.fillRect(props.x - bgW / 2, y - lineHeight / 2, bgW, lineHeight);
    }

    context.fillStyle = props.color;
    context.fillText(t, props.x, y);
    if (props.hasStroke) {
      context.strokeText(t, props.x, y);
    }
  });
};

type drawShapeType = {
  coordinates: { x: number; y: number }[];
  color: string;
  shouldStroke: Boolean;
  lineWidth?: number;
};
const drawShapeToCanvas = (
  context: CanvasRenderingContext2D,
  props: Required<drawShapeType>
) => {
  context.lineWidth = props.lineWidth;
  context.beginPath();
  props.coordinates.forEach((v, i) => {
    if (i === 0) {
      context.moveTo(v.x, v.y);
      return;
    }
    context.lineTo(v.x, v.y);
  });
  context.closePath();

  if (props.shouldStroke) {
    context.strokeStyle = props.color;
    context.stroke();
  } else {
    context.fillStyle = props.color;
    context.fill();
  }
};

const setRect = (canvas: HTMLCanvasElement, x: number, y: number) => {
  canvas.width = x;
  canvas.height = y;
};

type ClipRectProp = {
  x: number;
  y: number;
  width: number;
  height: number;
  imageRef: Ref<HTMLImageElement>;
};

export const useEditImage = () => {
  const canvasRef = ref<null | HTMLCanvasElement>(null);

  const setCanvasRect = (x: number, y: number) => {
    if (canvasRef.value === null) {
      return;
    }
    setRect(canvasRef.value, x, y);
  };

  const drawOriginImage = async (imageRef: Ref<HTMLImageElement | null>) => {
    if (canvasRef.value === null || imageRef.value === null) {
      return;
    }
    const canvas = canvasRef.value;
    setCanvasRect(imageRef.value.naturalWidth, imageRef.value.naturalHeight);
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      return;
    }
    await ctx.drawImage(imageRef.value, 0, 0);
  };

  type drawDecorationImageReturn = {
    dWidth: number;
    dHeight: number;
    dx: number;
    dy: number;
  };
  const drawDecorationImage = async (
    decorationImageRef: Ref<HTMLImageElement | null>,
    sizePer: number = 100,
    dxPer: "auto" | "right" | number = "auto",
    dyPer: "auto" | "right" | number = "auto"
  ): Promise<drawDecorationImageReturn> => {
    if (canvasRef.value === null || decorationImageRef.value === null) {
      return {
        dWidth: 0,
        dHeight: 0,
        dx: 0,
        dy: 0,
      };
    }
    const ctx = canvasRef.value.getContext("2d");
    if (ctx === null) {
      return {
        dWidth: 0,
        dHeight: 0,
        dx: 0,
        dy: 0,
      };
    }
    const sx = 0;
    const sy = 0;
    const sWidth = decorationImageRef.value.naturalWidth;
    const sHeight = decorationImageRef.value.naturalHeight;
    const dWidth = (canvasRef.value.width / 100) * sizePer;
    const dHeight =
      ((decorationImageRef.value.naturalHeight *
        (canvasRef.value.width / decorationImageRef.value.naturalWidth)) /
        100) *
      sizePer;
    const dx =
      dxPer === "auto"
        ? (canvasRef.value.width / 100) * ((100 - sizePer) / 2)
        : dxPer === "right"
        ? canvasRef.value.width - dWidth
        : (canvasRef.value.width / 100) * dxPer;
    const dy =
      dyPer === "auto"
        ? canvasRef.value.height - dHeight - canvasRef.value.height * 0.05
        : dyPer === "right"
        ? canvasRef.value.height - dHeight
        : (canvasRef.value.width / 100) * dyPer;
    await ctx.drawImage(
      decorationImageRef.value,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );

    return {
      dWidth,
      dHeight,
      dx,
      dy,
    };
  };

  const writeText = ({
    fSize = 62,
    x = 100,
    y = 100,
    text = "",
    strokeStyle = "#000",
    lineWidth = 0,
    isTextAlignCenter = false,
    color = "#000",
    shouldShowShadow = false,
    hasStroke = false,
    backgroundColor = "transparent",
  }: writeTextProps) => {
    if (canvasRef.value === null) {
      return;
    }
    const canvas = canvasRef.value;
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      return;
    }
    const props: Required<writeTextProps> = {
      fSize,
      x,
      y,
      text,
      strokeStyle,
      lineWidth,
      isTextAlignCenter,
      color,
      shouldShowShadow,
      hasStroke,
      backgroundColor,
    };
    write(ctx, props, canvas.height);
  };

  const drawShape = ({
    coordinates,
    color,
    shouldStroke = false,
    lineWidth = 4,
  }: drawShapeType) => {
    if (canvasRef.value === null) {
      return;
    }
    const canvas = canvasRef.value;
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      return;
    }

    const props = {
      coordinates,
      color,
      shouldStroke,
      lineWidth,
    };
    drawShapeToCanvas(ctx, props);
  };

  const makeImageGraySepia = () => {
    if (canvasRef.value === null) {
      return;
    }
    const cWidth = canvasRef.value.width;
    const cHeight = canvasRef.value.height;
    const ctx = canvasRef.value.getContext("2d");
    if (ctx === null) {
      return;
    }
    const image = ctx.getImageData(0, 0, cWidth, cHeight);
    const dst = ctx.createImageData(cWidth, cHeight);
    for (let i = 0; i < cHeight; i++) {
      for (let j = 0; j < cWidth; j++) {
        const pix = (i * cWidth + j) * 4;
        /* Gray */
        const gray =
          0.299 * image.data[pix] +
          0.587 * image.data[pix + 1] +
          0.114 * image.data[pix + 2];
        for (let k = 0; k < 3; k++) {
          dst.data[pix + k] = image.data[pix + k] = gray;
        }
        /* Sepia */
        dst.data[pix] = (dst.data[pix] / 255) * 240;
        dst.data[pix + 1] = (dst.data[pix + 1] / 255) * 200;
        dst.data[pix + 2] = (dst.data[pix + 2] / 255) * 148;
        dst.data[pix + 3] = image.data[pix + 3];
      }
    }
    ctx.putImageData(dst, 0, 0);
  };

  const clipRect = (prop: ClipRectProp) => {
    if (canvasRef.value === null) {
      return;
    }
    const ctx = canvasRef.value.getContext("2d");
    if (ctx === null) {
      return;
    }
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    setRect(canvasRef.value, prop.width, prop.height);
    ctx.drawImage(
      prop.imageRef.value,
      prop.x,
      prop.y,
      prop.width,
      prop.height,
      0,
      0,
      prop.width,
      prop.height
    );
  };
  const area2CanvasArea = (area: ISelectedArea) => {
    if (canvasRef.value === null) {
      return area;
    }
    const canvas = canvasRef.value;

    const rect = canvas.getBoundingClientRect();
    const wRatio = canvas.width / rect.width;
    const hRatio = canvas.height / rect.height;

    return {
      start: {
        x: area.start.x * wRatio,
        y: area.start.y * hRatio,
      },
      width: area.width * wRatio,
      height: area.height * hRatio,
    };
  };

  return {
    canvasRef,
    setCanvasRect,
    drawOriginImage,
    drawDecorationImage,
    clipRect,
    drawShape,
    writeText,
    makeImageGraySepia,
    area2CanvasArea,
  };
};
