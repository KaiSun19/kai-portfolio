import { Alert, AlertTitle, Snackbar, styled } from '@mui/material';
import React from 'react';

const capitalized = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
};

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

const AlertFlash = ({open, onCloseHandler, type, message}) => {

    return(
    <Snackbar open={open} anchorOrigin={{vertical: 'top',horizontal: 'right'}} onClose={onCloseHandler} className='mt-8 md:mt-0 mr-20' autoHideDuration={3000}>
        <StyledAlert severity={type} onClose={onCloseHandler}>
          <AlertTitle>{capitalized(type)}</AlertTitle>
          {message}
        </StyledAlert>
      </Snackbar>
    )
};

export default AlertFlash;