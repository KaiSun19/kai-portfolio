"use client";

import React, { useEffect, useRef } from "react";

import {
  BlogCard,
  CardInfo,
  ExternalLinks,
  GridContainer,
  HeaderThree,
  Hr,
  Tag,
  TagList,
  TitleContent,
  UtilityList,
  Img,
} from "./ProjectsStyles";
import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { projects } from "../../constants/constants";

const Projects = () => {
  const projectContainerRef = useRef(null);

  // useEffect for fadeInUp animation

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelector("#project-0").classList.add("fadeInUpClass");
          document.querySelector("#project-1").classList.add("fadeInUpClass");
          document.querySelector("#project-2").classList.add("fadeInUpClass");
        }
      });
    });

    if (projectContainerRef.current) {
      observer.observe(projectContainerRef.current);
    }
  }, [projectContainerRef]);

  return (
    <div>
      <Section nopadding id="projects" ref={projectContainerRef}>
        <SectionDivider />
        <SectionTitle main>Projects</SectionTitle>
        <GridContainer>
          {projects.map((project, index) => {
            return (
              <BlogCard
                key={index}
                className="project-card"
                id={`project-${index}`}
              >
                <Img src={project.image} />
                <TitleContent>
                  <HeaderThree $title>{project.title}</HeaderThree>
                  <Hr />
                </TitleContent>
                <CardInfo className="card-info">{project.description}</CardInfo>
                <div>
                  <TitleContent>Stack</TitleContent>
                  <TagList>
                    {project.tags.map((tag, ind) => {
                      return (
                        <Tag key={ind} href={tag.link} target="_blank">
                          {tag.name}
                        </Tag>
                      );
                    })}
                  </TagList>
                </div>
                <UtilityList>
                  {project.source === "in dev" ? (
                    <CardInfo className="card-info">Currently In Dev</CardInfo>
                  ) : (
                    <>
                      <ExternalLinks href={project.visit}>Code</ExternalLinks>
                      <ExternalLinks href={project.source}>
                        Source
                      </ExternalLinks>
                    </>
                  )}
                </UtilityList>
              </BlogCard>
            );
          })}
        </GridContainer>
      </Section>
    </div>
  );
};

export default Projects;
