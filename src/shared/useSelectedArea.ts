import { ref, reactive, Ref } from "vue-demi";
import { useMouseInElement, useEventListener } from "@vueuse/core";

export const useSelectedArea = (
  target: Ref<HTMLCanvasElement | null>,
  optoins?: {
    selectAspectHeightRatio?: number;
  }
) => {
  const {
    elementX,
    elementY,
    isOutside,
    elementPositionX,
    elementPositionY,
    elementHeight,
    elementWidth,
  } = useMouseInElement(target);

  const isDragging = ref<Boolean>(false);
  type selectedArea = {
    start: {
      x: number;
      y: number;
    };
    width: number;
    height: number;
  };
  const initialSelectedArea = {
    start: {
      x: 0,
      y: 0,
    },
    width: 0,
    height: 0,
  };
  const selectedArea = reactive<selectedArea>(
    Object.assign({}, initialSelectedArea)
  );

  useEventListener("mousedown", (_) => {
    isDragging.value = true;

    if (isOutside.value) {
      return;
    }

    // リセット
    selectedArea.width = initialSelectedArea.width;
    selectedArea.height = initialSelectedArea.height;
    selectedArea.start = {
      x: elementX.value,
      y: elementY.value,
    };
  });
  useEventListener("mousemove", (_) => {
    if (!isDragging.value) {
      return;
    }
    selectedArea.width = elementX.value - selectedArea.start.x;
    selectedArea.height =
      optoins?.selectAspectHeightRatio === undefined
        ? elementY.value - selectedArea.start.y
        : selectedArea.width * optoins.selectAspectHeightRatio;
  });
  useEventListener("mouseup", (_) => {
    isDragging.value = false;
  });

  return {
    selectedArea,
    isDragging,
    isOutside,
    targetPositionX: elementPositionX,
    targetPositionY: elementPositionY,
    targetHeight: elementHeight,
    targetWidth: elementWidth,
  };
};
