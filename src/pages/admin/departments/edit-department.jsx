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
import { editDepartmentAsync } from '../../../redux/departmentSlice';
import { getSchoolsAsync } from '../../../redux/schoolSlice';


export default (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSchoolsAsync())
    }, [dispatch])

    const state = useSelector(state => state.departments)
    const schools =  useSelector(state => state.schools.data)
    const loading = state.loading
    const error = state.error
    const updated = state.updated
    const department = state.data.find(sch => sch.id == props.id)
    
    let desc = ''
   
    if(department.description != null) {
        desc = department.description
    }
    
    const [departmentName, setDepartmentName] = useState(department.name)
    const [departmentDesc, setDepartmentDesc] = useState(desc)
    const [departmentSchl, setDepartmentSchl] = useState(department.school_id)

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
            editDepartmentAsync({
                id: props.id,
                name: departmentName,
                description: departmentDesc,
                school_id: departmentSchl
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
        <Page name="edit-department">
            <Navbar backLink="Back" sliding  title="Edit Department" />

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
                        validateOnBlur
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
                    {schools.length != 0 &&
                    <ListInput
                        outline
                        label="School"
                        type="select"
                        value={departmentSchl}
                        onChange={(event) => setDepartmentSchl(event.target.value)}
                        placeholder="Please choose..."
                    >
                        {schools.map((school)=>
                        <option key={school.id} value={school.id}>{school.name}</option>
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
