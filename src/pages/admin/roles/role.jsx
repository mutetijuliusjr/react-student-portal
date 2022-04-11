import React, { useEffect, useState } from 'react';
import {
    FaEllipsisV,
    FaBuilding
} from 'react-icons/fa';

import {
  Col,
  Page,
  Popover,
  Preloader,
  Navbar,
  Block,
  Button,
  Icon,
  NavRight,
  Link,
  List,
  ListItem,
  BlockTitle,
  f7,
  Row,
  Card,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getRolesAsync, deleteRoleAsync } from '../../../redux/roleSlice';

export default (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => { 
        dispatch(getRolesAsync())
    }, [dispatch])
    
    const { f7router } = props
    const state = useSelector((state) => state.roles)
    
    const roles = state.data
    const loading = state.loading 
    
    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Role Deleted',
        position: 'bottom',
    })
    
    
    const deleteRole = () => {
        f7router.back()
        f7.dialog.close()
        f7.dialog.preloader('Loading')
        dispatch(deleteRoleAsync({id: props.id}))
        setTimeout(() => {
            f7.dialog.close()
            deleteToast.open()
        } ,3000)    
    }
    
    let role
    
    if (roles.length != 0) {
        role = roles.find(sch => sch.id == props.id)
    }


  return (
    
    <Page name="role"> 
        <Navbar 
        title={!loading && roles.length != 0 && `${role.name} role`} 
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
                <ListItem link="#" popoverClose title="Edit Role" onClick={()=>f7router.navigate(`/edit-role/${role.id}`)} />
                <ListItem link="#" popoverClose title="Add User" onClick={()=>f7router.navigate(`/new-user/?role_id=${role.id}`)} />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete Role" 
                onClick={()=>{ f7.dialog.confirm(
                    "Do You Want To Delete This Role and It's Related Entities?",
                    'Delete Role',
                    ()=>{deleteRole()}
                    )}} />
                <ListItem link="#" popoverClose title="Back To Home" onClick={()=>f7router.navigate("/admin/")} />
            </List>
            }
        </Popover>

        <Row noGap>
            <Col width="100" medium="50">
                <BlockTitle>Name</BlockTitle>
                <Card 
                outline 
                padding 
                content={roles.length == 0 ?<p className="skeleton-text">skeleton text</p> :role.name}
                 />               
            </Col>

            <Col width="100" medium="50">
                <BlockTitle>Users</BlockTitle>
                {loading && roles.length == 0 ?
                <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                    <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                </Block>
                :
                <>
                    {roles.length != 0 &&
                        <>
                            {role.users.length == 0 ?
                            <Block>
                                <p>There are no users for this role</p>
                                <Button text="Add User" outline color="green" href={`/new-user/?role_id=${role.id}`} />
                            </Block>
                            :
                            <List inset noHairlines='true' noChevron>
                                {role.users.map((dept)=>
                                    <ListItem 
                                        key={dept.id} 
                                        title={`User of ${dept.name}`} 
                                        link={`/user/${dept.id}`} 
                                    >
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
                                        <FaBuilding style={{fontSize: '24px'}} />
                                    </Block>
                                    </ListItem>
                                )}
                            </List>
                            }
                        </>
                    }
                </>
                }
                
            </Col>
        </Row>
        
    </Page>  
  );
};