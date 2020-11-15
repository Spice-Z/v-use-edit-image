import { computed, ref, Ref } from "vue-demi";
import { useEventListener } from "@vueuse/core";
import { useSelectedArea } from "../shared/useSelectedArea";

export const useMaskCanvasInfo = (optoins: {
  canvasRef: Ref<HTMLCanvasElement | null>;
  // canvasRef should first argument
  cropAspectHeightRatio?: number;
  // options should have color.
}) => {
  const {
    resolvedSelectedArea,
    resetSelectedArea,
    isDragging,
    isOutside,
    area2CanvasArea,
  } = useSelectedArea(optoins.canvasRef, {
    ...(optoins.cropAspectHeightRatio
      ? { selectAspectHeightRatio: optoins.cropAspectHeightRatio }
      : {}),
  });

  const maskAreaStyle = computed(() => {
    return {
      top: `${resolvedSelectedArea.value.start.y}px`,
      left: `${resolvedSelectedArea.value.start.x}px`,
      width: `${resolvedSelectedArea.value.width}px`,
      height: `${resolvedSelectedArea.value.height}px`,
    };
  });

  type ISelectedArea = {
    start: {
      x: number;
      y: number;
    };
    width: number;
    height: number;
  };
  const maskAreas = ref<ISelectedArea[]>([]);
  const resetMaskAreas = () => {
    maskAreas.value = [];
    resetSelectedArea();
  };

  useEventListener("mouseup", (_) => {
    if (!isOutside.value) {
      maskAreas.value.push(Object.assign({}, resolvedSelectedArea.value));
    }
  });

  return {
    maskArea: resolvedSelectedArea.value,
    maskAreas,
    resetMaskAreas,
    isCropping: isDragging,
    area2CanvasArea,
    maskAreaStyle,
  };
};
