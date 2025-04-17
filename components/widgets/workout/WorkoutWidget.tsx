"use client";

import { Container } from "@/layout/LayoutStyles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Slider,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaMinus } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BaseWorkout } from "@/constants/constants";
import AlertFlash from "@/components/Alert/Alert";
import { capitalize, colorsInBetween, validateObjectProps } from "@/utils/utils";
import MultiSlider from "@/components/utils/MultiSlider";
import { TbSend } from "react-icons/tb";

export interface WorkoutPlan {
  type: string;
  workouts: Record<string, number>;
  points: number;
}

export interface Exercise {
  name: string;
  reps: number;
  points: number;
  type: "chest" | "abs" | "back" | "other";
}

export interface WeightedExercise {
  sets : Array<{sets : number , reps : number , weight : number}>;
  timestamp?:string;
  type: 'deadlift' | 'squat';
  _id?: string;
}

interface ExercisesWithId extends Exercise {
  _id: string;
}

const StyledAccordionSummary = styled(AccordionSummary)({
  "& .MuiAccordionSummary-root": {
    backgroundColor: "none",
  },

  "& .MuiAccordionSummary-content": {
    color: "#d4c0c0",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "#d4c0c0",
  },
});

const WEIGHTED_WORKOUTS = ['squat, deadlift'];

