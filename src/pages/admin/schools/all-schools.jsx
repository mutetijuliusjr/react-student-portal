import React, {useState, useRef, useEffect} from 'react';
import {  
    FaBuilding, 
    FaTimes, 
    FaTag,  
    FaParagraph, 
    FaExclamationTriangle,
    FaEllipsisV, 
    FaClipboard,
    FaTrashAlt,
    FaSearch
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
  theme,
  Card,
  CardHeader,
  CardContent
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getSchoolsAsync, deleteSchoolAsync } from '../../../redux/schoolSlice';

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
                {schools != null && schools.length != 0 && 
                    <>
                        <NavRight>
                            <Link
                            searchbarEnable=".searchbar-demo"
                            >
                                <Icon>
                                    <FaSearch />
                                </Icon>
                            </Link>
                        </NavRight>
                        <Searchbar
                            className="searchbar-demo"
                            expandable
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            disableButton={!theme.aurora}
                        ></Searchbar>
                    </>
                }
            </Navbar>
            
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-school/" />

            <List className="searchbar-not-found">
                <ListItem title="Nothing found"></ListItem>
            </List>

            {schools == null ? 
                <List mediaList className="skeleton-text skeleton-effect-wave">
                    <ListItem 
                    title="xxxx xxx xxxx xxxxxxx xxxxxxxxx xxxxxx xxxxxxxx"
                    subtitle="xx xxxxxxxxxx x x xxxxxxxxxxxxxxxx x x xxxxxxxxxxxxx"
                    >
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem 
                    title="xxxx xxx xxxx xxxxxxx xxxxxxxxx xxxxxx xxxxxxxx"
                    subtitle="xx xxxxxxxxxx x x xxxxxxxxxxxxxxxx x x xxxxxxxxxxxxx"
                    >
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem 
                    title="xxxx xxx xxxx xxxxxxx xxxxxxxxx xxxxxx xxxxxxxx"
                    subtitle="xx xxxxxxxxxx x x xxxxxxxxxxxxxxxx x x xxxxxxxxxxxxx"
                    >
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem 
                    title="xxxx xxx xxxx xxxxxxx xxxxxxxxx xxxxxx xxxxxxxx"
                    subtitle="xx xxxxxxxxxx x x xxxxxxxxxxxxxxxx x x xxxxxxxxxxxxx"
                    >
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem 
                    title="xxxx xxx xxxx xxxxxxx xxxxxxxxx xxxxxx xxxxxxxx"
                    subtitle="xx xxxxxxxxxx x x xxxxxxxxxxxxxxxx x x xxxxxxxxxxxxx"
                    >
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem 
                    title="xxxx xxx xxxx xxxxxxx xxxxxxxxx xxxxxx xxxxxxxx"
                    subtitle="xx xxxxxxxxxx x x xxxxxxxxxxxxxxxx x x xxxxxxxxxxxxx"
                    >
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem 
                    title="xxxx xxx xxxx xxxxxxx xxxxxxxxx xxxxxx xxxxxxxx"
                    subtitle="xx xxxxxxxxxx x x xxxxxxxxxxxxxxxx x x xxxxxxxxxxxxx"
                    >
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem 
                    title="xxxx xxx xxxx xxxxxxx xxxxxxxxx xxxxxx xxxxxxxx"
                    subtitle="xx xxxxxxxxxx x x xxxxxxxxxxxxxxxx x x xxxxxxxxxxxxx"
                    >
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem 
                    title="xxxx xxx xxxx xxxxxxx xxxxxxxxx xxxxxx xxxxxxxx"
                    subtitle="xx xxxxxxxxxx x x xxxxxxxxxxxxxxxx x x xxxxxxxxxxxxx"
                    >
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem 
                    title="xxxx xxx xxxx xxxxxxx xxxxxxxxx xxxxxx xxxxxxxx"
                    subtitle="xx xxxxxxxxxx x x xxxxxxxxxxxxxxxx x x xxxxxxxxxxxxx"
                    >
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                    <ListItem 
                    title="xxxx xxx xxxx xxxxxxx xxxxxxxxx xxxxxx xxxxxxxx"
                    subtitle="xx xxxxxxxxxx x x xxxxxxxxxxxxxxxx x x xxxxxxxxxxxxx"
                    >
                        <SkeletonBlock
                            style={{ width: '29px', height: '29px'}}
                            slot="media"
                        />
                    </ListItem>
                </List>
                :
                <>
                {schools == 'error' ?
                <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
                    <div>
                        <Icon size="48px" color="red">
                            <FaExclamationTriangle />
                        </Icon>
                        <Card>
                            <CardHeader text="Error" />
                            <CardContent>
                                <p>Tr again later.</p>
                            </CardContent>
                        </Card>
                        <p>Error</p>
                        <p>jigbbk</p>
                    </div>
                </PageContent>
                :
                <>
                {schools.length == 0 ? 
                    <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
                        <Icon size="48px">
                            <FaExclamationTriangle />
                        </Icon>
                        <p>Hmm...</p>
                        <p>There are no schools listed.</p>
                        <p>Yet.</p>
                    </PageContent>
                    :
                    <List mediaList className="search-list searchbar-found">
                        {schools.map((school)=>
                            <ListItem 
                            swipeout 
                            key={school.id}
                            title={`School of ${school.name}`} 
                            subtitle={school.description}
                            link={`/school/${school.id}`}
                            >
                                <SwipeoutActions right>
                                    <SwipeoutButton
                                    delete
                                    confirmTitle="Delete School"
                                    confirmText="Are you sure you want to delete this school?"
                                    text="Delete"
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
                </>
                }
                </>
                
            }  
        </Page>
      
    
  );
};
