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

export default (props) => {
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    fetchSchool()
  }, [])

  const fetchSchool = async () => {
    setLoading(true)
    const res = await fetch(`http://127.0.0.1:8000/api/schools/${props.id}`)
    const data = await res.json()
    localStorage.setItem('school', JSON.stringify(data))
    setLoading(false)
    return data
  }

  const school = JSON.parse(localStorage.getItem('school'))

  return (
    
    <Page>
        <Navbar title="School Details" backLink="Back" sliding={false} />
        {console.log(school)}
        {loading ? (
            <div className="d-flex align-content-center">
                <Preloader color="white" />
            </div>
        ):(            
            <>
                <Block >
                    <Menu>
                        <MenuItem href="#" text="Edit" bgColor="blue" popupOpen="#edit_school" />
                        <MenuItem href="#" text="Delete" bgColor="red" onClick={()=>{ f7.dialog.confirm('Do You Want To Delete School and Related Entities?', 'Delete School') }} />
                    </Menu>
                    <h3>Description</h3>
                    {school.description}
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
        )}
    </Page>   
  );
};