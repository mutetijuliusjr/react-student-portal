import React, { useState } from 'react';
import { FaSearch, FaRegBuilding, FaTimesCircle, FaEdit, FaDumpster, FaTag, FaAsterisk, FaEnvelope, FaLink, FaPhoneAlt, FaMale, FaCalendar, FaBirthdayCake, FaClock, FaParagraph } from 'react-icons/fa';
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
  List,
  Link,
  ListItem,
  ListInput,
  SkeletonBlock,
  Searchbar,
  Row,
} from 'framework7-react';

export default () => {
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (loading) return
        setLoading(true)
        setTimeout(() => {
        setLoading(false)
        }, 3000)
  }

  const departments= [
    {'id': '1', 'school':'School 1', 'name': 'Test Department 1', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'course_count': '2'},
    {'id': '2', 'school':'School 1', 'name': 'Test Department 2', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'course_count': '4'},
    {'id': '3', 'school':'School 3', 'name': 'Test Department 3', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'course_count': '5'},
    {'id': '4', 'school':'School 1', 'name': 'Test Department 4', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'course_count': '2'},
    {'id': '5', 'school':'School 2', 'name': 'Test Department 5', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'course_count': '1'},
    {'id': '6', 'school':'School 4', 'name': 'Test Department 6', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'course_count': '6'},
  ];

  return (
    
      
    <Page pageAfterIn={setTimeout(() => {setLoading(false)}, 3000)}>
    {/* Top Navbar */}
      <Navbar backLink="Back" sliding={false} title="Departments" />

      {loading ? (
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
      ) : (
        <List mediaList id="search-list">
            {departments.map( (department) => 
                <ListItem
                    className={`schl`}
                    link="#"    
                    key={department.id}
                    title={department.name}
                    subtitle={`Course(s) ${department.course_count}`}
                    text={department.school}
                    popupOpen='#demo'
                >
                    <Icon size="40px" slot="media" color="orange">
                        <FaRegBuilding />
                    </Icon>
                </ListItem>
            )}

        </List>
      )}

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
                        <MenuItem href="#" text="Delete" bgColor="red" onClick={()=>{ f7.dialog.confirm('Do You Want To Delete Department and Related Entities?', 'Delete Department') }} />
                    </Menu>
                    <h3>Description</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                
                    <h3>Course(s)</h3>
                    <List>
                        <ListItem link="#">
                            Course #1
                        </ListItem>
                        <ListItem link="#">
                            Course #1
                        </ListItem>
                        <ListItem link="#">
                            Course #1
                        </ListItem>
                        <ListItem link="#">
                            Course #1
                        </ListItem>
                        <ListItem link="#">
                            Course #1
                        </ListItem>
                        <ListItem link="#">
                            Course #1
                        </ListItem>
                        <ListItem link="#">
                            Course #1
                        </ListItem>
                        <ListItem link="#">
                            Course #1
                        </ListItem>
                        <ListItem link="#">
                            Course #1
                        </ListItem>
                        <ListItem link="#">
                            Course #1
                        </ListItem>
                        <ListItem link="#">
                            Course #1
                        </ListItem>
                    </List>
                </Block>
            </div>
        </Page>
    </Popup>

    <Popup className="demo-popup-swipe" id="edit_school" swipeToClose>
        <Page>
            <Navbar title="Edit Department">
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
};