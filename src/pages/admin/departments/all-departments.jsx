import React, { useEffect } from 'react';
import {  
    FaBuilding,
    FaTrashAlt,
    FaSearch,
    FaRobot,
    FaEdit,
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
  Searchbar,
  theme,
  Block,
  Preloader,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getDepartmentsAsync, deleteDepartmentAsync } from '../../../redux/departmentSlice';

export default (props) => {
    const { f7router } = props
    const dispatch = useDispatch()
    
    const state = useSelector((state) => state.departments)

    const departments = state.data
    const loading = state.loading
    const error = state.error
    const deleted = state.deleted

    const errorNotification = f7.notification.create({
        icon: '<i class="fa fa-exclamation-circle text-color-red"></i>',
        title: 'Server Error',
        subtitle: 'Cannot access server to complete action.',
        text: 'Please try again later.',
        closeButton: true,
    })

    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        icon: '<i class="fa fa-trash text-color-red"></i>',
        text: 'Department Deleted',
        position: 'bottom',
    })

    const deleteDepartment = (departmentId) => {
        dispatch(deleteDepartmentAsync({id: departmentId}))
    }
    

    useEffect(() => { 
        dispatch(getDepartmentsAsync())
    }, [dispatch])

    if(error && departments.length == 0){
        errorNotification.open()
    }

    if (deleted) {
        deleteToast.open()
    }
    
    return (
    
      
        <Page 
        name="departments" 
        ptr 
        ptrMousewheel={true} 
        onPtrRefresh={(done) => { 
            dispatch(getDepartmentsAsync())
            done()  
        }}>
            <Navbar backLink="Back" sliding title="Departments">
                <NavRight>
                    {departments.length != 0 && 
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
            
            {!error &&
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-department/" />
            }

            <List className="searchbar-not-found">
                <ListItem title="Nothing found"></ListItem>
            </List>

            {loading && departments.length == 0 && 
            <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
                <div>
                    <Preloader className="color-multi" size="40px" color="multi" />
                </div>
            </PageContent>
            }

            {!loading && departments.length == 0 && !error &&
            <PageContent className="display-flex justify-content-center text-align-center">
                <div>
                    <h3>Hmm...There are no departments listed yet.</h3>
                    <Icon size="100px" color="green" className="margin-bottom">
                        <FaRobot />
                    </Icon>
                </div>
            </PageContent>
            }

            <List mediaList className="search-list searchbar-found">
                {departments.map((department)=>
                    <ListItem 
                    swipeout
                    key={department.id}
                    title={`Department of ${department.name}`} 
                    subtitle={`School of ${department.school.name}`}
                    text={department.description}
                    link={`/department/${department.id}`}
                    after={`${department.courses.length} Course(s)`}
                    >
                        <SwipeoutActions left>
                            <SwipeoutButton
                            onClick={()=>{ f7router.navigate(`/edit-department/${department.id}`)}}
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
                                "Do You Want To Delete This Department and It's Related Entities?",
                                'Delete Department',
                                ()=>{deleteDepartment(department.id)}
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
                            bgColor='orange'
                            slot="media"
                        >
                            <FaBuilding color="white" style={{fontSize: '24px'}} />
                        </Block>
                        
                    </ListItem> 
                )}
            </List>
        </Page>
      
    
  );
};
