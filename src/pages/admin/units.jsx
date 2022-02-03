import React from 'react';
import { FaBars, FaUserCircle, FaSearch, FaBookOpen } from 'react-icons/fa';
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

const UnitsPage = () => (
  <Page name="units">
    {/* Top Navbar */}
    <Navbar backLink="Back" sliding={false} title="Units">
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
        <ListItem link="#" header="ADCB1234" title="Unit Title Here" after="Edit">
            <Icon slot="media" color="blue">
                <FaBookOpen />
            </Icon>
        </ListItem>
        <ListItem link="#" header="ADCB1234" title="Unit Title Here" after="Edit">
            <Icon slot="media" color="blue">
                <FaBookOpen />
            </Icon>
        </ListItem>
        <ListItem link="#" header="ADCB1234" title="Unit Title Here" after="Edit">
            <Icon slot="media" color="blue">
                <FaBookOpen />
            </Icon>
        </ListItem>
        <ListItem link="#" header="ADCB1234" title="Unit Title Here" after="Edit">
            <Icon slot="media" color="blue">
                <FaBookOpen />
            </Icon>
        </ListItem>
        <ListItem link="#" header="ADCB1234" title="Unit Title Here" after="Edit">
            <Icon slot="media" color="blue">
                <FaBookOpen />
            </Icon>
        </ListItem>
        <ListItem link="#" header="ADCB1234" title="Unit Title Here" after="Edit">
            <Icon slot="media" color="blue">
                <FaBookOpen />
            </Icon>
        </ListItem>
    </List>

  </Page>
);
export default UnitsPage;