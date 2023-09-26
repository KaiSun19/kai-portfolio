import {  styled } from '@mui/material/styles';
import { Grid, TextField, Card, CardContent, Typography } from '@mui/material';

export const StyledTextField = styled(TextField)({
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