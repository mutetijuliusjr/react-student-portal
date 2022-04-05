import React, { useEffect } from 'react';
import {
    FaTrashAlt,
    FaSearch,
    FaRobot,
    FaEdit,
    FaGraduationCap,
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
import { getCoursesAsync, deleteCourseAsync } from '../../../redux/courseSlice';

export default (props) => {
    const { f7router } = props
    const dispatch = useDispatch()
    
    const state = useSelector((state) => state.courses)

    const courses = state.data
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
        text: 'Course Deleted',
        position: 'bottom',
    })

    const deleteCourse = (courseId) => {
        dispatch(deleteCourseAsync({id: courseId}))
    }
    

    useEffect(() => { 
        dispatch(getCoursesAsync())
    }, [dispatch])

    if(error && courses.length == 0){
        errorNotification.open()
    }

    if (deleted) {
        deleteToast.open()
    }
    
    return (
    
      
        <Page 
        name="courses" 
        ptr 
        ptrMousewheel={true} 
        onPtrRefresh={(done) => { 
            dispatch(getCoursesAsync())
            done()  
        }}>
            <Navbar backLink="Back" sliding title="Courses">
                <NavRight>
                    {courses.length != 0 && 
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
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-course/" />
            }

            <List className="searchbar-not-found">
                <ListItem title="Nothing found"></ListItem>
            </List>

            {loading && courses.length == 0 && 
            <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
                <div>
                    <Preloader className="color-multi" size="40px" color="multi" />
                </div>
            </PageContent>
            }

            {!loading && courses.length == 0 && !error &&
            <PageContent className="display-flex justify-content-center text-align-center">
                <div>
                    <h3>Hmm...There are no courses listed yet.</h3>
                    <Icon size="100px" color="green" className="margin-bottom">
                        <FaRobot />
                    </Icon>
                </div>
            </PageContent>
            }

            <List mediaList className="search-list searchbar-found">
                {courses.map((course)=>
                    <ListItem 
                    swipeout
                    key={course.id}
                    title={course.name} 
                    subtitle={`Department of ${course.department.name}`}
                    text={course.description}
                    link={`/course/${course.id}`}
                    after={`${course.semesters.length} Semester(s)`}
                    >
                        <SwipeoutActions left>
                            <SwipeoutButton
                            onClick={()=>{ f7router.navigate(`/edit-course/${course.id}`)}}
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
                                "Do You Want To Delete This Course and It's Related Entities?",
                                'Delete Course',
                                ()=>{deleteCourse(course.id)}
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
                            bgColor='red'
                            slot="media"
                        >
                            <FaGraduationCap color="white" style={{fontSize: '24px'}} />
                        </Block>
                        
                    </ListItem> 
                )}
            </List>
        </Page>
      
    
  );
};
