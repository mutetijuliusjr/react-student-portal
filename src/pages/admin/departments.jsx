import React from 'react';
import { FaBars, FaUserCircle, FaSearch, FaRegBuilding } from 'react-icons/fa';
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

const DepartmentsPage = () => (
  <Page name="departments">
    {/* Top Navbar */}
    <Navbar backLink="Back" sliding={false} title="Departments">
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
        <ListItem link="#" title="Department 1" badgeColor="orange" badge="4 courses(s)">
            <Icon slot="media" color="orange">
                <FaRegBuilding />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Department 1" badgeColor="orange" badge="4 courses(s)">
            <Icon slot="media" color="orange">
                <FaRegBuilding />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Department 1" badgeColor="orange" badge="4 courses(s)">
            <Icon slot="media" color="orange">
                <FaRegBuilding />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Department 1" badgeColor="orange" badge="4 courses(s)">
            <Icon slot="media" color="orange">
                <FaRegBuilding />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Department 1" badgeColor="orange" badge="4 courses(s)">
            <Icon slot="media" color="orange">
                <FaRegBuilding />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Department 1" badgeColor="orange" badge="4 courses(s)">
            <Icon slot="media" color="orange">
                <FaRegBuilding />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Department 1" badgeColor="orange" badge="4 courses(s)">
            <Icon slot="media" color="orange">
                <FaRegBuilding />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Department 1" badgeColor="orange" badge="4 courses(s)">
            <Icon slot="media" color="orange">
                <FaRegBuilding />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Department 1" badgeColor="orange" badge="4 courses(s)">
            <Icon slot="media" color="orange">
                <FaRegBuilding />
            </Icon>
        </ListItem>
        
    </List>

  </Page>
);
export default DepartmentsPage;