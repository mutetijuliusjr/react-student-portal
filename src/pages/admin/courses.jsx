import React from 'react';
import { FaBars, FaUserCircle, FaSearch, FaGraduationCap } from 'react-icons/fa';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Toolbar,
  Block,
  BlockTitle,
  Icon,
  Link,
  List,
  ListItem,
  Searchbar,
  Subnavbar,
  Row,
  Col,
  Button,
  Card
} from 'framework7-react';

const CoursesPage = () => (
  <Page name="courses">
    {/* Top Navbar */}
    <Navbar backLink="Back" sliding={false} title="Courses">
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
      <ListItem title="Nothing found"></ListItem>
    </List>
    <List className="search-list searchbar-found">
        <ListItem link="#" title="Course #1" badgeColor="red" badge="3 semester(s)">
            <Icon slot="media" color="red">
                <FaGraduationCap />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Course #1" badgeColor="red" badge="3 semester(s)">
            <Icon slot="media" color="red">
                <FaGraduationCap />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Course #1" badgeColor="red" badge="3 semester(s)">
            <Icon slot="media" color="red">
                <FaGraduationCap />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Course #1" badgeColor="red" badge="3 semester(s)">
            <Icon slot="media" color="red">
                <FaGraduationCap />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Course #1" badgeColor="red" badge="3 semester(s)">
            <Icon slot="media" color="red">
                <FaGraduationCap />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Course #1" badgeColor="red" badge="3 semester(s)">
            <Icon slot="media" color="red">
                <FaGraduationCap />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Course #1" badgeColor="red" badge="3 semester(s)">
            <Icon slot="media" color="red">
                <FaGraduationCap />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Course #1" badgeColor="red" badge="3 semester(s)">
            <Icon slot="media" color="red">
                <FaGraduationCap />
            </Icon>
        </ListItem>
    </List>

  </Page>
);
export default CoursesPage;