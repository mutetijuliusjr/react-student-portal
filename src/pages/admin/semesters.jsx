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
  Card
} from 'framework7-react';

const SemestersPage = () => (
  <Page name="semesters">
    {/* Top Navbar */}
    <Navbar backLink="Back" sliding={false} title="Semesters">
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
        <ListItem link="#" title="Semester #1" badgeColor="green" badge="6 units(s)">
            <Icon slot="media" color="green">
                <FaClipboard />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Semester #1" badgeColor="green" badge="6 units(s)">
            <Icon slot="media" color="green">
                <FaClipboard />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Semester #1" badgeColor="green" badge="6 units(s)">
            <Icon slot="media" color="green">
                <FaClipboard />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Semester #1" badgeColor="green" badge="6 units(s)">
            <Icon slot="media" color="green">
                <FaClipboard />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Semester #1" badgeColor="green" badge="6 units(s)">
            <Icon slot="media" color="green">
                <FaClipboard />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Semester #1" badgeColor="green" badge="6 units(s)">
            <Icon slot="media" color="green">
                <FaClipboard />
            </Icon>
        </ListItem>
        <ListItem link="#" title="Semester #1" badgeColor="green" badge="6 units(s)">
            <Icon slot="media" color="green">
                <FaClipboard />
            </Icon>
        </ListItem>
    </List>

  </Page>
);
export default SemestersPage;