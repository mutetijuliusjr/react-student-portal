import React from 'react';
import { FaBars, FaUserCircle, FaSearch, FaClipboard } from 'react-icons/fa';
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
  Card,
  Badge
} from 'framework7-react';

const UsersPage = () => (
  <Page name="users">
    {/* Top Navbar */}
    <Navbar backLink="Back" sliding={false} title="Users">
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
        <ListItem link="#" header="Email" title="john@framework7" footer="Student, Teacher, Other" after="Edit">
            <Icon slot="media" color="teal">
                <FaUserCircle />
            </Icon>
        </ListItem>
        <ListItem link="#" header="Email" title="john@framework7" footer="Student, Teacher, Other" after="Edit">
            <Icon slot="media" color="teal">
                <FaUserCircle />
            </Icon>
        </ListItem>
        <ListItem link="#" header="Email" title="john@framework7" footer="Student, Teacher, Other" after="Edit">
            <Icon slot="media" color="teal">
                <FaUserCircle />
            </Icon>
        </ListItem>
        <ListItem link="#" header="Email" title="john@framework7" footer="Student, Teacher, Other" after="Edit">
            <Icon slot="media" color="teal">
                <FaUserCircle />
            </Icon>
        </ListItem>
        <ListItem link="#" header="Email" title="john@framework7" footer="Student, Teacher, Other" after="Edit">
            <Icon slot="media" color="teal">
                <FaUserCircle />
            </Icon>
        </ListItem>
        <ListItem link="#" header="Email" title="john@framework7" footer="Student, Teacher, Other" after="Edit">
            <Icon slot="media" color="teal">
                <FaUserCircle />
            </Icon>
        </ListItem>
        <ListItem link="#" header="Email" title="john@framework7" footer="Student, Teacher, Other" after="Edit">
            <Icon slot="media" color="teal">
                <FaUserCircle />
            </Icon>
        </ListItem>
    </List>

  </Page>
);
export default UsersPage;