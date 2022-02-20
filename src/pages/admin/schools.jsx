import React, { useState, useEffect } from 'react';
import { FaPlus, FaBuilding, FaTimesCircle, FaTag, FaAsterisk, FaEnvelope, FaLink, FaPhoneAlt, FaMale, FaBirthdayCake, FaClock, FaParagraph } from 'react-icons/fa';
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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const schools = useSelector((state) => state.schools)

  {/* Find out how to check a promise state */}
  useEffect(() => {
    dispatch(getSchoolsAsync())
  }, [dispatch])

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
    
    {schools.length > 0 ? (
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
        ) : (
        
        <List mediaList v-if="loading">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <ListItem
                key={n}
                className={`skeleton-text skeleton-effect-wave`}
                title="Full Name"
                subtitle="Position"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis. Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi aliquet urna, nec imperdiet felis sapien at enim."
            >
                <SkeletonBlock
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                slot="media"
                />
            </ListItem>
            ))}
        </List>
    )}   

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