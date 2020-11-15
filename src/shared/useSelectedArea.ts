import { ref, reactive, Ref, computed } from "vue-demi";
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
  type IselectedArea = {
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
  const selectedArea = reactive<IselectedArea>(
    Object.assign({}, initialSelectedArea)
  );
  const resolvedSelectedArea = computed(
    (): IselectedArea => {
      const width =
        selectedArea.width < 0 ? selectedArea.width * -1 : selectedArea.width;
      const height =
        selectedArea.height < 0
          ? selectedArea.height * -1
          : selectedArea.height;
      const x =
        selectedArea.width < 0
          ? selectedArea.start.x - width
          : selectedArea.start.x;
      const y =
        selectedArea.height < 0
          ? selectedArea.start.y - height
          : selectedArea.start.y;
      return {
        start: {
          x,
          y,
        },
        width,
        height,
      };
    }
  );
  const area2CanvasArea = (area: IselectedArea) => {
    if (target.value === null) {
      return selectedArea;
    }
    const rect = target.value.getBoundingClientRect();
    const wRatio = target.value.width / rect.width;
    const hRatio = target.value.height / rect.height;

    return {
      start: {
        x: area.start.x * wRatio,
        y: area.start.y * hRatio,
      },
      width: area.width * wRatio,
      height: area.height * hRatio,
    };
  };

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
    resolvedSelectedArea,
    area2CanvasArea,
    isDragging,
    isOutside,
    targetPositionX: elementPositionX,
    targetPositionY: elementPositionY,
    targetHeight: elementHeight,
    targetWidth: elementWidth,
  };
};
