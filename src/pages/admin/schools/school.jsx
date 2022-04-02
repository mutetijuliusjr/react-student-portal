import React, { useEffect, useState } from 'react';
import {
    FaEllipsisV,
    FaTimesCircle,
    FaTag,
    FaParagraph,
    FaList,
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
  ListInput,
  BlockTitle,
  f7,
  Row,
  Popup,
  Card,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getSchoolsAsync, deleteSchoolAsync } from '../../../redux/schoolSlice';

export default (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => { 
        dispatch(getSchoolsAsync())
    }, [dispatch])
    
    const { f7router } = props
    const state = useSelector((state) => state.schools)
    
    const schools = state.data
    const loading = state.loading
    const error = state.error 
    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'School Deleted',
        position: 'bottom',
    })
    
    
    const deleteSchool = () => {
        f7router.back()
        f7.dialog.close()
        f7.dialog.preloader('Loading')
        dispatch(deleteSchoolAsync({id: props.id}))
        setTimeout(() => {
            f7.dialog.close()
            deleteToast.open()
        } ,3000)    
    }
    
    let school

    if (schools.length != 0) {
        school = schools.find(sch => sch.id == props.id)
    }


  return (
    
    <Page name="school"> 
        <Navbar 
        title={!loading && schools.length != 0 && `School of ${school.name}`} 
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
                <ListItem link="#" popoverClose title="Edit School" onClick={()=>f7router.navigate(`/edit-school/${school.id}`)} />
                <ListItem link="#" popoverClose title="Add Department" onClick={()=>f7router.navigate(`/new-department/?school_id=${school.id}`)} />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete School" 
                onClick={()=>{ f7.dialog.confirm(
                    "Do You Want To Delete This School and It's Related Entities?",
                    'Delete School',
                    ()=>{deleteSchool()}
                    )}} />
            </List>
            }
        </Popover>

        <Row noGap>
            <Col width="100" medium="50">
                <BlockTitle>Name</BlockTitle>
                <Card 
                outline 
                padding 
                content={schools.length == 0 ?<p className="skeleton-text">skeleton text</p> :school.name}
                 />                
                <BlockTitle>Description</BlockTitle>
                <Card 
                outline 
                padding 
                content={schools.length == 0 ?
                        <p className="skeleton-text">
                            Card with header and footer. 
                            Card headers are used to display card titles 
                            and footers for additional information or 
                            just for custom actions.
                        </p> 
                        :
                        school.description}
                 />                
            </Col>

            <Col width="100" medium="50">
                <BlockTitle>Departments</BlockTitle>
                {loading && schools.length == 0 ?
                <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                    <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                </Block>
                :
                <>
                    {schools.length != 0 &&
                        <>
                            {school.departments.length == 0 ?
                            <Block>
                                <p>There are no departments for this school</p>
                                <Button text="Add Department" outline color="green" href={`/new-department/?school_id=${school.id}`} />
                            </Block>
                            :
                            <List inset noHairlines='true' noChevron>
                                {school.departments.map((dept)=>
                                    <ListItem 
                                        key={dept.id} 
                                        title={`Department of ${dept.name}`} 
                                        link={`/department/${dept.id}`} 
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