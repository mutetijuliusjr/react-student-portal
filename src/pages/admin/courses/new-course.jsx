import React, { useState } from 'react';

import {
  f7,
  Page,
  Navbar,
  ListInput,
  Button,
  List
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { addCourseAsync } from '../../../redux/courseSlice';

export default () => {

    const dispatch = useDispatch()
    const departments = useSelector((state) => state.departments)

    const [courseName, setCourseName] = useState('')
    const [courseDesc, setCourseDesc] = useState('')
    const [courseDept, setCourseDept] = useState('')

    const successToast = f7.toast.create({
        position: "center",
        closeButton: "true",
        text:'New course has been saved.',
        closeTimeout: 3000
    })

    const onSubmit = (event) => {
        event.preventDefault();
        if (courseDept == "") {
            f7.dialog.alert("Please select a department", "Error")
        }
        else 
        {
            f7.dialog.preloader('Loading', 'multi')
            dispatch(
                addCourseAsync({
                    name: courseName,
                    description: courseDesc,
                    department_id: courseDept
                })
            )
            f7.dialog.close()
            successToast.open()
        }
        
    }


    return (
        <Page name="new-course">
            <Navbar backLink="Back" sliding  title="New Course" />

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
                        <option value="">Choose a department...</option>
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
