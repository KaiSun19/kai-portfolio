'use client'

import { Layout } from '@/layout/Layout';
import { Section, SectionText, SectionTitle } from '@/styles/GlobalComponents';
import { WidgetCard, GridContainer, CardInfo, WidgetIcon } from "./WidgetStyles";
import { TitleContent , HeaderThree } from '@/components/Projects/ProjectsStyles';
import { DiReact } from 'react-icons/di';
import { GiMuscleUp } from "react-icons/gi";
import WorkoutWidget from '@/components/widgets/workout/WorkoutWidget';

const Widgets = () => {

    const widgets = [{title : 'Workout Generator', description : 'Generates a workout plan given a set of exercises and other paramaters and then posts it to a notion database', icon : <GiMuscleUp />}, 
        {title : 'Widget 2', description : "TBA but it'll be good"},{title : 'Widget 3', description : "TBA but it'll be good"},{title : 'Widget 4', description : "TBA but itl'l be good"}];

    const WidgetContents = (widget) => {
      switch(widget){
        case 'Workout Generator':
          return <WorkoutWidget />
        
      }
    }

  return (
    <Layout>
      <Section>
        <SectionTitle>Widgets</SectionTitle>
        <SectionText>A collection of tools that I was too curious not to make</SectionText>
        <GridContainer>
        {
         widgets.map(widget => {
            return(
                <WidgetCard>
                    <TitleContent>
                        <WidgetIcon>
                            {widget.icon ? widget.icon : ''}
                        </WidgetIcon>
                        <HeaderThree title>{widget.title}</HeaderThree>
                    </TitleContent>
                    <CardInfo>
                        {widget.description}
                    </CardInfo>
                    {WidgetContents(widget.title)}
                </WidgetCard>
            )
         })
        }
        </GridContainer>
      </Section>
    </Layout>
  );
};

export default Widgets;