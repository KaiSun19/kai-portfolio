"use client"

import { Container } from '@/layout/LayoutStyles';
import { Accordion, AccordionDetails, AccordionSummary, Slider, styled } from '@mui/material';
import React from 'react';
import { FaChevronDown } from "react-icons/fa";
import { BaseWorkout } from '@/constants/constants';

interface WorkoutPlan {
  type : string;
  workouts : Record<string, number>;
}

const WorkoutWidget = () => {


    const generateWorkout = () => {
        let plan: WorkoutPlan[] = [];
        BaseWorkout.map((workout, i) => {
          const workoutMap = {};
          let limit = workout.points;
          let current = 0;
          while(limit > current){
            let random_number = Math.floor(Math.random() * (workout.workouts.length)) + 0;
            let {name , reps, points } = workout.workouts[random_number];
            if(workoutMap[name]){
              workoutMap[name] += reps;
            }
            else{
              workoutMap[name] = reps;
            }
            current+= points;
          }
          plan.push({type : workout.type, workouts : workoutMap})
        })
        console.log(plan);
    };

    const StyledAccordionSummary = styled(AccordionSummary)({
      "& .MuiAccordionSummary-root":{
        backgroundColor : 'none'
      },

      "& .MuiAccordionSummary-content": {
        color: "#d4c0c0",
      },
      "& .MuiAccordionSummary-expandIconWrapper": {
        color: "#d4c0c0",
      }
    });

  return (
    (
      <Container className='p-4'>
        <div className="py-0 flex w-full justify-between items-center flex-col gap-4">
          <button onClick={generateWorkout} className="w-1/2 text-grayText text-2xl py-4 px-6 bg-lightRed rounded-[15px] transition duration-500 hover:bg-lightRedHover">
            Generate
          </button>
          <Accordion sx = {{background : 'none', boxShadow : 'none', width : '100%'}}>
            <StyledAccordionSummary expandIcon={<FaChevronDown />}>
              <p className='text-grayText'>Settings</p>
            </StyledAccordionSummary>
            <AccordionDetails className='text-grayText'>
              <p className='text-3xl float-left mb-8 font-bold'>
                Total points
              </p>
              <Slider defaultValue={130} step={10} marks min={100} max={200}valueLabelDisplay="auto"
                      className='mb-12 text-lightRed' />

              <p className='text-3xl float-left mb-8 font-bold'>
                Workouts Included
              </p>
              {
                BaseWorkout.map(workout => {
                  return(
                  <div className='flex w-full justify-between items-center gap-2 flex-col'>
                    <p className='tex-lg text-left mb-8 w-full'>{workout.type}</p>
                    <textarea
                      rows={5}
                      value={workout.workouts.map(item => item.name).toString()}
                      className="flex-1 bg-inherit border border-gray-400 rounded-[10px] w-full p-4 mb-4"
                    />
                  </div>
                  )
                })
              }
            </AccordionDetails>
          </Accordion>
        </div>
      </Container>
    )
  )
}

export default WorkoutWidget;