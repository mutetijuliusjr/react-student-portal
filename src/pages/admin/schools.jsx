import React from 'react';
import { FaSearch, FaBuilding, FaTimesCircle, FaEdit, FaDumpster, FaTag, FaAsterisk, FaEnvelope, FaLink, FaPhoneAlt, FaMale, FaCalendar, FaBirthdayCake, FaClock, FaParagraph } from 'react-icons/fa';
import {
  f7,
  Page,
  Popup,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Menu,
  MenuItem,
  Toolbar,
  Block,
  BlockTitle,
  Icon,
  List,
  Link,
  ListItem,
  ListInput,
  Searchbar,
  Segmented,
  Subnavbar,
  Row,
  Col,
  Button,
  Card,
  f7ready
} from 'framework7-react';

const schools= [
    {'id': '1', 'name': 'test school 1', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'department_count': '2'},
    {'id': '2', 'name': 'test school 2', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'department_count': '4'},
    {'id': '3', 'name': 'test school 3', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'department_count': '5'},
    {'id': '4', 'name': 'test school 4', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'department_count': '2'},
    {'id': '5', 'name': 'test school 5', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'department_count': '1'},
    {'id': '6', 'name': 'test school 6', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'department_count': '6'},
];

const SchoolsPage = () => (
  <Page name="schools">
    {/* Top Navbar */}
    <Navbar backLink="Back" sliding={false} title="Schools">
        <NavRight>
            <Link searchbarEnable=".searchbar-demo">
                <FaSearch />
            </Link>
        </NavRight>
        <Searchbar
            className="searchbar-demo"
            expandable
            searchContainer=".search-list"
            searchIn=".title"
        ></Searchbar>
    </Navbar>

    {/* Page content */}

    <List className="searchbar-not-found">
      <ListItem title="Nothing found" />
    </List>
    <List className="search-list searchbar-found">
    
    {schools.map(school => (
        <ListItem key={school.id} 
                  link="#" title={school.name} 
                  badgeColor="purple" 
                  badge={school.department_count +' dept(s)'}
                  style={{textTransform:'capitalize'}}
                  popupOpen='#demo'
        >
            <Icon slot="media" color="purple">
                <FaBuilding />
            </Icon>
        </ListItem>
    ))}

    </List>
    
    <Popup id="demo" className="demo-popup-swipe" swipeToClose>
        <Page>
            <Navbar title="Title" style={{textTransform:'capitalize'}}>
                <NavRight>
                    <Link popupClose tooltip="Close">
                        <FaTimesCircle />
                    </Link>
                </NavRight>
            </Navbar>

            <div
                style={{ height: '100%' }}
                className="display-flex justify-content-center"
                >
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
                
                    <h3>Department(s)</h3>
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
                </Block>
            </div>
        </Page>
    </Popup>

    <Popup className="demo-popup-swipe" id="edit_school" swipeToClose>
        <Page>
            <Navbar title="Edit School">
                <NavRight>
                    <Link popupClose tooltip="Close">
                        <FaTimesCircle />
                    </Link>
                </NavRight>
            </Navbar>

            <List inlineLabels noHairlines>
                <ListInput
                    label="Name"
                    type="text"
                    placeholder="Your name"
                    clearButton
                >
                    <Icon color="blue" slot="media">
                        <FaTag />
                    </Icon>
                </ListInput>
                <ListInput
                    label="Password"
                    type="password"
                    placeholder="Your password"
                    clearButton
                >
                    <Icon color="blue" slot="media">
                        <FaAsterisk />
                    </Icon>
                </ListInput>
                <ListInput
                    label="E-mail"
                    type="email"
                    placeholder="Your e-mail"
                    clearButton
                >
                    <Icon color="blue" slot="media">
                        <FaEnvelope />
                    </Icon>
                </ListInput>
                <ListInput
                    label="URL"
                    type="url"
                    placeholder="URL"
                    clearButton
                >
                    <Icon color="blue" slot="media">
                        <FaLink />
                    </Icon>
                </ListInput>
                <ListInput
                    label="Phone"
                    type="tel"
                    placeholder="Your phone number"
                    clearButton
                >
                    <Icon color="blue" slot="media">
                        <FaPhoneAlt />
                    </Icon>
                </ListInput>
                <ListInput
                    label="Gender"
                    type="select"
                    defaultValue="Male"
                    placeholder="Please choose..."
                >
                    <Icon color="blue" slot="media">
                        <FaMale />
                    </Icon>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </ListInput>
                <ListInput
                    label="Birthday"
                    type="date"
                    defaultValue="2014-04-30"
                    placeholder="Please choose..."
                >
                    <Icon color="blue" slot="media">
                        <FaBirthdayCake />
                    </Icon>
                </ListInput>
                <ListInput
                    label="Date time"
                    type="datetime-local"
                    placeholder="Please choose..."
                >
                    <Icon color="blue" slot="media">
                        <FaClock />
                    </Icon>
                </ListInput>
                <ListInput
                    label="Textarea"
                    type="textarea"
                    placeholder="Bio"
                >
                    <Icon color="blue" slot="media">
                        <FaParagraph />
                    </Icon>
                </ListInput>
                <ListInput
                    label="Resizable"
                    type="textarea"
                    resizable
                    placeholder="Bio"
                >
                    <Icon color="blue" slot="media">
                        <FaParagraph />
                    </Icon>
                </ListInput>
            </List>

        </Page>
    </Popup>
    
  </Page>
);
export default SchoolsPage;