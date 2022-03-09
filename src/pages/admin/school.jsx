import React, { useState, useEffect } from 'react';
import {
    FaEllipsisV,
    FaTimesCircle,
    FaTag,
    FaParagraph
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
  NavRight,
  Link,
  List,
  ListItem,
  ListInput,
  BlockTitle,
  f7,
  Row,
  Popup,
  View,
  Views,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { editSchoolAsync, deleteSchoolAsync } from '../../redux/schoolSlice';

export default (props, {router}) => {

const dispatch = useDispatch()
const schools = useSelector((state) => state.schools)
const school = schools.find(sch => sch.id == props.id) 
var schDesc = ""

if(school.description != null){
   schDesc = school.description
}

const [schoolName, setSchoolName] = useState(school.name)
const [schoolDesc, setSchoolDesc] = useState(schDesc)

const onSubmit = (event) => {
    event.preventDefault();
    f7.dialog.preloader('Loading', 'multi')
    dispatch(
        editSchoolAsync({
            id: props.id,
            name: schoolName,
            description: schoolDesc
        })
    )
    f7.dialog.close()
    f7.dialog.alert('Saved!')
}

const deleteSchool = () => {
    f7.dialog.close()
    f7.dialog.preloader('Loading', 'multi')
    //dispatch(deleteSchoolAsync({id: props.id}))
    f7.dialog.close()
    f7.dialog.alert('Deleted!')
}


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
                <ListItem link="#" popupOpen="#editSchool" popoverClose title="Edit School" />
                <ListItem link="#" popoverClose title="Delete School" onClick={()=>{ f7.dialog.confirm('Do You Want To Delete School and Related Entities?',
                                                                                                        'Delete School',
                                                                                                        ()=>{deleteSchool()}) }} />
            </List>
        </Popover>
        <BlockTitle>School Of {school.name}</BlockTitle>
        <BlockTitle>Description</BlockTitle>
        <Block>{school.description}</Block>
        
        <Popup className="demo-popup-swipe" id="editSchool" swipeToClose>
            <Page>
                <Navbar title="Edit School">
                    <NavRight>
                        <Link popupClose tooltip="Close">
                            <FaTimesCircle />
                        </Link>
                    </NavRight>
                </Navbar>

                <form onSubmit={onSubmit}>
                    <List inlineLabels noHairlines>
                        <ListInput
                            label="Name"
                            type="text"
                            placeholder="School name"
                            clearButton={false}
                            required
                            validateOnBlur
                            value={schoolName}
                            onChange={(event) => setSchoolName(event.target.value)}
                        >
                            <Icon color="blue" slot="media">
                                <FaTag />
                            </Icon>
                        </ListInput>
                        <ListInput
                            label="Description"
                            type="textarea"
                            placeholder="School Description"
                            name="description"
                            clearButton={false}
                            resizable
                            value={schoolDesc}
                            onChange={(event) => setSchoolDesc(event.target.value)}
                        >
                            <Icon color="blue" slot="media">
                                <FaParagraph />
                            </Icon>
                        </ListInput>
                    </List>
                    <Row>
                        <Col><Button outline color="green" text="Save" type="submit" /></Col>
                    </Row>
                </form>

            </Page>
        </Popup>
    </Page>  
  );
};