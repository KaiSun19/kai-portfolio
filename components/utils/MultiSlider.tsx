"use client"

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface MultiSliderProps {
    total:number;
    colors?: string[];
    exerciseTypes: string[];
    points: Record<string, number>;
    setPoints: Dispatch<SetStateAction<{ chest: number; back: number; abs: number; other: number; }>>;
}

const MultiSlider = ({total, colors, exerciseTypes, points, setPoints}: MultiSliderProps) => {

    //0.0877
    const thumbMargin = 20/228;
    //the amount of points lost due to thumb margins
    const offsetMargin = 0.2077;

    const sliderTrackRef = useRef<HTMLDivElement>(null);
    const sliderTrackThumbOneRef = useRef<HTMLDivElement>(null);
    const sliderTrackThumbTwoRef = useRef<HTMLDivElement>(null);
    const sliderTrackThumbThreeRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const draggedThumb = useRef('');

    const [thumbPositionOne, setThumbPositionOne] = useState<number>((points.chest/total) * 100);
    const [thumbPositionTwo, setThumbPositionTwo] = useState<number>(((points.chest/total) + (points.abs/total)) * 100);
    const [thumbPositionThree, setThumbPositionThree] = useState<number>(((points.chest/total) + (points.abs/total) + (points.back/total)) * 100);

    const updateThumbPosition = (event: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      const track = sliderTrackRef.current;
      if (track) {
        const trackRect = track.getBoundingClientRect();
        const clickX = event.clientX - trackRect.left;
        let leftLimit;
        let rightLimit;
        let newPosition;
        switch(draggedThumb.current){
          case 'thumb-1':
            leftLimit = 0;
            rightLimit = parseFloat(sliderTrackThumbTwoRef.current?.style.left as string)/100
            newPosition = Math.min(Math.max(clickX / trackRect.width, leftLimit), rightLimit - thumbMargin);
            setThumbPositionOne(newPosition * 100); // Update thumb position in percentage
            break;
          case 'thumb-2':
            leftLimit = parseFloat(sliderTrackThumbOneRef.current?.style.left as string)/100
            rightLimit = parseFloat(sliderTrackThumbThreeRef.current?.style.left as string)/100
            newPosition = Math.min(Math.max(clickX / trackRect.width, leftLimit + thumbMargin), rightLimit - thumbMargin);
            setThumbPositionTwo(newPosition * 100);
            break;
          case 'thumb-3':
            leftLimit = parseFloat(sliderTrackThumbTwoRef.current?.style.left as string)/100
            rightLimit = 1
            newPosition = Math.min(Math.max(clickX / trackRect.width, leftLimit + thumbMargin), rightLimit - (thumbMargin/2));
            setThumbPositionThree(newPosition * 100);
            break;
          default:
            break;
        }
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if(isDragging.current){
        updateThumbPosition(event);
      }
    };

    const handleMouseUp = () => {
    // Remove event listeners when the mouse is released
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    isDragging.current = false;
    };

    const handleThumbClick = (event) => {
      draggedThumb.current = event.target.attributes.id.value
      isDragging.current = true;
      updateThumbPosition(event);
      document.addEventListener('mousemove',handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const getColorsWidth = (index) => {
      switch(index){
        case 0:
          return thumbPositionOne
        case 1:
          return thumbPositionTwo
        case 2:
          return thumbPositionThree
        case 3:
          return 100
        default: 
          return 0;
      }
    }

    const addRemainingPoints = (num) => {
      if(num > 0 ){
        const numToDivide = Object.values(points).filter((point) => point !== 0).length;
        return Math.ceil((total * offsetMargin) / numToDivide);
      }
      return 0;
    }

    const parseExercisePoints = (float , dcp = 3) => {
      const currentPoints = Math.ceil(Math.abs(parseFloat(float.toFixed(dcp))) * total);
      return currentPoints + addRemainingPoints(currentPoints)
    }

    useEffect(()=> {
      const rangeOne = thumbPositionOne/ 100;
      const rangeTwo = ((thumbPositionTwo - thumbPositionOne) / 100) - thumbMargin;
      const rangeThree = ((thumbPositionThree - thumbPositionTwo) / 100) - thumbMargin;
      const rangeFour = Math.abs(((100 - thumbPositionThree) / 100)) - (thumbMargin/2);
      setPoints({ chest : parseExercisePoints(rangeOne), abs: parseExercisePoints(rangeTwo), back: parseExercisePoints(rangeThree), other : parseExercisePoints(rangeFour)})
    }, [thumbPositionOne, thumbPositionTwo, thumbPositionThree]);

  return (
    <>
      <div className='w-full flex justify-around text-2xl mb-8 mt-8 font-bold gap-8'>
      {
        exerciseTypes.map((type : string, i) => {
        return (
          <div className='flex flex-col justify-center w-1/5'>
            <input type='number' className='bg-background border rounded-lg p-2 w-20 h-12 text-center' style={colors && {'borderColor' : `${colors[i]}`}} value={points[type]} />
            <span>{type}</span>
          </div>
        )
        })
      }
    </div>
      <div className='relative w-full h-[48px]' >
            <div ref={sliderTrackRef} className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded transform -translate-y-1/2"></div>
            {
              colors?.map((color, i) => {
                const widthAsPercentage = getColorsWidth(i);
                return(
                  <div className="absolute top-1/2 left-0 h-1 rounded-l transform -translate-y-1/2" style={{ 
                    width: `${widthAsPercentage}%`, 
                    backgroundColor : `${color}`,
                    zIndex: 110-widthAsPercentage
                  }}>
                  </div>
                )
              })
            }
            <div id='thumb-1' ref={sliderTrackThumbOneRef} style={{ left: `${thumbPositionOne}%`, zIndex : 100 }} onMouseDown={(e) => handleThumbClick(e)} className="absolute top-1/2 left-0 w-8 h-8 bg-white border border-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"></div>
            <div id='thumb-2' ref={sliderTrackThumbTwoRef} style={{ left: `${thumbPositionTwo}%`, zIndex : 100 }} onMouseDown={handleThumbClick} className="absolute top-1/2 left-0 w-8 h-8 bg-white border border-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"></div>
            <div id='thumb-3' ref={sliderTrackThumbThreeRef} style={{ left: `${thumbPositionThree}%`, zIndex : 100 }} onMouseDown={handleThumbClick} className="absolute top-1/2 left-0 w-8 h-8 bg-white border border-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"></div>
      </div>
    </>
  )
}

export default MultiSlider;