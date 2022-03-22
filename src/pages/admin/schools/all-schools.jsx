import React, { useEffect } from 'react';
import {  
    FaBuilding,
    FaExclamationTriangle,
    FaTrashAlt,
    FaSearch
} from 'react-icons/fa';
import {
  f7,
  Fab,
  Page,
  PageContent,
  Navbar,
  NavRight,
  List,
  Link,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  SkeletonBlock,
  Searchbar,
  theme,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getSchoolsAsync, deleteSchoolAsync } from '../../../redux/schoolSlice';

export default () => {

    const dispatch = useDispatch()
    const schools = useSelector((state) => state.schools)

    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'School Deleted',
        position: 'bottom',
    })

    const deleteSchool = (schoolId) => {
        deleteToast.open()
        dispatch(deleteSchoolAsync({id: schoolId}))
    }

    useEffect(() => { 
        dispatch(getSchoolsAsync())
    }, [dispatch])

    return (
    
      
        <Page name="schools">
            <Navbar backLink="Back" sliding title="Schools">
                {schools != null && schools != 'error' && schools.length != 0 && 
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
            
            {schools != null && schools != 'error' && schools.length != 0 &&
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-school/" />
            }
            
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
                <PageContent className="display-flex justify-content-center text-align-center">
                    <div>
                        <h3>Error!</h3>
                        <Icon size="100px" color="red">
                            <FaExclamationTriangle />
                        </Icon>
                        <p>Something happened.</p>
                        <p>Try again later.</p>
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
                                    onClick={()=>{ f7.dialog.confirm(
                                        "Do You Want To Delete This School and It's Related Entities?",
                                        'Delete School',
                                        ()=>{deleteSchool(school.id)}
                                        )}}
                                    overswipe
                                    color="red"
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
                        )}
                    </List>
                    }
                </>
                }
                </>
                
            }  
        </Page>
      
    
  );
};
