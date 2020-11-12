import { ref, reactive, Ref } from "vue-demi";
import { useMouseInElement, useEventListener } from "@vueuse/core";

export const useSelectedArea = (
  target: Ref<HTMLCanvasElement | null>,
  optoins?: {
    selectAspectHeightRatio?: number;
  }
) => {
  const { elementX, elementY, isOutside } = useMouseInElement(target);

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

    // リセット
    selectedArea.start = initialSelectedArea.start;
    selectedArea.width = initialSelectedArea.width;
    selectedArea.height = initialSelectedArea.height;

    if (isOutside.value) {
      return;
    }

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
  };
};
