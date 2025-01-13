import { DiFirebase, DiReact } from "react-icons/di";
import { FiFigma } from "react-icons/fi";

export const projects = [
  {
    title: "Yeezy Ecommerce Website",
    description:
      "Using React and MUI for the front end and Firebase for the back end, I was able to create a full stack ecommerce shop. What's cool is that the data for the inventory is actually stored in a google sheets and is requested via PapaParse. ",
    image: "/images/yeezy_full_icon.jpg",
    tags: [
      { name: "React", link: "https://reactjs.org/" },
      { name: "Firebase", link: "https://firebase.google.com/" },
      { name: "MUI", link: "https://mui.com/" },
      { name: "SASS", link: "https://sass-lang.com/" },
    ],
    source: "https://github.com/KaiSun19/YeezyShop",
    visit: "https://yeezydrops.herokuapp.com/",
    id: 0,
  },
  {
    title: "Aidea Social Media Website",
    description:
      "Aidea is a social media app inspired by Instagram made using React, Firebase, and MUI",
    image: "/images/AIDEA.jpg",
    tags: [
      { name: "React", link: "https://reactjs.org/" },
      { name: "MUI", link: "https://mui.com/" },
      { name: "Firebase", link: "https://firebase.google.com/" },
    ],
    source: "https://github.com/KaiSun19/Aidea",
    visit: "https://aidea-13e1e.web.app/",
    id: 1,
  },
  {
    title: "UX Engineer Internship at Crowdstrike",
    description:
      "As part of the intern team, we built an E2E Gherkin testing system using Cucumber as a BDD Framework",
    image: "/images/cs-logo.jpg",
    tags: [
      {
        name: "Testing",
        link: "",
      },
      { name: "Gherkin", link: "https://cucumber.io/docs/gherkin/" },
      {
        name: "Javascript",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      { name: "Cucumber", link: "https://cucumber.io/" },
    ],
    source: "https://github.com/CrowdStrike/faltest",
    visit: "https://github.com/CrowdStrike/faltest",
    id: 2,
  },
];

// array for technology section

export const TechnologyExp = [
  {
    Category: "Front End",
    Icon: <DiReact size="3rem" />,
    Description:
      "Experience with NextJs, ReactJS, EmberJS, Tailwind CSS and Material UI ",
  },
  {
    Category: "Back End",
    Icon: <DiFirebase size="3rem" />,
    Description:
      "Experience with Firebase, Node, Google Cloud Functions, and Express ",
  },
  {
    Category: "Design",
    Icon: <FiFigma size="3rem" />,
    Description: "Experience with Figma ",
  },
];

export const TimeLineData = [
  { year: 2020, month: "May", text: "Developed an automated trading bot" },
  { year: 2021, month: "Feb", text: "Started The Odin Project" },
  { year: 2021, month: "Aug", text: "Finished The Odin Project" },
  {
    year: 2022,
    month: "Jan",
    text: "Started working as a freelance developer",
  },
  {
    year: 2022,
    month: "Jun",
    text: "Crowdstrike Internship",
  },
  {
    year: 2023,
    month: "Jun",
    text: "Full time Front End Engineer at CrowdStrike",
  },
];


export const TotalWorkoutPoints = 130;

export const BaseWorkout = [
  {
    type : 'chest',
    priority: 5/12,
    workouts: [
      {
        name: 'pushups',
        reps: 20,
        points: 10,
      },
      {
        name: 'dips',
        reps: 10,
        points: 16,
        type : 'chest',
      },
      {
        name: 'russian pushups',
        reps: 10,
        points: 20,
        type : 'chest',
      },
    ],
  },
  {
    type : 'back',
    priority : 2/12,
    workouts: [
      {
        name: 'pullups',
        reps: 10,
        points: 20,
      },
      {
        name: 'muscle ups',
        reps: 5,
        points: 20,
      },
      {
        name: '30 second hang',
        reps: 1,
        points: 15,
      },
    ],
  },
  {
    type: 'abs',
    priority : 5/12,
    workouts: [
      {
        name: 'crunches',
        reps: 20,
        points: 10,
      },
      {
        name: 'decline sit ups',
        reps: 20,
        points: 10,
      },
      {
        name: 'hanging leg raises',
        reps: 10,
        points: 20,
      },
      {
        name: 'dip leg raises',
        reps: 10,
        points: 15,
      },
      {
        name: '10 second dip raise hold',
        reps: 1,
        points: 10,
      },
      {
        name: '10 second hanging raise hold',
        reps: 1,
        points: 15,
      },
    ],
  },
];
