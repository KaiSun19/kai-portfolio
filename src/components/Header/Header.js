import Link from 'next/link';
import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { DiCssdeck } from 'react-icons/di';

import { Container, Div1, Div2, Div3, NavLink, SocialIcons , Span} from './HeaderStyles';

const Header = () =>  (
  <Container>
    <Div1>
      <Link href = '/'>
        <a style = {{display: 'flex', justifyContent : 'center', color: 'white'}}>
          <DiCssdeck size='3rem' /><Span>kaidev</Span>
        </a>
      </Link>
    </Div1>
    <Div2>
      {/* #projects goes to projects section in the same page  */}
      <li>
        <Link href  = '#projects'> 
          <NavLink>
            Projects
          </NavLink>
        </Link>
      </li>
      <li>
        <Link href  = '#tech'> 
          <NavLink>
            Technologies
          </NavLink>
        </Link>
      </li>
      <li>
        <Link href  = '#about'> 
          <NavLink>
            About
          </NavLink>
        </Link>
      </li>
      <li>
        <Link href  = '#contact'> 
          <NavLink>
            Contact
          </NavLink>
        </Link>
      </li>
    </Div2>
    <Div3>
      <SocialIcons href = 'https://github.com/KaiSun19'>
        <AiFillGithub  size = '3rem' /> 
      </SocialIcons>
      <SocialIcons href = 'https://www.linkedin.com/in/yuankai-sun-2a26011b8/'>
        <AiFillLinkedin  size = '3rem' /> 
      </SocialIcons>
    </Div3>

  </Container>
);

export default Header;
