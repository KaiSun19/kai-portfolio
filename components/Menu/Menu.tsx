import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import React, { ReactNode } from 'react';


interface MenuChild {
    label : string;
    icon : ReactNode;
    action : () => void | any;
}
interface Args {
    open : boolean;
    onCloseHandler : () =>  void;
    anchor : HTMLAnchorElement;
    children : MenuChild[];
}

const HeaderMenu = ({open, onCloseHandler, anchor, children} : Args) => {

    return(
        <Menu
        anchorEl={anchor}
        open={open}
        onClose={onCloseHandler}
        sx = {{'& .MuiMenu-paper' : {marginTop : '1rem', padding : '0.5rem', background : '#111621', boxShadow : '3px 3px 20px #504e4e80', borderRadius : '8px'}}}
      >
        <MenuList sx = {{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
          {
            children.map((child : MenuChild, i) => {
              return(
                <>
                <MenuItem
                  onClick={() => {
                  child.action();
                  onCloseHandler();
                }}>
                  <ListItemIcon sx={{ color: 'white', fontSize: '1.5rem' }}>
                    {child.icon}
                  </ListItemIcon>
                <ListItemText sx={{'& .MuiListItemText-primary' : {color : 'white', fontSize : '1.5rem'}}}>{child.label}</ListItemText>
              </MenuItem>
              {
                i !== children.length - 1 && (
                  <Divider sx = {{width : '80%', height : '2px', background : 'linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)'}}/>
                )
              }
              </>
              )
            })
          }
        </MenuList>
      </Menu>
    )
};

export default HeaderMenu;