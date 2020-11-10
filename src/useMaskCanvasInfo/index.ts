import { ref, computed, reactive, Ref } from "vue-demi";
import { useMouseInElement, useEventListener } from "@vueuse/core";

export const useMaskCanvasInfo = (optoins: {
  canvasRef: Ref<HTMLCanvasElement | null>;
  cropAspectHeightRatio?: number;
}) => {
  const { elementX, elementY, isOutside } = useMouseInElement(
    optoins.canvasRef
  );

  const isCropping = ref<Boolean>(false);
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
  const cropArea = reactive<selectedArea>(initialSelectedArea);
  const cropAreaStyle = computed(() => {
    return {
      top: `${cropArea.start.y}px`,
      left: `${cropArea.start.x}px`,
      width: `${cropArea.width}px`,
      height: `${cropArea.height}px`,
    };
  });

  const maskAreas = reactive<selectedArea[]>([]);

  useEventListener("mousedown", (_) => {
    isCropping.value = true;
    if (isOutside.value) {
      return;
    }

    cropArea.start = {
      x: elementX.value,
      y: elementY.value,
    };
    // リセット
    cropArea.width = initialSelectedArea.width;
    cropArea.height = initialSelectedArea.height;
  });
  useEventListener("mousemove", (_) => {
    if (!isCropping.value) {
      return;
    }
    cropArea.width = elementX.value - cropArea.start.x;
    cropArea.height =
      optoins.cropAspectHeightRatio === undefined
        ? elementY.value - cropArea.start.y
        : cropArea.width * optoins.cropAspectHeightRatio;
  });
  useEventListener("mouseup", (_) => {
    isCropping.value = false;

    if (!isOutside.value) {
      maskAreas.push(Object.assign({}, cropArea));
    }
    // リセット
    cropArea.start = initialSelectedArea.start;
    cropArea.width = initialSelectedArea.width;
    cropArea.height = initialSelectedArea.height;
  });

  return {
    cropArea,
    isCropping,
    maskAreas,
    cropAreaStyle,
  };
};
