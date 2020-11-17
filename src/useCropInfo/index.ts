import { computed, reactive, Ref } from "vue-demi";
import { useEventListener } from "@vueuse/core";
import { useSelectedArea } from "../shared/useSelectedArea";

export const useCropInfo = (
  canvasRef: Ref<HTMLCanvasElement | null>,
  optoins: {
    aspectHeightRatio?: number;
  }
) => {
  const {
    resolvedSelectedArea,
    resetSelectedArea,
    isDragging,
    isOutside,
    targetHeight,
    targetWidth,
  } = useSelectedArea(canvasRef, {
    ...(optoins.aspectHeightRatio
      ? { selectAspectHeightRatio: optoins.aspectHeightRatio }
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
    resetCropArea: resetSelectedArea,
    cropAreaStyle,
    isCropping: isDragging,
    hideBoxPositions,
    cropBoxColor,
  };
};
