import React, { useEffect } from 'react';
import {  
    FaBuilding,
    FaExclamationTriangle,
    FaTrashAlt,
    FaSearch,
    FaBookOpen,
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
import { getUnitsAsync, deleteUnitAsync } from '../../../redux/unitSlice';
//import { getSchoolsAsync } from '../../../redux/instructorSlice';

export default () => {

    const dispatch = useDispatch()
    const units = useSelector((state) => state.units)
    //const instructors = useSelector((state) => state.instructors)

    /* const instructorName = (id)=>{
        if (instructors != null) {
            var schl = instructors.find((schl) => schl.id == id)
            return `School of ${schl.name}`
        }
        else
        {return '...'}
    } */

    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Unit Deleted',
        position: 'bottom',
    })

    const deleteUnit = (unitId) => {
        deleteToast.open()
        dispatch(deleteUnitAsync({id: unitId}))
    }

    useEffect(() => { 
        dispatch(getUnitsAsync())
    }, [dispatch])

    return (
    
      
        <Page name="units">
            <Navbar backLink="Back" sliding title="Units">
                {units != null && units != 'error' && units.length != 0 && 
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
            
            {units != null && units != 'error' && units.length != 0 &&
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-unit/" />
            }
            
            <List className="searchbar-not-found">
                <ListItem title="Nothing found"></ListItem>
            </List>

            {units == null ? 
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
                {units == 'error' ?
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
                {units.length == 0 ? 
                    <PageContent className="display-flex justify-content-center text-align-center">
                        <div>
                            <h3>Hmm...There are no units listed yet.</h3>
                            <Icon size="100px" color="green" className="margin-bottom">
                                <FaRobot />
                            </Icon>
                            <Button color="green" text="Add Unit" href="/new-unit/" fill round />
                        </div>
                    </PageContent>
                    :
                    <List mediaList className="search-list searchbar-found">
                        {units.map((unit)=>
                            <ListItem 
                            swipeout
                            key={unit.id}
                            title={unit.name}
                            subtitle={(unit.instructor_id)} 
                            text={unit.description}
                            link={`/unit/${unit.id}`}
                            >
                                <SwipeoutActions right>
                                    <SwipeoutButton
                                    onClick={()=>{ f7.dialog.confirm(
                                        "Do You Want To Delete This Unit and It's Related Entities?",
                                        'Delete Unit',
                                        ()=>{deleteUnit(unit.id)}
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
                                <Icon slot="media" size="29px" color="blue" style={{ borderRadius: '50%' }}>
                                    <FaBookOpen />
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
