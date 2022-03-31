import React, { useEffect } from 'react';
import {  
    FaBuilding,
    FaExclamationTriangle,
    FaTrashAlt,
    FaSearch,
    FaRobot,
    FaEdit
} from 'react-icons/fa';
import {
  f7,
  Fab,
  Page,
  PageContent,
  Navbar,
  NavRight,
  Icon,
  List,
  Link,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  SkeletonBlock,
  Searchbar,
  theme,
  Button,
  Block,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getSchoolsAsync, deleteSchoolAsync } from '../../../redux/schoolSlice';

export default (props) => {
    const { f7router } = props
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
                    <List mediaList className="skeleton-text skeleton-effect-fade">
                        <ListItem
                        title="Title"
                        subtitle="Subtitle"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
                        >
                        <SkeletonBlock
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            slot="media"
                        />
                        </ListItem>
                        <ListItem
                        title="Title"
                        subtitle="Subtitle"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
                        >
                        <SkeletonBlock
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            slot="media"
                        />
                        </ListItem>
                        <ListItem
                        title="Title"
                        subtitle="Subtitle"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
                        >
                        <SkeletonBlock
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            slot="media"
                        />
                        </ListItem>
                        <ListItem
                        title="Title"
                        subtitle="Subtitle"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
                        >
                        <SkeletonBlock
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            slot="media"
                        />
                        </ListItem>
                        <ListItem
                        title="Title"
                        subtitle="Subtitle"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
                        >
                        <SkeletonBlock
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            slot="media"
                        />
                        </ListItem>
                        <ListItem
                        title="Title"
                        subtitle="Subtitle"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
                        >
                        <SkeletonBlock
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
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
                    <PageContent className="display-flex justify-content-center text-align-center">
                        <div>
                            <h3>Hmm...There are no schools listed yet.</h3>
                            <Icon size="100px" color="green" className="margin-bottom">
                                <FaRobot />
                            </Icon>
                            <Button color="green" text="Add Department" href="/new-department/" fill round />
                        </div>
                    </PageContent>
                    :
                    <List mediaList className="search-list searchbar-found">
                        {schools.map((school)=>
                            <ListItem 
                            swipeout
                            key={school.id}
                            title={`School of ${school.name}`} 
                            subtitle={`${school.departments.length} Department(s)`}
                            text={school.description}
                            link={`/school/${school.id}`}
                            >
                                <SwipeoutActions left>
                                    <SwipeoutButton
                                    onClick={()=>{ f7router.navigate(`/edit-school/${school.id}`)}}
                                    overswipe
                                    color="blue"
                                    text="Edit"
                                    >
                                        <Icon>
                                            <FaEdit />
                                        </Icon>
                                    </SwipeoutButton>
                                </SwipeoutActions>
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
                                <Block
                                    style={{ 
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        margin: '0',
                                        padding: '8px',
                                     }}
                                    bgColor='purple'
                                    slot="media"
                                >
                                    <FaBuilding style={{fontSize: '24px'}} />
                                </Block>
                                
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
