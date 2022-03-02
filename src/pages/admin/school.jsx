import React, { useState, useEffect } from 'react';
import {
    FaEllipsisV,
} from 'react-icons/fa';

import {
  Col,
  Page,
  PageContent,
  Preloader,
  Popover,
  Navbar,
  Block,
  Button,
  Icon,
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
    }
    
}

useEffect(() => {
  getSchool()
}, [])



  return (
    
    <Page>
        <Navbar title="School Details" backLink="Back" sliding={false} >
            <NavRight>
                <Link popoverOpen=".popover-menu">
                    <Icon>
                        <FaEllipsisV />
                    </Icon>
                </Link>
            </NavRight>
        </Navbar>
        <Popover className="popover-menu">
            <List noChevron noHairlines>
                <ListItem link="#" popoverClose title="Edit School" />
                <ListItem link="#" popoverClose title="Delete School" onClick={()=>{ f7.dialog.confirm('Do You Want To Delete School and Related Entities?', 'Delete School') }} />
            </List>
        </Popover>
        {loading ? (
            <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
                <div><Preloader className="color-multi" size="40px" /></div>
            </PageContent>
        ):
            <>
                {res.school != undefined && 
                    <>
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