const WorkoutWidget = () => {
  const totalPointsMarks = [
    { value: 100, label: "100" },
    { value: 120, label: "120" },
    { value: 140, label: "140" },
    { value: 160, label: "160" },
    { value: 180, label: "180" },
    { value: 200, label: "200" },
  ];

  const exerciseColors = colorsInBetween("13ADC7", "945DD6", 4);

  const defaultPriorities = {
    chest: 5 / 12,
    abs: 5 / 12,
    back: 2 / 12,
    other: 0 / 12,
  };

  const [weightJournal, setWeightJournal] = useState({
    workoutType: "deadlift",
    journal: "",
  });

  const [alertOpen, setAlertOpen] = useState<string | boolean>(false);
  const [alertType, setAlertType] = useState("info");

  const updateWeightJournal = (e) => {
    setWeightJournal((prev) => ({
      ...prev,
      journal: e.target.value,
    }));
  };

  const updateWeightJournalType = (e) => {
    setWeightJournal((prev) => ({
      ...prev,
      workoutType: e.target.value,
    }));
  };

  const submitWeightJournal = async () => {
    const log: { type: string; sets: Record<string, number>[] } = {
      type: weightJournal.workoutType,
      sets: [],
    };
    const journal = weightJournal.journal.split(",");
    journal.map((item) => {
      if (item[0] === " ") {
        item = item.slice(1);
      }
      const details = item.split(" ");
      const sets = details[0];
      const reps = details[1];
      const weight = details[3];
      log["sets"].push({
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseInt(weight),
      });
    });

    if(!log.sets.every(item => validateObjectProps(item))){
      setAlertOpen("Undefined values in journal try again.");
      return;
    }

    const res = await fetch("/api/widgets/workouts", {
      method: "POST",
      body: JSON.stringify(log),
    });
    if (res.status === 200) {
      setWeightJournal({
        workoutType: "deadlift",
        journal: "",
      });
      setAlertOpen("Log uploaded successfully");
    }
    else{
      setAlertOpen("Error uploading workout journal");
    }
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const [generateButtonDisabled, setGenerateButtonDisabled] =
    useState<boolean>(false);

  const [totalPoints, setTotalPoints] = useState(130);

  const [exercisePoints, setExercisePoints] = useState({
    chest: defaultPriorities["chest"] * totalPoints,
    abs: defaultPriorities["abs"] * totalPoints,
    back: defaultPriorities["back"] * totalPoints,
    other: defaultPriorities["other"] * totalPoints,
  });

  const onSliderUpdate = (e) => {
    setTotalPoints(e.target.value);
  };

  const generateWorkout = () => {
    let plan: WorkoutPlan[] = [];
    exerciseTypes.map((type) => {
      const limit = exercisePoints[type];
      const possibleExercises = exercises.filter(
        (exercise) => exercise.type === type
      );
      if (
        limit >= possibleExercises.sort((a, b) => a.points - b.points)[0].points
      ) {
        const workoutMap = {};
        let current = 0;
        while (limit > current) {
          let random_number =
            Math.floor(Math.random() * possibleExercises.length) + 0;
          let { name, reps, points } = possibleExercises[random_number];
          if (workoutMap[name]) {
            workoutMap[name] += reps;
          } else {
            workoutMap[name] = reps;
          }
          current += points;
        }
        plan.push({ type: type, workouts: workoutMap, points: current });
      }
    });

    return addMostRecentWeightedWorkout(plan, weightedWorkoutLogs.current)
  };

  const postWorkout = async () => {
    const workout = generateWorkout();
    setGenerateButtonDisabled(true);
    const res = await fetch("/api/notion/update-workout-log", {
      method: "POST",
      body: JSON.stringify(workout),
    });
    setGenerateButtonDisabled(false);
    if (res.status === 200) {
      setAlertType("info");
      setAlertOpen("Workout generated successfully");
    } else if (res.status === 500) {
      setAlertType("error");
      setAlertOpen("Error generating workout");
    }
  };

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<Exercise["type"][]>([
    "chest",
    "abs",
    "back",
    "other",
  ]);
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: "",
    reps: 0,
    points: 0,
    type: "other",
  });

  const weightedWorkoutLogs = useRef([]);

  const retrieveExercises = async (filter) => {
    const query = encodeURIComponent(
      typeof filter === "string" ? filter : JSON.stringify(filter)
    );
    if (!exercises.length || filter !== "") {
      const res = await fetch(`/api/widgets/workouts?query=${query}`, {
        method: "GET",
      });
      let data = await res.json();
      const typeOrder = { chest: 1, abs: 2, back: 3, other: 4 };
      data.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);
      setExercises(data);
    }
  };

  const retrieveWeightedWorkoutsLogs = async (exercises) => {
    const query = encodeURIComponent(
      typeof exercises === "string" ? exercises : JSON.stringify(exercises)
    );

      const res = await fetch(`/api/widgets/workouts?query=workout_log${query}`, {
        method: "GET"
      }
    )
      let data = await res.json();
      return data;
  }

  const addMostRecentWeightedWorkout = (workout_plan : WorkoutPlan[] , logs : WeightedExercise[] ) => {
    const last_workout = logs[logs.length - 2];
    return [
      ...workout_plan,
      {weighted_workout : last_workout}
    ]
  }

  const updateNewExercise = (e) => {
    const { name, value } = e.target;
    setNewExercise((exercise) => ({
      ...exercise,
      [name]: value,
    }));
  };

  const submitWorkout = async (e) => {
    e.preventDefault();
    if (newExercise.name.length > 0) {
      const res = await fetch("/api/widgets/workouts", {
        method: "POST",
        body: JSON.stringify([newExercise]),
      });
      if (res.status === 200) {
        setNewExercise({ name: "", reps: 0, points: 0, type: "other" });
        setExercises((existing) => {
          return [...existing, newExercise];
        });
        setAlertOpen("Exercise uploaded successfully");
      }
    }
  };

  const typeEnabled = (type) => {
    return exerciseTypes.includes(type);
  };

  const toggleExerciseType = (type) => {
    let filter;
    if (typeEnabled(type)) {
      filter = exerciseTypes.filter((item) => item !== type);
      retrieveExercises(filter);
    }
  };

  const retrieveWorkouts = async () => {
    retrieveExercises("");
    weightedWorkoutLogs.current = await retrieveWeightedWorkoutsLogs("")
  }

  useEffect(() => {
    retrieveWorkouts()
  }, []);

  useEffect(() => {
    if (exercises.length > 0) {
      const typesOnly = exercises.map((item) => item.type);
      setExerciseTypes(typesOnly.filter((v, i, self) => i === self.indexOf(v)));
    }
  }, [exercises]);

  return (
    <Container className="p-4">
      <div className="py-0 flex w-full justify-between items-center flex-col gap-4">
        <div className="w-full flex items-center py-4 gap-4">
          <button
            onClick={postWorkout}
            disabled={generateButtonDisabled}
            className="flex flex-grow justify-center text-grayText text-2xl py-4 px-6 bg-lightRed rounded-[15px] transition duration-500 hover:bg-lightRedHover"
          >
            {typeof exercises !== "string" ? (
              "Generate"
            ) : (
              <AiOutlineLoading3Quarters className="animate-spin-slow" />
            )}
          </button>
        </div>
        <Accordion
          sx={{
            background: "none",
            boxShadow: "none",
            width: "100%",
          }}
        >
          <StyledAccordionSummary expandIcon={<FaChevronDown />}>
            <p className="text-grayText">Weighted workout log</p>
          </StyledAccordionSummary>
          <AccordionDetails className="text-grayText">
            <div className="w-full flex flex-col justify-start gap-4 items-center my-4 w-[240px]">
              <textarea
                name="workout-journal"
                rows={5}
                placeholder="2 100 for 8 3, 3 100 for 3, etc"
                className="bg-background p-4 border border-lightRed rounded-lg flex-shrink w-full"
                value={weightJournal.journal}
                onChange={(e) => updateWeightJournal(e)}
              />
              <div className="w-full flex items-center gap-4">
                <div className="flex flex-col justify-center items-start flex-1 justify-start gap-4 items-center mt-4 mb-0">
                  <p>Type</p>
                  <div className="w-full bg-background p-4 border border-lightRed rounded-lg ">
                    <select
                      name="type"
                      id="type"
                      className="w-full bg-background border-r-4 border-r-transparent"
                      value={weightJournal.workoutType}
                      onChange={(e) => updateWeightJournalType(e)}
                    >
                      <option value="squat">Squat</option>
                      <option value="deadlift">Deadlift</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={submitWeightJournal}
                  disabled={generateButtonDisabled}
                  className="flex items-center justify-center w-16 h-16 text-grayText text-2xl p-4 mt-auto bg-lightRed rounded-full transition duration-500 hover:bg-lightRedHover"
                >
                  <TbSend className="w-24 h-24 rotate-45" />
                </button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{ background: "none", boxShadow: "none", width: "100%" }}
        >
          <StyledAccordionSummary expandIcon={<FaChevronDown />}>
            <p className="text-grayText">Settings</p>
          </StyledAccordionSummary>
          <AccordionDetails className="text-grayText">
            <p className="text-3xl float-left mb-8 font-bold">Total points</p>
            <Slider
              value={totalPoints}
              onChange={(e) => onSliderUpdate(e)}
              step={10}
              marks={totalPointsMarks}
              min={100}
              max={200}
              valueLabelDisplay="on"
              className="mb-12 text-lightRed"
              sx={{ "& .MuiSlider-markLabel": { color: "white" } }}
            />

            <p className="text-3xl float-left mb-8 font-bold">Add a workout</p>
            <div className="w-full flex flex-col">
              <div className="flex w-full justify-between gap-4 items-center my-4">
                <p className="text-grayText">1. </p>
                <button disabled>
                  <FaMinus className="transition duration-500 hover:text-lightRed" />
                </button>
              </div>
              <form>
                <div className="flex justify-start gap-4 items-center my-4 w-[240px]">
                  <p>Exercise</p>
                  <input
                    name="name"
                    placeholder="Insert exercise here..."
                    className="bg-background p-4 border border-lightRed rounded-lg flex-shrink w-full"
                    value={newExercise.name}
                    onChange={(e) => updateNewExercise(e)}
                  />
                </div>

                <div className="flex w-full justify-start gap-4 items-center my-4">
                  <p>Reps</p>
                  <input
                    name="reps"
                    type="number"
                    className="bg-background p-4 border border-lightRed rounded-lg"
                    value={newExercise.reps}
                    onChange={(e) => updateNewExercise(e)}
                  />
                </div>

                <div className="flex w-full justify-start gap-4 items-center my-4">
                  <p>Points</p>
                  <input
                    name="points"
                    type="number"
                    className="bg-background p-4 border border-lightRed rounded-lg"
                    value={newExercise.points}
                    onChange={(e) => updateNewExercise(e)}
                  />
                </div>

                <div className="flex w-full justify-start gap-4 items-center my-4">
                  <p>Type</p>
                  <div className="w-full bg-background p-4 border border-lightRed rounded-lg ">
                    <select
                      name="type"
                      id="type"
                      className="w-full bg-background border-r-4 border-r-transparent"
                      value={newExercise.type}
                      onChange={(e) => updateNewExercise(e)}
                    >
                      <option value="chest">Chest</option>
                      <option value="abs">Abs</option>
                      <option value="back">Back</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex w-full justify-center">
                  <button
                    onClick={submitWorkout}
                    className="w-1/2 text-grayText text-2xl py-4 my-4 px-6 bg-lightRed rounded-[15px] transition duration-500 hover:bg-lightRedHover"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <p className="w-full flex flex-start text-3xl float-left mb-8 mt-8 font-bold">
                Change workout points
              </p>
              <MultiSlider
                total={totalPoints}
                colors={exerciseColors}
                exerciseTypes={exerciseTypes}
                points={exercisePoints}
                setPoints={setExercisePoints}
              />
              <div className="flex justify-start items-center flex-wrap">
                {exerciseTypes.map((type: string) => (
                  <Chip
                    key={type}
                    label={type}
                    onClick={() => toggleExerciseType(type)}
                    sx={{
                      backgroundColor: typeEnabled(type)
                        ? "#6b3030"
                        : "#111621",
                      color: "white",
                      borderColor: "#6b3030",
                      border: "1px solid",
                      margin: "0.5rem",
                      fontSize: "15px",
                    }}
                  />
                ))}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <AlertFlash
        open={alertOpen}
        onCloseHandler={closeAlert}
        type={alertType}
        message={alertOpen}
      />
    </Container>
  );
};

export default WorkoutWidget;
