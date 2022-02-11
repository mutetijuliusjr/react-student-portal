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
      <Navbar title="School" backLink="Back" sliding={false} />
      
      <Block>
        <Menu>
            <MenuItem href="#" text="Edit" bgColor="blue" popupOpen="#edit_school" />
            <MenuItem href="#" text="Delete" bgColor="red" onClick={()=>{ f7.dialog.confirm('Do You Want To Delete School and Related Entities?', 'Delete School') }} />
        </Menu>
        <h3>Description</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </Block>
        <BlockTitle>Department(s)</BlockTitle>
        <List>
            <ListItem link="#">
                Department #1
            </ListItem>
            <ListItem link="#">
                Department #1
            </ListItem>
            <ListItem link="#">
                Department #1
            </ListItem>
            <ListItem link="#">
                Department #1
            </ListItem>
            <ListItem link="#">
                Department #1
            </ListItem>
            <ListItem link="#">
                Department #1
            </ListItem>
            <ListItem link="#">
                Department #1
            </ListItem>
            <ListItem link="#">
                Department #1
            </ListItem>
            <ListItem link="#">
                Department #1
            </ListItem>
            <ListItem link="#">
                Department #1
            </ListItem>
            <ListItem link="#">
                Department #1
            </ListItem>
        </List>
    </Page>
      
    
  );
};