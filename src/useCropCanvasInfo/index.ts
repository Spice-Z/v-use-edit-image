import { ref, computed, reactive, Ref } from "vue-demi";
import { useMouse, useEventListener } from "@vueuse/core";

export const useCropCanvasInfo = (optoins: {
  canvasRef: Ref<HTMLCanvasElement | null>;
  cropAspectHeightRatio?: number;
}) => {
  const { x, y } = useMouse();
  const pageX = ref(window.pageXOffset);
  const pageY = ref(window.pageYOffset);

  const isCropping = ref<Boolean>(false);
  const cropArea = reactive({
    start: {
      x: 0,
      y: 0,
    },
    width: 0,
    height: 0,
  });

  const canvasDOMInfo = computed(() => {
    if (!optoins.canvasRef.value) {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
    }
    return {
      x: pageX.value + optoins.canvasRef.value.getBoundingClientRect().left,
      y: pageY.value + optoins.canvasRef.value.getBoundingClientRect().top,
      width: optoins.canvasRef.value.clientWidth,
      height: optoins.canvasRef.value.clientHeight,
    };
  });

  const mousePositionFromCanvas = computed(() => {
    return {
      x: x.value - canvasDOMInfo.value.x,
      y: y.value - canvasDOMInfo.value.y,
    };
  });

  const cropBoxColor = reactive({
    "background-color": "rgba(0,0,0,0)",
  });

  const hideBoxPositions = computed(() => {
    return {
      top: {
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: `${canvasDOMInfo.value.height - cropArea.start.y}px`,
      },
      left: {
        top: `${cropArea.start.y}px`,
        left: "0px",
        right: `${canvasDOMInfo.value.width - cropArea.start.x}px`,
        bottom: "0px",
      },
      right: {
        top: `${cropArea.start.y}px`,
        left: `${cropArea.start.x + cropArea.width}px`,
        right: "0px",
        bottom: "0px",
      },
      bottom: {
        top: `${cropArea.start.y + cropArea.height}px`,
        left: `${cropArea.start.x}px`,
        right: `${
          canvasDOMInfo.value.width - cropArea.start.x - cropArea.width
        }px`,
        bottom: "0px",
      },
    };
  });

  useEventListener("scroll", () => {
    pageX.value = window.pageXOffset;
    pageY.value = window.pageYOffset;
  });
  useEventListener("mousedown", (_) => {
    isCropping.value = true;
    if (
      mousePositionFromCanvas.value.x < 0 ||
      mousePositionFromCanvas.value.y < 0 ||
      mousePositionFromCanvas.value.x > canvasDOMInfo.value.width ||
      mousePositionFromCanvas.value.y > canvasDOMInfo.value.height
    ) {
      return;
    }
    cropBoxColor["background-color"] = "rgba(0,0,0,.25)";
    cropArea.start = {
      x: mousePositionFromCanvas.value.x,
      y: mousePositionFromCanvas.value.y,
    };
  });
  useEventListener("mousemove", (_) => {
    if (!isCropping.value) {
      return;
    }
    cropArea.width = mousePositionFromCanvas.value.x - cropArea.start.x;
    cropArea.height =
      optoins.cropAspectHeightRatio === undefined
        ? mousePositionFromCanvas.value.y - cropArea.start.y
        : cropArea.width * optoins.cropAspectHeightRatio;
  });
  useEventListener("mouseup", (_) => {
    isCropping.value = false;
  });

  return {
    cropArea,
    hideBoxPositions,
    isCropping,
    cropBoxColor,
  };
};
