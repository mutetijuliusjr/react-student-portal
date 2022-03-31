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
    
    const state = useSelector((state) => state.schools)

    const schools = state.data
    const loading = state.loading
    const error = state.error
    
    const errorNotification = f7.notification.create({
        icon: FaSearch,
        title: 'Error',
        subtitle: 'Can\'t connect to the server. We are working to fix the issue.',
        text: 'Please, try again later',
        closeButton: true,
    });

    if (error) {
       errorNotification.open() 
    }

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
                    {!loading && 
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
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-school/" />
        </Page>
      
    
  );
};
