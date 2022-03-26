import React, { useEffect } from 'react';
import {  
    FaBuilding,
    FaExclamationTriangle,
    FaTrashAlt,
    FaSearch,
    FaClipboard,
    FaRobot
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
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getSemestersAsync, deleteSemesterAsync } from '../../../redux/semesterSlice';
import { getCoursesAsync } from '../../../redux/courseSlice';

export default () => {

    const dispatch = useDispatch()
    const semesters = useSelector((state) => state.semesters)
    const courses = useSelector((state) => state.courses)

    const courseName = (id)=>{
        if (courses != null) {
            var course = courses.find((course) => course.id == id)
            return course.name
        }
        else
        {return '...'}
    }

    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Semester Deleted',
        position: 'bottom',
    })

    const deleteSemester = (semesterId) => {
        deleteToast.open()
        dispatch(deleteSemesterAsync({id: semesterId}))
    }

    useEffect(() => { 
        dispatch(getSemestersAsync())
        dispatch(getCoursesAsync())
    }, [dispatch])

    return (
    
      
        <Page name="semesters">
            <Navbar backLink="Back" sliding title="Semesters">
                {semesters != null && semesters != 'error' && semesters.length != 0 && 
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
            
            {semesters != null && courses != null && semesters != 'error' && semesters.length != 0 &&
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-semester/" />
            }
            
            <List className="searchbar-not-found">
                <ListItem title="Nothing found"></ListItem>
            </List>

            {semesters == null ? 
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
                {semesters == 'error' ?
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
                {semesters.length == 0 ? 
                    <PageContent className="display-flex justify-content-center text-align-center">
                        <div>
                            <h3>Hmm...There are no semesters listed yet.</h3>
                            <Icon size="100px" color="green" className="margin-bottom">
                                <FaRobot />
                            </Icon>
                            <Button color="green" text="Add Semester" href="/new-semester/" fill round />
                        </div>
                    </PageContent>
                    :
                    <List mediaList className="search-list searchbar-found">
                        {semesters.map((semester)=>
                            <ListItem 
                            swipeout
                            key={semester.id}
                            title={semester.name}
                            subtitle={courseName(semester.course_id)} 
                            text={semester.description}
                            link={`/semester/${semester.id}`}
                            after={semester.code}
                            noChevron
                            >
                                <SwipeoutActions right>
                                    <SwipeoutButton
                                    onClick={()=>{ f7.dialog.confirm(
                                        "Do You Want To Delete This Semester and It's Related Entities?",
                                        'Delete Semester',
                                        ()=>{deleteSemester(semester.id)}
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
                                <Icon slot="media" size="29px" color="green">
                                    <FaClipboard />
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
