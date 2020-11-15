import { computed, reactive, Ref } from "vue-demi";
import { useEventListener } from "@vueuse/core";
import { useSelectedArea } from "../shared/useSelectedArea";

export const useCropCanvasInfo = (optoins: {
  canvasRef: Ref<HTMLCanvasElement | null>;
  cropAspectHeightRatio?: number;
}) => {
  const {
    resolvedSelectedArea,
    area2CanvasArea,
    isDragging,
    isOutside,
    targetHeight,
    targetWidth,
  } = useSelectedArea(optoins.canvasRef, {
    ...(optoins.cropAspectHeightRatio
      ? { selectAspectHeightRatio: optoins.cropAspectHeightRatio }
      : {}),
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
        bottom: `${targetHeight.value - resolvedSelectedArea.value.start.y}px`,
      },
      left: {
        top: `${resolvedSelectedArea.value.start.y}px`,
        left: "0px",
        right: `${targetWidth.value - resolvedSelectedArea.value.start.x}px`,
        bottom: "0px",
      },
      right: {
        top: `${resolvedSelectedArea.value.start.y}px`,
        left: `${
          resolvedSelectedArea.value.start.x + resolvedSelectedArea.value.width
        }px`,
        right: "0px",
        bottom: "0px",
      },
      bottom: {
        top: `${
          resolvedSelectedArea.value.start.y + resolvedSelectedArea.value.height
        }px`,
        left: `${resolvedSelectedArea.value.start.x}px`,
        right: `${
          targetWidth.value -
          resolvedSelectedArea.value.start.x -
          resolvedSelectedArea.value.width
        }px`,
        bottom: "0px",
      },
    };
  });
  const cropAreaStyle = computed(() => {
    return {
      top: `${resolvedSelectedArea.value.start.y}px`,
      left: `${resolvedSelectedArea.value.start.x}px`,
      width: `${resolvedSelectedArea.value.width}px`,
      height: `${resolvedSelectedArea.value.height}px`,
    };
  });

  useEventListener("mousedown", (_) => {
    // outside
    if (isOutside.value) {
      return;
    }
    cropBoxColor["background-color"] = "rgba(0,0,0,.25)";
  });

  return {
    cropArea: resolvedSelectedArea,
    cropAreaStyle,
    isCropping: isDragging,
    area2CanvasArea,
    hideBoxPositions,
    cropBoxColor,
  };
};
