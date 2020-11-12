import { computed, reactive, Ref } from "vue-demi";
import { useEventListener } from "@vueuse/core";
import { useSelectedArea } from "../shared/useSelectedArea";

export const useMaskCanvasInfo = (optoins: {
  canvasRef: Ref<HTMLCanvasElement | null>;
  cropAspectHeightRatio?: number;
}) => {
  const { selectedArea, isDragging, isOutside } = useSelectedArea(
    optoins.canvasRef,
    {
      ...(optoins.cropAspectHeightRatio
        ? { selectAspectHeightRatio: optoins.cropAspectHeightRatio }
        : {}),
    }
  );

  const cropAreaStyle = computed(() => {
    return {
      top: `${selectedArea.start.y}px`,
      left: `${selectedArea.start.x}px`,
      width: `${selectedArea.width}px`,
      height: `${selectedArea.height}px`,
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
  const maskAreas = reactive<ISelectedArea[]>([]);

  useEventListener("mouseup", (_) => {
    if (!isOutside.value) {
      maskAreas.push(Object.assign({}, selectedArea));
    }
  });

  return {
    cropArea: selectedArea,
    isCropping: isDragging,
    maskAreas,
    cropAreaStyle,
  };
};
