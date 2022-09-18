import React from 'react';

import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import {  styled } from '@mui/material/styles';
import { Grid, TextField, Card, CardContent, Typography } from '@mui/material';
import Button from '../../styles/GlobalComponents/Button';

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
      color : 'white'
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
    '& textarea': {
      borderColor: 'white',
      color : 'white'
    },
    '&:hover textarea': {
      borderColor: 'white',
    },
    '&.Mui-focused textarea': {
      borderColor: 'white',
    },
  },
});

// START BY DOING GOOGLE MAPS 
const ContactMe = () => {

  async function handleOnSubmit(e) {
    e.preventDefault();

    const formData = {};

    Array.from(e.currentTarget.elements).forEach(field => {
      if ( !field.name ) return;
      formData[field.name] = field.value;
    });

    await fetch('/api/mail', {
      method: 'POST',
      body: JSON.stringify(formData) // sends formData to mail api endpoint
    }).then( 
      // location.reload()
    )

  }

return (

    <Section id="contact" >
      <SectionDivider divider />
      <SectionTitle>Get in touch</SectionTitle>
      <form method='post' onSubmit={handleOnSubmit}>
        <Grid container spacing={1} className = 'contact-grid'>
          <Grid xs={12} sm = {6} item>
            <StyledTextField placeholder="Enter your name" variant="outlined" name = 'fullname' fullWidth required className='contact-input' />
          </Grid>
          <Grid item xs={12}  sm = {6}>
            <StyledTextField type="email" placeholder="Enter email"  name = 'email' variant="outlined" fullWidth required className='contact-input' />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField  name = 'subject' placeholder="Enter Subject" variant="outlined" fullWidth required  className='contact-input'/>
          </Grid>
          <Grid item xs={12}>
            <StyledTextField name = 'message' multiline rows={4} placeholder="Type your message here" variant="outlined" fullWidth required className='contact-input' />
          </Grid>
          <Grid item xs={12} className = 'contact-button'>
            <Button type="submit" >Submit</Button>
          </Grid>
        </Grid>
      </form>
      
    </Section>
);

}

export default ContactMe;
