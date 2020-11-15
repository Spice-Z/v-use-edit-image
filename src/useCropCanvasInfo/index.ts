import { computed, reactive, Ref } from "vue-demi";
import { useEventListener } from "@vueuse/core";
import { useSelectedArea } from "../shared/useSelectedArea";

export const useCropCanvasInfo = (optoins: {
  canvasRef: Ref<HTMLCanvasElement | null>;
  cropAspectHeightRatio?: number;
}) => {
  const {
    selectedArea,
    area2CanvasArea,
    isDragging,
    isOutside,
    // targetPositionX,
    // targetPositionY,
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
        bottom: `${targetHeight.value - selectedArea.start.y}px`,
      },
      left: {
        top: `${selectedArea.start.y}px`,
        left: "0px",
        right: `${targetWidth.value - selectedArea.start.x}px`,
        bottom: "0px",
      },
      right: {
        top: `${selectedArea.start.y}px`,
        left: `${selectedArea.start.x + selectedArea.width}px`,
        right: "0px",
        bottom: "0px",
      },
      bottom: {
        top: `${selectedArea.start.y + selectedArea.height}px`,
        left: `${selectedArea.start.x}px`,
        right: `${
          targetWidth.value - selectedArea.start.x - selectedArea.width
        }px`,
        bottom: "0px",
      },
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
    cropArea: selectedArea,
    isCropping: isDragging,
    area2CanvasArea,
    hideBoxPositions,
    cropBoxColor,
  };
};
