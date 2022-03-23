import React, { useState, useEffect } from 'react';
import {  
    FaBuilding, 
    FaTimes, 
    FaTag,  
    FaParagraph, 
    FaExclamationTriangle,
    FaEllipsisV 
} from 'react-icons/fa';
import {
  f7,
  Page,
  Popup,
  Popover,
  Navbar,
  NavRight,
  Button,
  Icon,
  List,
  Link,
  ListItem,
  ListInput,
  SkeletonBlock,
  Searchbar,
  Subnavbar,
  Row,
  Range,
  Col,
  theme,
  Views,
  View,
  PageContent,
} from 'framework7-react';
import { useSelector, useDispatch } from 'react-redux';
import { editCourseAsync } from '../../../redux/courseSlice';

export default (props) => {

    const dispatch = useDispatch()
    const courses = useSelector((state) => state.courses)
    const departments = useSelector((state) => state.departments)
    const course = courses.find(dept=> dept.id == props.id)

    const [courseName, setCourseName] = useState(course.name)
    const [courseDesc, setCourseDesc] = useState(course.description)
    const [courseDept, setCourseDept] = useState(course.department_id)

    const successToast = f7.toast.create({
        position: "center",
        closeButton: "true",
        text:'Edit has been saved.',
        closeTimeout: 3000
    })

    const onSubmit = (event) => {
        event.preventDefault();
        f7.dialog.preloader('Loading', 'multi')
        dispatch(
            editCourseAsync({
                id: props.id,
                name: courseName,
                description: courseDesc,
                department_id: courseDept
            })
        )
        f7.dialog.close()
        successToast.open()
    }


    return (
        <Page name="edit-course">
            <Navbar backLink="Back" sliding  title="Edit Course" />

            <form onSubmit={onSubmit}>
                <List noHairlinesMd>
                    <ListInput
                        outline
                        label="Name"
                        floatingLabel
                        type="text"
                        placeholder="Course name"
                        clearButton
                        required
                        validateOnBlur
                        value={courseName}
                        onChange={(event) => setCourseName(event.target.value)}
                    >
                    </ListInput>
                    <ListInput
                        outline
                        label="Description"
                        floatingLabel
                        type="textarea"
                        resizable
                        placeholder="Description"
                        clearButton
                        value={courseDesc}
                        onChange={(event) => setCourseDesc(event.target.value)}
                    >
                    </ListInput>
                    <ListInput
                        label="Department"
                        type="select"
                        value={courseDept}
                        onChange={(event) => setCourseDept(event.target.value)}
                        >
                        {departments.map(department=>
                            <option key={department.id} value={department.id}>{department.name}</option>
                            )
                        }
                        
                    </ListInput>
                </List>
                <Button outline color="green" text="Save" type="submit" />
            </form>

        </Page>
    );
};
