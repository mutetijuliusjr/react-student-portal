import React, { useState, useEffect } from 'react';
import {
  Col,
  Page,
  Preloader,
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
  View,
} from 'framework7-react';
import { useSelector, useDispatch } from 'react-redux';
import { getSchoolAsync } from '../../redux/schoolSlice';

export default (props) => {
  const [loading, setLoading] = useState(true);
  


  return (
    
    <Page>
        <Navbar title="School Details" backLink="Back" sliding={false} />
                  
        <>
            <Block >
                <Menu>
                    <MenuItem href="#" text="Edit" bgColor="blue" popupOpen="#edit_school" />
                    <MenuItem href="#" text="Delete" bgColor="red" onClick={()=>{ f7.dialog.confirm('Do You Want To Delete School and Related Entities?', 'Delete School') }} />
                </Menu>
                <h3>Description</h3>
                
            </Block>
            <BlockTitle>Department(s)</BlockTitle>
            <List>
                <ListItem link="/department/">
                    Department #1
                </ListItem>
                <ListItem link="/department/">
                    Department #1
                </ListItem>
                <ListItem link="/department/">
                    Department #1
                </ListItem>
                <ListItem link="/department/">
                    Department #1
                </ListItem>
                <ListItem link="/department/">
                    Department #1
                </ListItem>
            </List>
        </> 
    </Page>   
  );
};