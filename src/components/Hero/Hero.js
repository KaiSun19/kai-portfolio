import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <div>
    <Section row nopadding>
      <LeftSection>
        <SectionTitle>
          Hello, <br />
            My name is Kai 
        </SectionTitle>
        <SectionText>
          Student | Frontend  Developer | UX Designer
        </SectionText>
        <Button onClick = {()=> window.location = '/#projects'}>
          See my latest 
        </Button>
      </LeftSection>
    </Section>
  </div>
);

export default Hero;