import { computed, ref, Ref } from "@vue/composition-api";
import { useEventListener } from "@vueuse/core";
import { useSelectedArea } from "../shared/useSelectedArea";
import { ISelectedArea } from "../shared/types";

export const useMaskInfo = (
  canvasRef: Ref<HTMLCanvasElement | null>,
  optoins: {
    // canvasRef should first argument
    aspectHeightRatio?: number;
    // options should have color.
  }
) => {
  const { resolvedSelectedArea, resetSelectedArea, isDragging, isOutside } =
    useSelectedArea(canvasRef, {
      ...(optoins.aspectHeightRatio
        ? { selectAspectHeightRatio: optoins.aspectHeightRatio }
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
    maskAreaStyle,
  };
};
