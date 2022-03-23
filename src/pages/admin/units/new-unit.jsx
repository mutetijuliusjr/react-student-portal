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
import { addDepartmentAsync } from '../../../redux/departmentSlice';

export default () => {

    const dispatch = useDispatch()
    const schools = useSelector((state) => state.schools)

    const [departmentName, setDepartmentName] = useState('')
    const [departmentDesc, setDepartmentDesc] = useState('')
    const [departmentSchl, setDepartmentSchl] = useState('')

    const successToast = f7.toast.create({
        position: "center",
        closeButton: "true",
        text:'New department has been saved.',
        closeTimeout: 3000
    })

    const onSubmit = (event) => {
        event.preventDefault();
        f7.dialog.preloader('Loading', 'multi')
        dispatch(
            addDepartmentAsync({
                name: departmentName,
                description: departmentDesc,
                school_id: departmentSchl
            })
        )
        f7.dialog.close()
        successToast.open()
    }


    return (
        <Page name="new-department">
            <Navbar backLink="Back" sliding  title="New Department" />

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
                    <ListInput
                        label="School"
                        type="select"
                        value={departmentSchl}
                        onChange={(event) => setDepartmentSchl(event.target.value)}
                        >
                        {schools.map(school=>
                            <option key={school.id} value={school.id}>{school.name}</option>
                            )
                        }
                        
                    </ListInput>
                </List>
                <Button outline color="green" text="Save" type="submit" />
            </form>

        </Page>
    );
};
