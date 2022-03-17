import React, { useState, useEffect } from 'react';
import {
    FaEllipsisV,
    FaTimesCircle,
    FaTag,
    FaParagraph,
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
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getCoursesAsync } from '../../redux/courseSlice';
import { editDepartmentAsync } from '../../redux/departmentSlice';

export default (props) => {

const { f7router } = props

const dispatch = useDispatch()

const departments = useSelector((state) => state.departments)
const department = departments.find(dept => dept.id == props.id)

const schools = useSelector((state) => state.schools)
const school = schools.find((school)=>school.id == department.school_id)
const courses = useSelector((state) => state.courses)

var newDeptDesc = ''
if(department.description != null) {
    newDeptDesc = department.description
} 
 
var departmentCourses = ''

const [departmentName, setDepartmentName] = useState(department.name)
const [departmentDesc, setDepartmentDesc] = useState(newDeptDesc)
const [departmentSchl, setDepartmentSchl] = useState(department.school_id)


if(courses != null) {
    departmentCourses = courses.filter(course => course.department_id == props.id)
}

const onSubmit = (event) => {
    event.preventDefault();
    f7.dialog.preloader('Loading', 'multi')
    console.log(departmentSchl)
    dispatch(
        editDepartmentAsync({
            id: props.id,
            name: departmentName,
            description: departmentDesc,
            school_id: department.school_id
        })
    )
    f7.dialog.close()
    f7.dialog.alert('Saved!')
}

useEffect(() => { 
    dispatch(getCoursesAsync())
}, [dispatch])

  return (
    
    <Page name="department">
        <Navbar title="Department Details" backLink="Back" sliding={false} >
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
                <ListItem link="#" popupOpen="#editDepartment" popoverClose title="Edit Department" />\
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete Department" 
                onClick={()=>{ f7.dialog.confirm(
                    'Do You Want To Delete Department and Related Entities?',
                    'Delete Department') 
                    }} />
            </List>
        </Popover>
        <BlockTitle>Name</BlockTitle>
        <Block strong>Department of {department.name}</Block>
        
        <BlockTitle>School</BlockTitle>
        <Block strong>
            School of {school.name}
        </Block>

        <BlockTitle>Description</BlockTitle>
        <Block strong ><p>{department.description}</p></Block>   

        <BlockTitle>Courses</BlockTitle>     
        {courses == null ? 
        <Block strong className="display-flex flex-direction-column justify-content-center text-align-center">
            <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
        </Block>
        :
        <Block strong>
            {departmentCourses.length == 0 ? 
                <Block>
                    <p>There are no Courses for this Department</p>
                    <Button text="Add Course" outline color="green" link="#" />
                </Block>
                :
                <List>
                    {departmentCourses.map((course)=>
                    <ListItem key={course.id} title={course.name} link={`/course/${course.id}`}></ListItem>   
                    )}
                </List>
            }
        </Block>
        }


        <Popup className="demo-popup-swipe" id="editDepartment" swipeToClose>
            <Page>
                <Navbar title="Edit Department">
                    <NavRight>
                        <Link popupClose tooltip="Close">
                            <FaTimesCircle />
                        </Link>
                    </NavRight>
                </Navbar>

                <form onSubmit={onSubmit}>
                    <List inlineLabels noHairlines>
                        <ListInput
                            label="Name"
                            type="text"
                            placeholder="Department name"
                            clearButton={false}
                            required
                            validateOnBlur
                            value={departmentName}
                            onChange={(event) => setDepartmentName(event.target.value)}
                        >
                            <Icon color="blue" slot="media">
                                <FaTag />
                            </Icon>
                        </ListInput>
                        <ListInput
                            label="Description"
                            type="textarea"
                            placeholder="Department Description"
                            name="description"
                            clearButton={false}
                            resizable
                            value={departmentDesc}
                            onChange={(event) => setDepartmentDesc(event.target.value)}
                        >
                            <Icon color="blue" slot="media">
                                <FaParagraph />
                            </Icon>
                        </ListInput>
                    </List>
                    <Row>
                        <Col><Button outline color="green" text="Save" type="submit" /></Col>
                    </Row>
                </form>

            </Page>
        </Popup>
    </Page>  
  );
};