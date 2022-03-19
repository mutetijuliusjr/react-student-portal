import React from 'react';
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

export default () => {
console.log('School page is openning')
  return (
    
    <Page name="school">
        <Navbar title="School Details" backLink="Back" sliding={false} >
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
                <ListItem link="#" popupOpen="#editSchool" popoverClose title="Edit School" />
                <ListItem link="#" popoverClose title="Add Department" />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete School" 
                onClick={()=>{ f7.dialog.confirm(
                    'Do You Want To Delete School and Related Entities?',
                    'Delete School',
                    )}} />
            </List>
        </Popover>
        <BlockTitle>Name</BlockTitle>
        <Block strong>School of school.name</Block>
        <BlockTitle>Description</BlockTitle>
        <Block strong>school.description</Block>
    </Page>  
  );
};