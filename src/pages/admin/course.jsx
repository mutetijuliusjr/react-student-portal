import React, { useState, useRef } from 'react';
import {
  Page,
  Navbar,
  Block,
  Button,
  Popup,
  Menu,
  MenuItem,
  NavRight,
  Link,
  List,
  ListItem,
  BlockTitle,
  f7,
} from 'framework7-react';

export default () => {
  
  return (
    
      
    <Page>
      <Navbar title="Course" backLink="Back" sliding={false} />
      
      <Block>
        <Menu>
            <MenuItem href="#" text="Edit" bgColor="blue" popupOpen="#edit_course" />
            <MenuItem href="#" text="Delete" bgColor="red" onClick={()=>{ f7.dialog.confirm('Do You Want To Delete Course and Related Entities?', 'Delete Course') }} />
        </Menu>
        <h3>Description</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </Block>
        <BlockTitle>Semester(s)</BlockTitle>
        <List>
            <ListItem link="#">
                Sem #1
            </ListItem>
            <ListItem link="#">
                Sem #1
            </ListItem>
            <ListItem link="#">
                Sem #1
            </ListItem>
            <ListItem link="#">
                Sem #1
            </ListItem>
            <ListItem link="#">
                Sem #1
            </ListItem>
            <ListItem link="#">
                Sem #1
            </ListItem>
            <ListItem link="#">
                Sem #1
            </ListItem>
            <ListItem link="#">
                Sem #1
            </ListItem>
            <ListItem link="#">
                Sem #1
            </ListItem>
            <ListItem link="#">
                Sem #1
            </ListItem>
            <ListItem link="#">
                Sem #1
            </ListItem>
        </List>
    </Page>
      
    
  );
};