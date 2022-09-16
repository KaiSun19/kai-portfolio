import React from 'react';

import { BlogCard, CardInfo, ExternalLinks, GridContainer, HeaderThree, Hr, Tag, TagList, TitleContent, UtilityList, Img } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { projects } from '../../constants/constants';

const Projects = () => (
  <div>
    <Section nopadding id = 'projects'>
    <SectionDivider />
    <SectionTitle main>
      Projects
    </SectionTitle>
    <GridContainer>
      {projects.map((project, index) =>{
        return (
          <BlogCard key={index}>
          <Img src={project.image} />
            <TitleContent>
              <HeaderThree title>{project.title}</HeaderThree>
              <Hr />
            </TitleContent>
            <CardInfo className="card-info">{project.description}</CardInfo>
            <div>
              <TitleContent>Stack</TitleContent>
              <TagList>
                {project.tags.map((tag, ind) => {
                  return <Tag key={ind}>{tag}</Tag>;
                })}
              </TagList>
            </div>
            <UtilityList>
              {project.source === 'in dev' ? ( 
                    <CardInfo className="card-info">Currently In Dev</CardInfo>
              )
                : (
                  <>
                    <ExternalLinks href={project.visit}>Code</ExternalLinks>
                    <ExternalLinks href={project.source}>Source</ExternalLinks>
                  </>
                )
              }
            </UtilityList>
          </BlogCard>
        )
      })}
    </GridContainer>
    </Section>
  </div>
);

export default Projects;