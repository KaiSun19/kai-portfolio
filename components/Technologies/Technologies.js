import React, { useRef, useEffect} from 'react';
import { DiFirebase, DiReact, DiZend } from 'react-icons/di';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './TechnologiesStyles';
import { TechnologyExp } from '../../constants/constants';

const Technologies = () =>{

  const techContainerRef = useRef(null)

  // useEffect for the fadeInUp animation 

  useEffect(()=>{

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          document.querySelector('.tech-list').classList.add('fadeInUpClass');
        }
      })
    });

    if(techContainerRef.current){

      observer.observe(techContainerRef.current);

    }

  },[techContainerRef])

  return(
      <Section id="tech" >
        <SectionDivider divider />
        <SectionTitle>Technologies</SectionTitle>
        <SectionText ref = {techContainerRef}>
          I've worked with a range a technologies in the web development world.
          From Back-end To Design
        </SectionText>
        <List className='tech-list'>
          {TechnologyExp.map((tech, i) =>{
            return (
              <ListItem key = {i}>
              <picture>
                {tech.Icon}
              </picture>
              <ListContainer>
                <ListTitle>{tech.Category}</ListTitle>
                <ListParagraph>
                  {tech.Description.substring(0,15)}
                  <br />
                  {tech.Description.substring(16,tech.Description.length -1)}
                </ListParagraph>
              </ListContainer>
            </ListItem>
            )
          })}
    
        </List>
      </Section>
  )
}

export default Technologies;
