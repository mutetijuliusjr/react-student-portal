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
import { addDepartmentAsync } from '../../../redux/departmentSlice';
import { getSchoolsAsync } from '../../../redux/schoolSlice';

export default (props) => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getSchoolsAsync())
    }, [dispatch])
    
    const state = useSelector(state => state.departments)
    const schools =  useSelector(state => state.schools)
    const loading = state.loading
    const error = state.error
    const updated = state.updated

    let schoolId

    const [departmentName, setDepartmentName] = useState('')
    const [departmentDesc, setDepartmentDesc] = useState('')
    const [departmentSchl, setDepartmentSchl] = useState('')

    if (props.f7route.query.school_id !== undefined) {
        schoolId = props.f7route.query.school_id
    }

    const errorNotification = f7.notification.create({
        icon: '<i class="fa fa-exclamation-circle text-color-red"></i>',
        title: 'Error',
        subtitle: 'Cannot complete request. Please check your inputs and try again.',
        text: 'If error persists, try again later.',
        closeButton: true,
    })

    const chooseSchlToast = f7.toast.create({
        icon: '<i class="fa fa-exclamation-circle text-color-green" style="font-size: 30px"></i>',
        title: 'Notice',
        text: 'Please choose a school.',
        closeTimeout: 3000,
        position: 'center'
    })

    const successToast = f7.toast.create({
        icon: '<i class="fa fa-check-circle text-color-green style="font-size: 30px""></i>',
        text: 'Department has been saved',
        closeTimeout: 3000,
      })

    const onSubmit = (event) => {
        event.preventDefault();
        if (schoolId == undefined) {
            if (departmentSchl !== '') {
                dispatch(
                    addDepartmentAsync({
                        name: departmentName,
                        description: departmentDesc,
                        school_id: departmentSchl
                    })
                )
            }

            if (departmentSchl == '') {
                chooseSchlToast.open()
            }
        }
        
        if (schoolId != undefined) {
            dispatch(
                addDepartmentAsync({
                    name: departmentName,
                    description: departmentDesc,
                    school_id: schoolId
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
        <Page name="new-department">
            <Navbar backLink="Back" sliding  title="Add Department" />

            <form onSubmit={onSubmit}>
                <List noHairlinesMd>
                    <ListInput
                        outline
                        label="Name"
                        floatingLabel
                        type="text"
                        placeholder="Department name"
                        clearButton
                        required
                        validate
                        value={departmentName}
                        onChange={(event) => setDepartmentName(event.target.value)}
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
                        value={departmentDesc}
                        onChange={(event) => setDepartmentDesc(event.target.value)}
                    >
                    </ListInput>
                    {props.f7route.query.school_id == undefined && schools.data.length != 0 && 
                    <ListInput
                        outline
                        label="School"
                        type="select"
                        value={departmentSchl}
                        onChange={(event) => setDepartmentSchl(event.target.value)}
                        placeholder="Please choose..."
                    >
                        {schools.data.map((school)=>
                        <option key={school.id} value={school.id}>{school.name}</option>
                        )}
                    </ListInput>
                    }
                </List>
                <Block>
                {!schools.loading &&
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
