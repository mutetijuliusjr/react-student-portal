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
const [loading, setLoading] = useState(true)
const [res, setSchool] = useState([])

const getSchool = async () => {
    const resp = await fetch(`http://localhost:8000/api/schools/${props.id}`)
    if (resp.ok) {
        const schl = await resp.json()
        setLoading(false)
        setSchool(schl)
        //return { schl }
    }
    
}

useEffect(() => {
  getSchool()
}, [])



  return (
    
    <Page>
        <Navbar title="School Details" backLink="Back" sliding={false} />

{/*         {loading ? (
            <div className="display-flex justify-content-center padding-top">
                <Preloader color="gray" size="40px"></Preloader>
            </div>
        ):(
        <div>
            
            {school.school != undefined && (
                <div>
                    <Block >
                        <Menu>
                            <MenuItem href="#" text="Edit" bgColor="blue" popupOpen="#edit_school" />
                            <MenuItem href="#" text="Delete" bgColor="red" onClick={()=>{ f7.dialog.confirm('Do You Want To Delete School and Related Entities?', 'Delete School') }} />
                        </Menu>
                    </Block>
                    <BlockTitle>School Of {res.school.name}</BlockTitle>
                    <BlockTitle>Description</BlockTitle>
                    <Block>{res.school.description}</Block>
                    <BlockTitle>Department(s)</BlockTitle>
                        {res.departments != '' ? (
                            <List>
                                {res.departments.map((dept)=>{
                                    <ListItem link="/department/">
                                        Department #1
                                    </ListItem>
                                })}
                            </List>
                        ):(
                           <div>
                               <Block>There are no departments listed under this school</Block>
                                <Button outline color="green" text="Add The First Department" />
                           </div>
                        )}
                </div>
            )}
        </div> 
        )}  */}

        {loading ? (
            <div className="display-flex justify-content-center padding-vertical">
                <Preloader color="gray" size="40px"></Preloader>
            </div>
        ):
            <>
                {res.school != undefined && 
                    <>
                        <Block >
                            <Menu>
                                <MenuItem href="#" text="Edit" bgColor="blue" popupOpen="#edit_school" />
                                <MenuItem href="#" text="Delete" bgColor="red" onClick={()=>{ f7.dialog.confirm('Do You Want To Delete School and Related Entities?', 'Delete School') }} />
                            </Menu>
                        </Block>
                        <BlockTitle>School Of {res.school.name}</BlockTitle>
                        <BlockTitle>Description</BlockTitle>
                        <Block>{res.school.description}</Block>
                        {res.departments != '' ? 
                            <>
                                <BlockTitle>Department(s)</BlockTitle>
                                <List>
                                {res.departments.map((dept)=>
                                    <ListItem link={`/departments/${dept.id}`} key={dept.id} title={dept.name} />
                                )}
                                </List>
                            </>
                            :
                            <>
                                <Block>There are no departments listed under this school</Block>
                                <Button outline color="green" text="Add The First Department" />
                            </>
                        }
                    </>
                }
            </>
        }     
        
    </Page>   
  );
};