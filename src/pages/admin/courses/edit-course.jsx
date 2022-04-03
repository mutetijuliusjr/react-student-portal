import React, { useState, useEffect } from 'react';
import {
  f7,
  Page,
  Navbar,
  Button,
  List,
  ListInput,
  Block,
} from 'framework7-react';
import { useSelector, useDispatch } from 'react-redux';
import { editCourseAsync } from '../../../redux/courseSlice';
import { getDepartmentsAsync } from '../../../redux/departmentSlice';


export default (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDepartmentsAsync())
    }, [dispatch])

    const state = useSelector(state => state.courses)
    const departments =  useSelector(state => state.departments.data)
    const loading = state.loading
    const error = state.error
    const updated = state.updated
    const course = state.data.find(sch => sch.id == props.id)
    
    let desc = ''
   
    if(course.description != null) {
        desc = course.description
    }
    
    const [courseName, setCourseName] = useState(course.name)
    const [courseDesc, setCourseDesc] = useState(desc)
    const [courseSchl, setCourseSchl] = useState(course.department_id)

    const errorNotification = f7.notification.create({
        icon: '<i class="fa fa-exclamation-circle text-color-red"></i>',
        title: 'Error',
        subtitle: 'Cannot complete request. Please check your inputs and try again.',
        text: 'If error persists, try again later.',
        closeButton: true,
    })

    const successToast = f7.toast.create({
        icon: '<i class="fa fa-check-circle text-color-green"></i>',
        text: 'Update has been saved',
        closeTimeout: 3000,
      })

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(
            editCourseAsync({
                id: props.id,
                name: courseName,
                description: courseDesc,
                department_id: courseSchl
            })
        )
    }

    if (updated) {
        successToast.open()
    }

    if(error && !updated) {
        errorNotification.open()
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
                    {departments.length != 0 &&
                    <ListInput
                        outline
                        label="School"
                        type="select"
                        value={courseSchl}
                        onChange={(event) => setCourseSchl(event.target.value)}
                        placeholder="Please choose..."
                    >
                        {departments.map((department)=>
                        <option key={department.id} value={department.id}>{department.name}</option>
                        )}
                    </ListInput>
                    }
                </List>
                <Block>
                    <Button
                    fill
                    round
                    color="blue" 
                    text='Update'
                    loading={loading}
                    preloader={loading}
                    type="submit" />
                </Block>
            </form>

        </Page>
    );
};
