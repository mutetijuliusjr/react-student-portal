import React, { useState, useEffect } from 'react';
import {  
    FaBuilding, 
    FaTimes, 
    FaTag,  
    FaParagraph, 
    FaExclamationTriangle,
    FaEllipsisV 
} from 'react-icons/fa';
import {
  f7,
  Page,
  Popup,
  Popover,
  Navbar,
  NavRight,
  Button,
  Icon,
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
  Views,
  View,
  PageContent,
} from 'framework7-react';

export default () => {
  console.log('NewSchool is opening')

  return (
    <Page name="new-school">
        <Navbar backLink="Back" sliding  title="Add School" />

        <form>
            <List inlineLabels noHairlines>
                <ListInput
                    label="Name"
                    type="text"
                    placeholder="School name"
                    clearButton={false}
                    required
                    validateOnBlur
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
                    clearButton={false}
                    resizable
                >
                    <Icon color="blue" slot="media">
                        <FaParagraph />
                    </Icon>
                </ListInput>
            </List>
            <Row>
                <Col><Button outline color="red" text="Clear" /></Col>
                <Col><Button outline color="green" text="Save" type="submit" /></Col>
            </Row>
        </form>

    </Page>
  );
};
