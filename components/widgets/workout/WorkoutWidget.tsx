"use client"

import { Container } from '@/layout/LayoutStyles';
import { Accordion, AccordionDetails, AccordionSummary, Slider, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaMinus } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BaseWorkout } from '@/constants/constants';
import AlertFlash from '@/components/Alert/Alert';

export interface WorkoutPlan {
  type : string;
  workouts : Record<string, number>;
  points : number;
};

export interface Exercise {
  name : string;
  reps : number;
  points : number;
  type : 'chest' | 'abs' | 'back' | '';
}

interface ExercisesWithId extends Exercise {
  _id: string;
}

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

const WorkoutWidget = () => {


  const totalPointsMarks = [
    { value: 100, label: '100' },
    { value: 120, label: '120' },
    { value: 140, label: '140' },
    { value: 160, label: '160' },
    { value: 180, label: '180' },
    { value: 200, label: '200' }
  ];

  const [ alertOpen, setAlertOpen ] = useState<string | boolean>(false);
  const [alertType, setAlertType] = useState('info');

  const closeAlert = () => {
    setAlertOpen(false);
  }

  const [ generateButtonDisabled, setGenerateButtonDisabled ] = useState<string | boolean>(false);

  const [totalPoints, setTotalPoints ] = useState(130);

  const onSliderUpdate = (e) => {
    setTotalPoints(e.target.value)
  }

    const generateWorkout = () => {
        let plan: WorkoutPlan[] = [];
        BaseWorkout.map((workout, i) => {
          const workoutMap = {};
          let limit = Math.ceil(totalPoints * workout.priority);
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
          plan.push({type : workout.type, workouts : workoutMap, points : current})
        })
        return plan;
    };

    const postWorkout = async () => {
      const workout = generateWorkout();
      setGenerateButtonDisabled(true);
      const res = await fetch('/api/notion/update-workout-log', {
        method : 'POST',
        body : JSON.stringify(workout)
      })
      setGenerateButtonDisabled(false);
      if(res.status === 200){
        setAlertType('info');
        setAlertOpen('Workout generated successfully')
      }
      else if(res.status === 500){
        setAlertType('error');
        setAlertOpen('Error generating workout');
      }
    };

    const [exercises, setExercises] = useState([]);
    const [newExercise, setNewExercise] = useState<Exercise>({name : '', reps : 0, points: 0, type : ''});

    const retrieveExercises = async () =>{
      const query = encodeURIComponent('');
      if(!exercises.length){
        const res = await fetch(`/api/widgets/workouts?query=${query}`, {
          method : 'GET',
        })
        const data = await res.json();
        setExercises(data)
      }
    };

    const updateNewExercise = (e) => {
      const { name, value } = e.target; 
      setNewExercise((exercise) => ({
          ...exercise,
          [name]: value
      }));
    };

    const submitWorkout = async (e) => {
      e.preventDefault();
      if(newExercise.name.length > 0 ){
        const res = await fetch('/api/widgets/workouts', {
          method : 'POST',
          body : JSON.stringify([newExercise])
        });
        if(res.status === 200){
          setNewExercise({name : '', reps : 0, points: 0, type : ''});
          setAlertOpen('Exercise uploaded successfully')
        }
      }
    }

    useEffect(()=>{
      retrieveExercises()
    }, []);

  return (
    (
      <Container className='p-4'>
        <div className="py-0 flex w-full justify-between items-center flex-col gap-4">
          <button onClick={postWorkout} className="flex justify-center w-1/2 text-grayText text-2xl py-4 px-6 bg-lightRed rounded-[15px] transition duration-500 hover:bg-lightRedHover">
            {
              exercises.length > 0 ?(
                'Generate'
              ) : 
              (
                <AiOutlineLoading3Quarters className='animate-spin-slow' />
              )
            }
          </button>
          <Accordion sx = {{background : 'none', boxShadow : 'none', width : '100%'}}>
            <StyledAccordionSummary expandIcon={<FaChevronDown />}>
              <p className='text-grayText'>Settings</p>
            </StyledAccordionSummary>
            <AccordionDetails className='text-grayText'>
              <p className='text-3xl float-left mb-8 font-bold'>
                Total points
              </p>
              <Slider value={totalPoints} onChange={(e) => onSliderUpdate(e)} step={10} marks={totalPointsMarks} min={100} max={200} valueLabelDisplay="on"
                      className='mb-12 text-lightRed' sx = {{'& .MuiSlider-markLabel': {color: 'white'}}} />

              <p className='text-3xl float-left mb-8 font-bold'>
                Workouts Included
              </p>
              <div className="w-full flex flex-col">

                <div className="flex w-full justify-between gap-4 items-center my-4">
                  <p className='text-grayText'>1. </p>
                  <button>
                    <FaMinus className='transition duration-500 hover:text-lightRed'/>
                  </button>
                </div>
                <form>
                  <div className="flex justify-start gap-4 items-center my-4 w-[240px]">
                    <p>Exercise</p>
                    <input name='name' placeholder='Insert exercise here...' className='bg-background p-4 border border-lightRed rounded-lg flex-shrink w-full' value={newExercise.name} onChange={(e)=> updateNewExercise(e)} />
                  </div>

                  <div className="flex w-full justify-start gap-4 items-center my-4">
                    <p>Reps</p>
                    <input name='reps' type='number' className='bg-background p-4 border border-lightRed rounded-lg' value={newExercise.reps} onChange={(e)=> updateNewExercise(e)} />
                  </div>

                  <div className="flex w-full justify-start gap-4 items-center my-4">
                    <p>Points</p>
                    <input name='points' type='number'  className='bg-background p-4 border border-lightRed rounded-lg'  value={newExercise.points} onChange={(e)=> updateNewExercise(e)} />
                  </div>

                  <div className="flex w-full justify-start gap-4 items-center my-4">
                    <p>Type</p>
                    <div className='w-full bg-background p-4 border border-lightRed rounded-lg '>
                      <select name="type" id="type" className='w-full bg-background border-r-4 border-r-transparent' value={newExercise.type} onChange={(e)=> updateNewExercise(e)}>
                        <option value="chest">Chest</option>
                        <option value="abs">Abs</option>
                        <option value="back">Back</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className='flex w-full justify-center'>
                    <button onClick={submitWorkout} className="w-1/2 text-grayText text-2xl py-4 my-4 px-6 bg-lightRed rounded-[15px] transition duration-500 hover:bg-lightRedHover">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              {/* {
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
              } */}
            </AccordionDetails>
          </Accordion>
        </div>
        <AlertFlash open={alertOpen} onCloseHandler={closeAlert} type={alertType} message={alertOpen} />
      </Container>
    )
  )
}

export default WorkoutWidget;