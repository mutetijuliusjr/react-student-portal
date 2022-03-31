import React, { useEffect, useState } from 'react';
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
    
    const [schools, setSchools] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const state = useSelector((state) => state.schools)
    
    /* console.log('loading: '+loading)
    console.log('error: '+error) */
    console.table(state.data.data)

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
                    <NavRight>
                    {loading && 
                        <Link
                        searchbarEnable=".searchbar-demo"
                        >
                            <Icon>
                                <FaSearch />
                            </Icon>
                        </Link>
                    }
                    </NavRight>
                    <Searchbar
                        className="searchbar-demo"
                        expandable
                        searchContainer=".search-list"
                        searchIn=".item-title"
                        disableButton={!theme.aurora}
                    ></Searchbar>
                    
            </Navbar>
        </Page>
      
    
  );
};
