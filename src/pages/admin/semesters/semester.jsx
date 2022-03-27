import React, { useEffect, useState } from 'react';
import {
    FaEllipsisV, FaBookOpen
} from 'react-icons/fa';

import {
  Col,
  Page,
  Popover,
  Navbar,
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
  Preloader,
  Block,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getSemesterAsync } from '../../../redux/semesterSlice';

export default (props) => {
    const { f7router } = props

    const dispatch = useDispatch()
    const semesters = useSelector((state) => state.semesters)
    const semester = semesters.find(sem => sem.id == props.id) 
       
    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Semester Deleted',
        position: 'bottom',
    })
    
    const deleteSemester = () => {
        f7router.back()
        f7.dialog.close()
        f7.dialog.preloader('Loading')
        dispatch(deleteSemesterAsync({id: props.id}))
        setTimeout(() => {
            f7.dialog.close()
            deleteToast.open()
        } ,3000)    
    }
    console.log(semester.course == undefined)
    useEffect(() => { 
        dispatch(getSemesterAsync({id: props.id}))
    }, [dispatch])
    
    return (
    
    <Page name="semester">
        <Navbar title={`semester.name`} backLink="Back" sliding={false} >
            <NavRight>
                <Link popoverOpen=".popover-menu">
                    <Icon>
                        <FaEllipsisV />
                    </Icon>
                </Link>
            </NavRight>
        </Navbar>
        <Popover className="popover-menu">
            <List noChevron noHairlines>
                <ListItem link="#" popoverClose 
                title="Edit Semester" 
                onClick={()=>f7router.navigate(`/edit-semester/${semester.id}`)} />
                <ListItem link="#" popoverClose 
                title="Add Unit" 
                onClick={()=>f7router.navigate('/new-unit/')} />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete Semester" 
                onClick={()=>{ f7.dialog.confirm(
                    "Do You Want To Delete This Semester and It's Related Entities?",
                    'Delete Semester',
                    ()=>{deleteSemester()}
                    )}} />
            </List>
        </Popover>

        <Row noGap>
            <Col width="100" medium="50">
                <BlockTitle>Name</BlockTitle>
                <Card outline padding content={semester.course == undefined ? '...':semester.name} />
                <BlockTitle>Code</BlockTitle>
                <Card outline padding content={semester.course == undefined ? '...':semester.code} />
                <BlockTitle>Course</BlockTitle>
                <Card outline className="row padding" >
                    <Col width="70">
                    {semester.course == undefined ? 
                        '...'
                        :
                        <span>{semester.course.name}</span>
                    }
                    </Col>
                    <Col width="30">
                        {semester.course == undefined && 
                            <Button 
                            href={`/course/${semester.course_id}`}
                            fill
                            color="blue"
                            text="Manage"
                            />
                        }
                    </Col>
                </Card>
            </Col>
            <Col width="100" medium="50">
                <BlockTitle>Units</BlockTitle>
                {semester.course == undefined ? 
                <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                    <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                </Block>
                :
                <List inset noHairlines noChevron>
                    {semester.units.map((unit)=>
                        <ListItem title={unit.name} key={unit.id} link={`/units/${unit.id}`} >
                            <Icon color="blue" slot="media">
                                <FaBookOpen />
                            </Icon>
                        </ListItem>   
                    )}
                </List>
                }
                
            </Col>
        </Row>

    </Page>  
  );
};