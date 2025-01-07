'use client'

import React from 'react'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { Container } from './LayoutStyles'

export const Layout = ({children}) => {

  return (
    <Container shortContent>
     <Header/>
     <main style={{flex : 1}}>{children}</main> 
     <Footer/>
    </Container>
  )
}
