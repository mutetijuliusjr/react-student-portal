import React, { useEffect } from 'react';
import {  
    FaBuilding,
    FaExclamationTriangle,
    FaTrashAlt,
    FaSearch,
    FaGraduationCap
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
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getCoursesAsync, deleteCourseAsync } from '../../../redux/courseSlice';
import { getDepartmentsAsync } from '../../../redux/departmentSlice';

export default () => {

    const dispatch = useDispatch()
    const courses = useSelector((state) => state.courses)
    const departments = useSelector((state) => state.departments)

    const departmentName = (id)=>{
        if (departments != null) {
            var schl = departments.find((schl) => schl.id == id)
            return `Department of ${schl.name}`
        }
        else
        {return '...'}
    }

    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Course Deleted',
        position: 'bottom',
    })

    const deleteCourse = (courseId) => {
        deleteToast.open()
        dispatch(deleteCourseAsync({id: courseId}))
    }

    useEffect(() => { 
        dispatch(getCoursesAsync())
        dispatch(getDepartmentsAsync())
    }, [dispatch])

    return (
    
      
        <Page name="courses">
            <Navbar backLink="Back" sliding title="Courses">
                {courses != null && courses != 'error' && courses.length != 0 && 
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
            
            {courses != null && departments != null && courses != 'error' && courses.length != 0 &&
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-course/" />
            }
            
            <List className="searchbar-not-found">
                <ListItem title="Nothing found"></ListItem>
            </List>

            {courses == null ? 
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
                {courses == 'error' ?
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
                {courses.length == 0 ? 
                    <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
                        <Icon size="48px">
                            <FaExclamationTriangle />
                        </Icon>
                        <p>Hmm...</p>
                        <p>There are no courses listed.</p>
                        <p>Yet.</p>
                    </PageContent>
                    :
                    <List mediaList className="search-list searchbar-found">
                        {courses.map((course)=>
                            <ListItem 
                            swipeout
                            key={course.id}
                            title={course.name}
                            subtitle={departmentName(course.department_id)} 
                            text={course.description}
                            link={`/course/${course.id}`}
                            >
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
                                <Icon slot="media" size="29px" color="red">
                                    <FaGraduationCap />
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
