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
import { getDepartmentsAsync } from '../../../redux/departmentSlice';

export default (props) => {
    const { f7router } = props

    const dispatch = useDispatch()
    
    const departments = useSelector((state) => state.departments)
    const department = departments.find(sch => sch.id == props.id)

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
        dispatch(getDepartmentsAsync())
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
                <ListItem link="#" popoverClose 
                title="Edit Department" 
                onClick={()=>f7router.navigate(`/edit-department/${department.id}`)} />
                <ListItem link="#" popoverClose 
                title="Add Course" 
                onClick={()=>f7router.navigate('/new-course/')} />
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
                        <span>School of {department.school.name}</span>
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
                <BlockTitle>Courses</BlockTitle>
                {department.courses.length == 0 ? 
                    <Block>
                        <p>There are no courses for this department</p>
                        <Button text="Add Course" outline color="green" href="/new-course/" />
                    </Block>
                    :
                    <List inset noHairlines noChevron>
                        {department.courses.map((course)=>
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
            </Col>
        </Row>

    </Page>  
  );
};