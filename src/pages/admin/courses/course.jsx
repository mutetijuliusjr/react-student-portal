import React, { useEffect } from 'react';
import {
    FaEllipsisV,
    FaGraduationCap,
    FaLink
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
import { deleteCourseAsync } from '../../../redux/courseSlice';
import { getUnitsAsync } from '../../../redux/unitSlice';

export default (props) => {
    const { f7router } = props

    const dispatch = useDispatch()
    
    const courses = useSelector((state) => state.courses)
    const course = courses.find(sch => sch.id == props.id) 
    const departments = useSelector((state) => state.departments)
    const units = useSelector((state) => state.units)
    
    const departmentName = ()=>{
        if (departments != null) {
            var dept = departments.find((dept) => dept.id == course.department_id)
            return `Department of ${dept.name}`
        }
        else
        {return '...'}
    }
    
    var courseUnits = null
    
    if (units != null) {
        courseUnits = units.filter((courseUnit)=> courseUnit.course_id == course.id)   
    }

    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Course Deleted',
        position: 'bottom',
    })
    
    const deleteCourse = () => {
        f7router.back()
        f7.dialog.close()
        f7.dialog.preloader('Loading')
        dispatch(deleteCourseAsync({id: props.id}))
        setTimeout(() => {
            f7.dialog.close()
            deleteToast.open()
        } ,3000)    
    }

    
    useEffect(() => { 
        dispatch(getUnitsAsync())
    }, [dispatch])

  return (
    
    <Page name="course">
        <Navbar title={course.name} backLink="Back" sliding={false} >
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
                <ListItem link="#" popoverClose title="Edit Course" onClick={()=>f7router.navigate(`/edit-course/${course.id}`)} />
                <ListItem link="#" popoverClose title="Add Unit" />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete Course" 
                onClick={()=>{ f7.dialog.confirm(
                    "Do You Want To Delete This Course and It's Related Entities?",
                    'Delete Course',
                    ()=>{deleteCourse()}
                    )}} />
            </List>
        </Popover>

        <Row noGap>
            <Col width="100" medium="50">
                <BlockTitle>Name</BlockTitle>
                <Card outline padding content={course.name} />
                <BlockTitle>Description</BlockTitle>
                <Card outline padding content={course.description} />
                <BlockTitle>Department</BlockTitle>
                <Card outline className="row padding" >
                    <Col width="70">
                        <span>{departmentName()}</span>
                    </Col>
                    <Col width="30">
                        <Button 
                        href={`/department/${course.department_id}`}
                        fill
                        color="blue"
                        text="Manage" 
                        />
                    </Col>
                </Card>
            </Col>
            <Col width="100" medium="50">
                <BlockTitle>Courses</BlockTitle>
                {units == null ?
                    <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                        <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                    </Block>
                    :
                    <>
                        {courseUnits.length == 0 ? 
                            <Block>
                                <p>There are no units for this course</p>
                                <Button text="Add Unit" outline color="green" link="#" />
                            </Block>
                            :
                            <List inset noHairlines noChevron>
                                {courseUnits.map((unit)=>
                                    <ListItem 
                                        key={unit.id} 
                                        title={unit.name} 
                                        link={`/unit/${unit.id}`} 
                                    >
                                        <Icon color="red" slot="media">
                                            <FaGraduationCap />
                                        </Icon>
                                    </ListItem>
                                )}
                            </List>
                        } 
                    </>
                    
                }
            </Col>
        </Row>

    </Page>  
  );
};