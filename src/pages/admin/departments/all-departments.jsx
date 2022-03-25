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
import { getDepartmentsAsync, deleteDepartmentAsync } from '../../../redux/departmentSlice';
import { getSchoolsAsync } from '../../../redux/schoolSlice';

export default () => {

    const dispatch = useDispatch()
    const departments = useSelector((state) => state.departments)
    const schools = useSelector((state) => state.schools)

    const schoolName = (id)=>{
        if (schools != null) {
            var schl = schools.find((schl) => schl.id == id)
            return `School of ${schl.name}`
        }
        else
        {return '...'}
    }

    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Department Deleted',
        position: 'bottom',
    })

    const deleteDepartment = (departmentId) => {
        deleteToast.open()
        dispatch(deleteDepartmentAsync({id: departmentId}))
    }

    useEffect(() => { 
        dispatch(getDepartmentsAsync())
        dispatch(getSchoolsAsync())
    }, [dispatch])

    return (
    
      
        <Page name="departments">
            <Navbar backLink="Back" sliding title="Departments">
                {departments != null && departments != 'error' && departments.length != 0 && 
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
            
            {departments != null && schools != null && departments != 'error' && departments.length != 0 &&
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-department/" />
            }
            
            <List className="searchbar-not-found">
                <ListItem title="Nothing found"></ListItem>
            </List>

            {departments == null ? 
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
                {departments == 'error' ?
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
                {departments.length == 0 ? 
                    <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
                        <Icon size="48px">
                            <FaExclamationTriangle />
                        </Icon>
                        <p>Hmm...</p>
                        <p>There are no departments listed.</p>
                        <p>Yet.</p>
                    </PageContent>
                    :
                    <List mediaList className="search-list searchbar-found">
                        {departments.map((department)=>
                            <ListItem 
                            swipeout
                            key={department.id}
                            title={`Department of ${department.name}`}
                            subtitle={schoolName(department.school_id)} 
                            text={department.description}
                            link={`/department/${department.id}`}
                            >
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
                                <Icon slot="media" size="29px" color="orange">
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
