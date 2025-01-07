'use client'

import Link from 'next/link';
import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { DiCssdeck } from 'react-icons/di';

import { Container, Div1, Div2, Div3, Div4, NavLink, SocialIcons , Span} from './HeaderStyles';
import { SecondaryBtn } from '../../styles/GlobalComponents';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Alert, AlertTitle, Snackbar, styled } from '@mui/material';

const Header = () => {

  const { user, setUser, authAlertOpen, setAuthAlertOpen } = useAuth();
  const router = useRouter();

  const handleAuthAlertClose = () => {
    setAuthAlertOpen(null);
  }

  const logout = async () => {
    router.push('/');
    setUser(null);
    sessionStorage.clear();
    const res = await fetch("/api/auth/logout", {
      method : 'POST',
      credentials : 'include'
    });
    if(res.ok){
      console.log('Logged out');
      setAuthAlertOpen('Log out successful')
    }
    return ;
  }

  const StyledAlert = styled(Alert)({
    "&.MuiAlert-root": {
      background: "#6b3030",
      border : '1px solid #d4c0c085',
    },
    "&.MuiAlert-colorInfo": {
        color: "#d4c0c0",
    },
    "& .MuiAlert-icon": {
        color: "#d4c0c0",
    },
    "& .MuiAlert-message": {
        color: "#d4c0c0",
    },
    "& .MuiSvgIcon-root": {
      width : '2rem',
      height : '2rem',
      color: "#d4c0c0",
    }
});

  return (
    (
      <Container>
        <Div1>
          <Link href = '/' style = {{display: 'flex', justifyContent : 'center', color: 'white'}}>
            <DiCssdeck size='3rem' /><Span>kaidev</Span>
          </Link>
        </Div1>
        <Div2>
          <li>
            <NavLink href  = '#projects'>
                Projects
            </NavLink>
          </li>
          <li>
            <NavLink href='#tech'>
              Technologies
            </NavLink>
          </li>
          <li>
            <NavLink href  = '#about'>
              About
            </NavLink>
          </li>
          <li>
            <NavLink href='#contact'>
              Contact
            </NavLink>
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

        <Div4>
        {
            !user ? (
              <SecondaryBtn header>
                <Link href = '/login'>
                  <AiOutlineLogin  size = '3rem' /> 
                </Link>
              </SecondaryBtn>
            ) :
            <SecondaryBtn header onClick={logout}>
              <AiOutlineLogout  size = '3rem' /> 
            </SecondaryBtn>
          }
        </Div4>
        <Snackbar open={authAlertOpen} anchorOrigin={{vertical: 'top',horizontal: 'right'}} onClose={handleAuthAlertClose} className='mt-8 md:mt-0 mr-20'>
          <StyledAlert severity='info' onClose={handleAuthAlertClose}>
            <AlertTitle>Info</AlertTitle>
            {authAlertOpen}
          </StyledAlert>
        </Snackbar>
      </Container>
    )
  )
}

export default Header;
