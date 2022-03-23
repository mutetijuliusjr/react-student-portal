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
import { getCoursesAsync } from '../../../redux/courseSlice';

export default (props) => {
    const { f7router } = props

    const dispatch = useDispatch()
    
    const departments = useSelector((state) => state.departments)
    const department = departments.find(sch => sch.id == props.id) 
    const schools = useSelector((state) => state.schools)
    const courses = useSelector((state) => state.courses)
    
    const schoolName = ()=>{
        if (schools != null) {
            var schl = schools.find((schl) => schl.id == department.school_id)
            return `School of ${schl.name}`
        }
        else
        {return '...'}
    }
    
    var departmentCrses = null
    
    if (courses != null) {
        departmentCrses = courses.filter((schlCrse)=> schlCrse.department_id == department.id)   
    }

    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Department Deleted',
        position: 'bottom',
    })
    
    const deleteDepartment = () => {
        f7router.back()
        f7.dialog.close()
        f7.dialog.preloader('Loading')
        dispatch(deleteDepartmentAsync({id: props.id}))
        setTimeout(() => {
            f7.dialog.close()
            deleteToast.open()
        } ,3000)    
    }

    
    useEffect(() => { 
        dispatch(getCoursesAsync())
    }, [dispatch])

  return (
    
    <Page name="department">
        <Navbar title={`Department of ${department.name}`} backLink="Back" sliding={false} >
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
                <ListItem link="#" popoverClose title="Edit Department" onClick={()=>f7router.navigate(`/edit-department/${department.id}`)} />
                <ListItem link="#" popoverClose title="Add Course" />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete Department" 
                onClick={()=>{ f7.dialog.confirm(
                    "Do You Want To Delete This Department and It's Related Entities?",
                    'Delete Department',
                    ()=>{deleteDepartment()}
                    )}} />
            </List>
        </Popover>

        <Row noGap>
            <Col width="100" medium="50">
                <BlockTitle>Name</BlockTitle>
                <Card outline padding content={department.name} />
                <BlockTitle>Description</BlockTitle>
                <Card outline padding content={department.description} />
                <BlockTitle>School</BlockTitle>
                <Card outline className="row padding" >
                    <Col width="70">
                        <span>{schoolName()}</span>
                    </Col>
                    <Col width="30">
                        <Button 
                        href={`/school/${department.school_id}`}
                        fill
                        color="blue"
                        text="Manage" 
                        />
                    </Col>
                </Card>
            </Col>
            <Col width="100" medium="50">
                <BlockTitle>Departments</BlockTitle>
                {courses == null ?
                    <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                        <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                    </Block>
                    :
                    <>
                        {departmentCrses.length == 0 ? 
                            <Block>
                                <p>There are no courses for this department</p>
                                <Button text="Add Department" outline color="green" link="#" />
                            </Block>
                            :
                            <List inset noHairlines noChevron>
                                {departmentCrses.map((course)=>
                                    <ListItem 
                                        key={course.id} 
                                        title={course.name} 
                                        link={`/course/${course.id}`} 
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