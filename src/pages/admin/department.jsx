import React, { useState, useEffect } from 'react';
import {
    FaEllipsisV,
    FaTimesCircle,
    FaTag,
    FaParagraph
} from 'react-icons/fa';

import {
  Col,
  Page,
  Popover,
  Preloader,
  Navbar,
  Block,
  Button,
  Icon,
  NavRight,
  Link,
  List,
  ListItem,
  ListInput,
  BlockTitle,
  f7,
  Row,
  Popup,
} from 'framework7-react';

export default (props) => {

const { f7router } = props


  return (
    
    <Page name="department">
        <Navbar title="Department Details" backLink="Back" sliding={false} >
            <NavRight>
                <Link popoverOpen=".popover-menu">
                    <Icon>
                        <FaEllipsisV />
                    </Icon>
                </Link>
            </NavRight>
        </Navbar>
        <Popover className="popover-menu">
            <List noChevron noHairlines>
                <ListItem link="#" popupOpen="#editDepartment" popoverClose title="Edit Department" />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete Department" 
                onClick={()=>{ f7.dialog.confirm(
                    'Do You Want To Delete Department and Related Entities?',
                    'Delete Department') 
                    }} />
            </List>
        </Popover>
        <BlockTitle>Name</BlockTitle>
        <Block strong>Department of {department.name}</Block>
        <BlockTitle>Description</BlockTitle>
        <Block strong>{department.description}</Block>        
               
        
        <Popup className="demo-popup-swipe" id="editDepartment" swipeToClose>
            <Page>
                <Navbar title="Edit Department">
                    <NavRight>
                        <Link popupClose tooltip="Close">
                            <FaTimesCircle />
                        </Link>
                    </NavRight>
                </Navbar>

                <form onSubmit={onSubmit}>
                    <List inlineLabels noHairlines>
                        <ListInput
                            label="Name"
                            type="text"
                            placeholder="Department name"
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
                            placeholder="Department Description"
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
                        <Col><Button outline color="green" text="Save" type="submit" /></Col>
                    </Row>
                </form>

            </Page>
        </Popup>
    </Page>  
  );
};