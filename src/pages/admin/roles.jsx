import React from 'react';
import { FaBars, FaUserCircle, FaSearch, FaClipboard, FaClipboardCheck } from 'react-icons/fa';
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

const RolesPage = () => (
  <Page name="roles">
    {/* Top Navbar */}
    <Navbar backLink="Back" sliding={false} title="Roles">
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
        <ListItem link="#" title="Role #1" badgeColor="gray" badge="10 user(s)">
            <Icon slot="media" color="gray">
                <FaClipboardCheck />
            </Icon>
        </ListItem>
    </List>

  </Page>
);
export default RolesPage;