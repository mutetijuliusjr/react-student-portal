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
import { useDispatch, useSelector } from 'react-redux';
import { addCourseAsync } from '../../../redux/courseSlice';
import { getDepartmentsAsync } from '../../../redux/departmentSlice';

export default (props) => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDepartmentsAsync())
    }, [dispatch])
    
    const state = useSelector(state => state.courses)
    const departments =  useSelector(state => state.departments)
    const loading = state.loading
    const error = state.error
    const updated = state.updated

    let departmentId

    const [courseName, setCourseName] = useState('')
    const [courseDesc, setCourseDesc] = useState('')
    const [courseDept, setCourseDept] = useState('')

    if (props.f7route.query.department_id !== undefined) {
        departmentId = props.f7route.query.department_id
    }

    const errorNotification = f7.notification.create({
        icon: '<i class="fa fa-exclamation-circle text-color-red"></i>',
        title: 'Error',
        subtitle: 'Cannot complete request. Please check your inputs and try again.',
        text: 'If error persists, try again later.',
        closeButton: true,
    })

    const chooseDeptToast = f7.toast.create({
        icon: '<i class="fa fa-exclamation-circle text-color-green" style="font-size: 30px"></i>',
        title: 'Notice',
        text: 'Please choose a department.',
        closeTimeout: 3000,
        position: 'center'
    })

    const successToast = f7.toast.create({
        icon: '<i class="fa fa-check-circle text-color-green"></i>',
        text: 'Course has been saved',
        closeTimeout: 3000,
      })

    const onSubmit = (event) => {
        event.preventDefault();
        if (departmentId == undefined) {
            if (courseDept !== '') {
                dispatch(
                    addCourseAsync({
                        name: courseName,
                        description: courseDesc,
                        department_id: courseDept
                    })
                )
            } 
            
            if (courseDept == '') {
                chooseDeptToast.open()
            }
        }

        if (departmentId != undefined)
        {
            dispatch(
                addCourseAsync({
                    name: courseName,
                    description: courseDesc,
                    department_id: departmentId
                })
            ) 
        } 
    }
        
    if (updated) {
        successToast.open()
    }
    
    if(error && !updated) {
        errorNotification.open()
    }

    return (
        <Page name="new-course">
            <Navbar backLink="Back" sliding  title="Add Course" />

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
                        validate
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
                    {props.f7route.query.department_id == undefined && departments.data.length != 0 && 
                    <ListInput
                        outline
                        label="Department"
                        type="select"
                        value={courseDept}
                        onChange={(event) => setCourseDept(event.target.value)}
                    >
                        <option>Please choose...</option>
                        {departments.data.map((department)=>
                        <option key={department.id} value={department.id}>{department.name}</option>
                        )}
                    </ListInput>
                    }
                </List>
                <Block>
                    {!departments.loading && 
                    <Button
                    fill
                    round
                    color="green" 
                    text='Save'
                    loading={loading}
                    preloader={loading}
                    type="submit" />
                    }
                </Block>
            </form>

        </Page>
    );
};
