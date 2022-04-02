import React, { useEffect } from 'react';
import {  
    FaBuilding,
    FaTrashAlt,
    FaSearch,
    FaRobot,
    FaEdit,
    FaExclamationCircle
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
  BlockTitle,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getSchoolsAsync, deleteSchoolAsync } from '../../../redux/schoolSlice';

export default (props) => {
    const { f7router } = props
    const dispatch = useDispatch()
    
    const state = useSelector((state) => state.schools)

    const schools = state.data
    const loading = state.loading
    const error = state.error
    const updated = state.updated

    const errorNotification = f7.notification.create({
        icon: '<i class="fa fa-exclamation-circle text-color-red"></i>',
        title: 'Server Error',
        subtitle: 'Cannot retrive schools list.',
        text: 'Please try again later.',
        closeButton: true,
    })

    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'School Deleted',
        position: 'bottom',
    })

    const deleteSchool = (schoolId) => {
        dispatch(deleteSchoolAsync({id: schoolId}))
    }
    

    useEffect(() => { 
        dispatch(getSchoolsAsync())
    }, [dispatch])

    if(error && schools.length == 0){
        errorNotification.open()
    }

    if (updated) {
        deleteToast.open()
    }
    
    return (
    
      
        <Page 
        name="schools" 
        ptr 
        ptrMousewheel={true} 
        onPtrRefresh={(done)=>{ 
            dispatch(getSchoolsAsync())
            done()
        }}>
            <Navbar backLink="Back" sliding title="Schools">
                <NavRight>
                    {schools.length != 0 && 
                    <Link
                    searchbarEnable=".searchbar-demo"
                    >
                        <Icon>
                            <FaSearch />
                        </Icon>
                    </Link>
                    }
                </NavRight>
                {!loading &&
                <Searchbar
                    className="searchbar-demo"
                    expandable
                    searchContainer=".search-list"
                    searchIn=".item-title"
                    disableButton={!theme.aurora}
                ></Searchbar>
                }
            </Navbar>
            
            {!error && schools.length != 0 &&
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-school/" />
            }

            <List className="searchbar-not-found">
                <ListItem title="Nothing found"></ListItem>
            </List>

            {loading && schools.length == 0 && 
            <List mediaList className="skeleton-text">
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
            }

            {!loading && schools.length == 0 && !error &&
            <PageContent className="display-flex justify-content-center text-align-center">
                <div>
                    <h3>Hmm...There are no schools listed yet.</h3>
                    <Icon size="100px" color="green" className="margin-bottom">
                        <FaRobot />
                    </Icon>
                </div>
            </PageContent>
            }

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
        </Page>
      
    
  );
};
