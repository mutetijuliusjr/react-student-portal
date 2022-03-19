import React, {useState, useRef, useEffect} from 'react';
import {  
    FaBuilding, 
    FaTimes, 
    FaTag,  
    FaParagraph, 
    FaExclamationTriangle,
    FaEllipsisV, 
    FaClipboard,
    FaTrashAlt
} from 'react-icons/fa';
import {
  f7,
  Fab,
  Page,
  Popup,
  Popover,
  PageContent,
  Navbar,
  NavRight,
  Treeview,
  TreeviewItem,
  Checkbox,
  Block,
  Button,
  BlockTitle,
  Icon,
  List,
  Link,
  ListItem,
  ListInput,
  SwipeoutActions,
  SwipeoutButton,
  SkeletonBlock,
  Searchbar,
  Subnavbar,
  Row,
  Col,
  theme
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getSchoolsAsync } from '../../../redux/schoolSlice';

export default (props) => {
    const {f7route, f7router} = props
    const dispatch = useDispatch()
    const schools = useSelector((state) => state.schools)

    const openSchool = (id) => {
        f7router.navigate(`/school/${id}`);
    };
    const onDeleted = () => {
        f7.dialog.alert('Thanks, item removed!');
    };

    useEffect(() => { 
        dispatch(getSchoolsAsync())
    }, [dispatch])

    return (
    
      
        <Page name="schools">
            <Navbar backLink="Back" sliding title="Schools">
            </Navbar>
            
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-school/" />

            {schools == null ? 
                <List mediaList className="skeleton-text skeleton-effect-wave">
                    <ListItem title="School of fffffffffffff fffffffff">
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem title="School of fffffffffffff fffffffff">
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem title="School of fffffffffffff fffffffff">
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem title="School of fffffffffffff fffffffff">
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem title="School of fffffffffffff fffffffff">
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem title="School of fffffffffffff fffffffff">
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem title="School of fffffffffffff fffffffff">
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem title="School of fffffffffffff fffffffff">
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem title="School of fffffffffffff fffffffff">
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem title="School of fffffffffffff fffffffff">
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem title="School of fffffffffffff fffffffff">
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                </List>
                :
                <List mediaList>
                    {schools.map((school)=>
                        <ListItem swipeout title={`School of ${school.name}`} key={school.id}>
                            <SwipeoutActions right>
                                <SwipeoutButton color="blue" href={`/school/${school.id}`}>
                                    <Icon>
                                        <FaClipboard />
                                    </Icon>
                                </SwipeoutButton>
                                <SwipeoutButton
                                delete
                                confirmTitle="Delete School"
                                confirmText="Are you sure you want to delete this school?"
                                >
                                    <Icon>
                                        <FaTrashAlt />
                                    </Icon>
                                </SwipeoutButton>
                            </SwipeoutActions>
                            <Icon slot="media" size="29px" color="purple">
                                <FaBuilding />
                            </Icon>
                        </ListItem> 
                        )
                    }
                    
                </List>
            }

            
            
        </Page>
      
    
  );
};
