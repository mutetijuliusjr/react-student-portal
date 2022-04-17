import React, { useEffect } from 'react';
import {  
    FaBuilding,
    FaTrashAlt,
    FaSearch,
    FaRobot,
    FaEdit,
    FaUser,
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
  Chip,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getUsersAsync, deleteUserAsync } from '../../../redux/userSlice';

export default (props) => {
    const { f7router } = props
    const dispatch = useDispatch()
    
    const state = useSelector((state) => state.users)

    const users = state.data
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
        text: 'User Deleted',
        position: 'bottom',
    })

    const deleteUser = (userId) => {
        dispatch(deleteUserAsync({id: userId}))
    }
    

    useEffect(() => { 
        dispatch(getUsersAsync())
    }, [dispatch])

    if(error && users.length == 0){
        errorNotification.open()
    }

    if (deleted) {
        deleteToast.open()
    }
    
    return (
    
      
        <Page 
        name="users" 
        ptr 
        ptrMousewheel={true} 
        onPtrRefresh={(done) => { 
            dispatch(getUsersAsync())
            done()  
        }}>
            <Navbar backLink="Back" sliding title="Users">
                <NavRight>
                    {users.length != 0 && 
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
                    searchIn=".item-title, .item-subtitle, .item-text"
                    disableButton={!theme.aurora}
                ></Searchbar>
                }
            </Navbar>
            
            {!error &&
            <Fab position="right-bottom" slot="fixed" text="Create" color="green" href="/new-user/" />
            }

            <List className="searchbar-not-found">
                <ListItem title="Nothing found"></ListItem>
            </List>

            {loading && users.length == 0 && 
            <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
                <div>
                    <Preloader className="color-multi" size="40px" color="multi" />
                </div>
            </PageContent>
            }

            {!loading && users.length == 0 && !error &&
            <PageContent className="display-flex justify-content-center text-align-center">
                <div>
                    <h3>Hmm...There are no users listed yet.</h3>
                    <Icon size="100px" color="green" className="margin-bottom">
                        <FaRobot />
                    </Icon>
                </div>
            </PageContent>
            }

            <List mediaList inset className="search-list searchbar-found lazy lazy-fade-in">
                {users.map((user)=>
                    <ListItem 
                    swipeout
                    key={user.id}
                    title={`${user.profile.first_name} ${user.profile.last_name} ${user.profile.surname}`}
                    subtitle={user.email}
                    text={ user.roles.map((role)=><Chip key={role.id} text={role.name} outline />)}
                    link={`/user/${user.id}`}
                    >
                        <SwipeoutActions left>
                            <SwipeoutButton
                            onClick={()=>{ f7router.navigate(`/edit-user/${user.id}`)}}
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
                                "Do You Want To Delete This User and It's Related Entities?",
                                'Delete User',
                                ()=>{deleteUser(user.id)}
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
                            bgColor='teal'
                            slot="media"
                        >
                            <FaUser color="white" style={{fontSize: '24px'}} />
                        </Block>
                        
                    </ListItem> 
                )}
            </List>
            
        </Page>
      
    
  );
};
