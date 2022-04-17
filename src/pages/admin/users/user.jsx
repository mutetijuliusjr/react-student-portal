import React, { useEffect} from 'react';
import {
    FaEllipsisV,
    FaGraduationCap,
    FaUser
} from 'react-icons/fa';

import {
  Page,
  Popover,
  Navbar,
  Block,
  Icon,
  NavRight,
  Link,
  List,
  ListItem,
  BlockTitle,
  f7,
  Chip,
  Toolbar,
  Tabs,
  Tab,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getUsersAsync, deleteUserAsync } from '../../../redux/userSlice';

export default (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => { 
        dispatch(getUsersAsync())
    }, [dispatch])
    
    const { f7router } = props
    const state = useSelector((state) => state.users)
    
    const users = state.data
    const loading = state.loading
    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'User Deleted',
        position: 'bottom',
    })
    
    
    const deleteUser = () => {
        f7router.back()
        f7.dialog.close()
        f7.dialog.preloader('Loading')
        dispatch(deleteUserAsync({id: props.id}))
        setTimeout(() => {
            f7.dialog.close()
            deleteToast.open()
        } ,3000)    
    }
    
    let user

    if (users.length != 0) {
        user = users.find(sch => sch.id == props.id)
    }


  return (
    
    <Page name="user"> 
        <Navbar 
        transparent
        backLink="Back" 
        sliding={false} >
            <NavRight>
                <Link popoverOpen=".popover-menu">
                    <Icon>
                        <FaEllipsisV />
                    </Icon>
                </Link>
            </NavRight>
        </Navbar>
        <Popover className="popover-menu">
            {!loading && 
            <List noChevron noHairlines>
                <ListItem link="#" popoverClose title="Edit User" onClick={()=>f7router.navigate(`/edit-user/${user.id}`)} />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete User" 
                onClick={()=>{ f7.dialog.confirm(
                    "Do You Want To Delete This User and It's Related Entities?",
                    'Delete User',
                    ()=>{deleteUser()}
                    )}} />
                <ListItem link="#" popoverClose title="Back To Home" onClick={()=>f7router.navigate("/admin/")} />
            </List>
            }
        </Popover>

        <div 
            className="display-flex flex-direction-column justify-content-center text-align-center">
            <div style={{
                width: '110px',
                height: '110px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: '50%',
                backgroundImage: "url(images/profile.jpg)",
            }}>
                <img 
                data-src={"images/profile.jpg"} 
                className="lazy lazy-fade-in"
                style={{
                    width: '110px',
                    height: '110px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: '50%',
                }} 
                />
            </div>
            <BlockTitle medium>John Doe</BlockTitle>
            <Block>
                <Chip text="Role" outline borderColor="purple" />
                <Chip text="Role" outline borderColor="purple" />
                <Chip text="Role" outline borderColor="purple" />
            </Block>
            <BlockTitle>More...</BlockTitle>
        </div>
        <List inset noHairlines>
            <ListItem title="Pofile" link="#"></ListItem>
            <ListItem title="Messages" link="#"></ListItem>
            <ListItem title="Notifications" link="#"></ListItem>
            <ListItem title="Teacher" link="#"></ListItem>
            <ListItem title="Student" link="#"></ListItem>
        </List>
    </Page>  
  );
};