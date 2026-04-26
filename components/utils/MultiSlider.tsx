"use client";

import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface MultiSliderProps {
  total: number;
  colors?: string[];
  exerciseTypes: string[];
  points: Record<string, number>;
  setPoints: Dispatch<
    SetStateAction<{
      chest: number;
      back: number;
      abs: number;
      shoulder: number;
    }>
  >;
}

const MultiSlider = ({
  total,
  colors,
  exerciseTypes,
  points,
  setPoints,
}: MultiSliderProps) => {
  //0.0877
  const thumbMargin = 20 / 228;
  //the amount of points lost due to thumb margins
  const offsetMargin = 0.2077;

  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const sliderTrackThumbOneRef = useRef<HTMLDivElement>(null);
  const sliderTrackThumbTwoRef = useRef<HTMLDivElement>(null);
  const sliderTrackThumbThreeRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const draggedThumb = useRef("");

  const [thumbPositionOne, setThumbPositionOne] = useState<number>(
    (points.chest / total) * 100,
  );
  const [thumbPositionTwo, setThumbPositionTwo] = useState<number>(
    (points.chest / total + points.abs / total) * 100,
  );
  const [thumbPositionThree, setThumbPositionThree] = useState<number>(
    (points.chest / total + points.abs / total + points.back / total) * 100,
  );

  const sliderColors =
    colors && colors.length > 0
      ? colors
      : ["#13ADC7", "#4C97CC", "#736FD2", "#945DD6"];

  const styles: Record<string, CSSProperties> = {
    pointsRow: {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      gap: "2rem",
      marginTop: "2rem",
      marginBottom: "2rem",
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    pointItem: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "20%",
    },
    pointInput: {
      backgroundColor: "#111621",
      border: "1px solid #6b3030",
      borderRadius: "0.5rem",
      padding: "0.5rem",
      width: "5rem",
      height: "3rem",
      textAlign: "center",
      color: "#ffffff",
    },
    pointLabel: {
      marginTop: "0.5rem",
      textTransform: "capitalize",
    },
    sliderContainer: {
      position: "relative",
      width: "100%",
      height: "64px",
    },
    track: {
      position: "absolute",
      top: "50%",
      left: 0,
      width: "100%",
      height: "4px",
      backgroundColor: "#d1d5db",
      borderRadius: "9999px",
      transform: "translateY(-50%)",
    },
    thumbBase: {
      position: "absolute",
      top: "50%",
      width: "32px",
      height: "32px",
      backgroundColor: "#ffffff",
      border: "1px solid #d1d5db",
      borderRadius: "9999px",
      transform: "translate(-50%, -50%)",
      cursor: "pointer",
      zIndex: 100,
    },
  };

  const getPointInputStyle = (index: number): CSSProperties => ({
    ...styles.pointInput,
    borderColor: sliderColors[index] || styles.pointInput.borderColor,
  });

  const getSegmentStyle = (
    widthAsPercentage: number,
    color: string,
  ): CSSProperties => ({
    position: "absolute",
    top: "50%",
    left: 0,
    height: "4px",
    transform: "translateY(-50%)",
    borderRadius: "9999px",
    width: `${widthAsPercentage}%`,
    backgroundColor: color,
    zIndex: 110 - widthAsPercentage,
  });

  const getThumbStyle = (left: number): CSSProperties => ({
    ...styles.thumbBase,
    left: `${left}%`,
  });

  const updateThumbPosition = (
    event: MouseEvent | React.MouseEvent<HTMLDivElement>,
  ) => {
    const track = sliderTrackRef.current;
    if (track) {
      const trackRect = track.getBoundingClientRect();
      const clickX = event.clientX - trackRect.left;
      let leftLimit;
      let rightLimit;
      let newPosition;
      switch (draggedThumb.current) {
        case "thumb-1":
          leftLimit = 0;
          rightLimit =
            parseFloat(sliderTrackThumbTwoRef.current?.style.left as string) /
            100;
          newPosition = Math.min(
            Math.max(clickX / trackRect.width, leftLimit),
            rightLimit - thumbMargin,
          );
          setThumbPositionOne(newPosition * 100); // Update thumb position in percentage
          break;
        case "thumb-2":
          leftLimit =
            parseFloat(sliderTrackThumbOneRef.current?.style.left as string) /
            100;
          rightLimit =
            parseFloat(sliderTrackThumbThreeRef.current?.style.left as string) /
            100;
          newPosition = Math.min(
            Math.max(clickX / trackRect.width, leftLimit + thumbMargin),
            rightLimit - thumbMargin,
          );
          setThumbPositionTwo(newPosition * 100);
          break;
        case "thumb-3":
          leftLimit =
            parseFloat(sliderTrackThumbTwoRef.current?.style.left as string) /
            100;
          rightLimit = 1;
          newPosition = Math.min(
            Math.max(clickX / trackRect.width, leftLimit + thumbMargin),
            rightLimit - thumbMargin / 2,
          );
          setThumbPositionThree(newPosition * 100);
          break;
        default:
          break;
      }
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging.current) {
      updateThumbPosition(event);
    }
  };

  const handleMouseUp = () => {
    // Remove event listeners when the mouse is released
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    isDragging.current = false;
  };

  const handleThumbClick = (event: React.MouseEvent<HTMLDivElement>) => {
    draggedThumb.current = event.currentTarget.id;
    isDragging.current = true;
    updateThumbPosition(event);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const getColorsWidth = (index) => {
    switch (index) {
      case 0:
        return thumbPositionOne;
      case 1:
        return thumbPositionTwo;
      case 2:
        return thumbPositionThree;
      case 3:
        return 100;
      default:
        return 0;
    }
  };

  const addRemainingPoints = (num) => {
    if (num > 0) {
      const numToDivide = Object.values(points).filter(
        (point) => point !== 0,
      ).length;
      return Math.ceil((total * offsetMargin) / numToDivide);
    }
    return 0;
  };

  const parseExercisePoints = (float, dcp = 3) => {
    const currentPoints = Math.ceil(
      Math.abs(parseFloat(float.toFixed(dcp))) * total,
    );
    return currentPoints + addRemainingPoints(currentPoints);
  };

  useEffect(() => {
    const rangeOne = thumbPositionOne / 100;
    const rangeTwo = (thumbPositionTwo - thumbPositionOne) / 100 - thumbMargin;
    const rangeThree =
      (thumbPositionThree - thumbPositionTwo) / 100 - thumbMargin;
    const rangeFour =
      Math.abs((100 - thumbPositionThree) / 100) - thumbMargin / 2;
    setPoints({
      chest: parseExercisePoints(rangeOne),
      abs: parseExercisePoints(rangeTwo),
      back: parseExercisePoints(rangeThree),
      shoulder: parseExercisePoints(rangeFour),
    });
  }, [thumbPositionOne, thumbPositionTwo, thumbPositionThree]);

  return (
    <>
      <div style={styles.pointsRow}>
        {exerciseTypes.map((type: string, i) => {
          return (
            <div key={type} style={styles.pointItem}>
              <input
                type="number"
                style={getPointInputStyle(i)}
                value={points[type]}
                readOnly
              />
              <span style={styles.pointLabel}>{type}</span>
            </div>
          );
        })}
      </div>
      <div style={styles.sliderContainer}>
        <div ref={sliderTrackRef} style={styles.track}></div>
        {sliderColors.map((color, i) => {
          const widthAsPercentage = getColorsWidth(i);
          return (
            <div
              key={i}
              style={getSegmentStyle(widthAsPercentage, color)}
            ></div>
          );
        })}
        <div
          id="thumb-1"
          ref={sliderTrackThumbOneRef}
          style={getThumbStyle(thumbPositionOne)}
          onMouseDown={handleThumbClick}
        ></div>
        <div
          id="thumb-2"
          ref={sliderTrackThumbTwoRef}
          style={getThumbStyle(thumbPositionTwo)}
          onMouseDown={handleThumbClick}
        ></div>
        <div
          id="thumb-3"
          ref={sliderTrackThumbThreeRef}
          style={getThumbStyle(thumbPositionThree)}
          onMouseDown={handleThumbClick}
        ></div>
      </div>
    </>
  );
};

export default MultiSlider;
