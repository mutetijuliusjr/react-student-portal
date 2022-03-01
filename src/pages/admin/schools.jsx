import React, { useState, useEffect } from 'react';
import { FaPlus, FaBuilding, FaTimesCircle, FaTag, FaAsterisk, FaEnvelope, FaLink, FaPhoneAlt, FaMale, FaBirthdayCake, FaClock, FaParagraph, FaExclamationTriangle } from 'react-icons/fa';
import {
  f7,
  Page,
  Popup,
  Menu,
  MenuItem,
  Navbar,
  NavRight,
  Block,
  Button,
  BlockTitle,
  Icon,
  Fab,
  List,
  Link,
  ListItem,
  ListInput,
  SkeletonBlock,
  Searchbar,
  Subnavbar,
  Row,
  Col,
  theme,
  PageContent,
  Preloader
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getSchoolsAsync } from '../../redux/schoolSlice';

export default () => {
  const dispatch = useDispatch()
  const schools = useSelector((state) => state.schools)

  useEffect(() => { 
    dispatch(getSchoolsAsync());
  }, [dispatch])


  console.log(schools == null)

  return (
    
      
    <Page>
    {/* Top Navbar */}
      <Navbar backLink="Back" sliding={false} title="Schools">
        <NavRight>
            <Menu>
                <MenuItem text="New School" popupOpen='#newSchool' bgColor="green" />
            </Menu>
        </NavRight>
      </Navbar>      
    
    {schools == null ? 
        <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
            <div><Preloader className="color-multi" size="40px" /></div>
        </PageContent>
    :
        <>
            {schools.length == 0 ? 
            <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
                <div>
                    <Icon size="48px">
                        <FaExclamationTriangle />
                    </Icon>
                    <p>There are no schools listed yet.</p>
                </div>
            </PageContent>
            :
            <List mediaList className={`search-list`}>
                {schools.map( (school) => 
                    <ListItem
                        link={`/school/${school.id}`}    
                        key={school.id}
                        title={school.name}
                        text={school.description}
                    >
                        <Icon size="40px" slot="media" color="purple">
                            <FaBuilding />
                        </Icon>
                    </ListItem>
                )}
            </List> 
            } 
        </>
    }

    

    {/* <List mediaList className={`search-list`}>
        {schools.map( (school) => 
            <ListItem
                link={`/school/${school.id}`}    
                key={school.id}
                title={school.name}
                text={school.description}
            >
                <Icon size="40px" slot="media" color="purple">
                    <FaBuilding />
                </Icon>
            </ListItem>
        )}
    </List> */}

    <Popup className="demo-popup-swipe" id="newSchool" swipeToClose>
        <Page>
            <Navbar title="Add School">
                <NavRight>
                    <Link popupClose tooltip="Close">
                        <FaTimesCircle />
                    </Link>
                </NavRight>
            </Navbar>

            <form>
                <List inlineLabels noHairlines>
                    <ListInput
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="School name"
                        clearButton
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
                        resizable
                    >
                        <Icon color="blue" slot="media">
                            <FaParagraph />
                        </Icon>
                    </ListInput>
                </List>
                <Row>
                    <Col><Button outline color="red" text="Clear" type="reset" /></Col>
                    <Col><Button outline color="green" text="Save" type="submit" /></Col>
                </Row>
            </form>

        </Page>
    </Popup>
    

    </Page>
      
    
  );
};