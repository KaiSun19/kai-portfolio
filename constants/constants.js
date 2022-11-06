import { DiFirebase, DiReact, DiZend } from 'react-icons/di';
import { FiFigma } from "react-icons/fi";


// write in dev if project is not finished yet

export const projects = [
  {
    title: 'Yeezy Ecommerce Website',
    description: "Using React and MUI for the front end and Firebase for the back end, I was able to create a full stack ecommerce shop. What's cool is that the data for the inventory is actually stored in a google sheets and is requested via PapaParse. ",
      image: '/images/yeezy_full_icon.jpg',
      tags: ['React', 'Firebase', 'MUI', 'SASS'],
    source: 'https://yeezydrops.web.app/',
    visit: 'https://yeezydrops.web.app/',
    id: 0,
  },
  {
    title: 'Aidea Social Media Website',
    description:"Aidea is a social media app inspired by Instagram made using React, Firebase, and MUI",
    image: '/images/aidea-demo.png',
    tags: ['React', 'MUI', 'Firebase'],
    source: 'in dev',
    visit: 'in dev',
    id: 1,
  },
  {
    title: 'UX Engineer Internship at Crowdstrike',
    description:"As part of the intern team, we built an E2E Gherkin testing system using Cucumber as a BDD Framework",
      image: '/images/cs-logo.jpg',
      tags: ['Testing', 'Gherkin', 'Javascript', 'Cucumber'],
    source: 'https://github.com/CrowdStrike/faltest',
    visit: 'https://github.com/CrowdStrike/faltest',
    id: 2,
  }
];

// array for technology section

export const TechnologyExp = [{Category : 'Front End', Icon : (<DiReact size = '3rem'/>), Description : 'Experience with NextJs, ReactJS and Material UI '}, 
                              {Category : 'Back End', Icon : (<DiFirebase size = '3rem'/>), Description : 'Experience with Firebase, Node, and Express '},
                              {Category : 'Design', Icon : (<FiFigma size = '3rem'/>), Description : 'Experience with Figma '}]

export const TimeLineData = [
  { year: 2020, month : 'Jan' , text: 'Started my coding journey as a hobbyist trader', },
  { year: 2020, month : 'May' , text: 'Developed an automated trading bot', },
  { year: 2021, month : 'Feb',  text: 'Started The Odin Project', },
  { year: 2021, month : 'Aug',  text: 'Finished The Odin Project', },
  { year: 2022, month : 'Jan',  text: 'Currently working as a freelance Front End Developer', },
];