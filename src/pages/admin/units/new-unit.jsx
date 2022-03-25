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
import { addUnitAsync } from '../../../redux/unitSlice';

export default () => {

    const dispatch = useDispatch()
    const instructors = useSelector((state) => state.instructors)

    const [unitName, setUnitName] = useState('')
    const [unitDesc, setUnitDesc] = useState('')
    //const [unitInst, setUnitSchl] = useState('')

    const successToast = f7.toast.create({
        position: "center",
        closeButton: "true",
        text:'New unit has been saved.',
        closeTimeout: 3000
    })

    const onSubmit = (event) => {
        event.preventDefault();
        f7.dialog.preloader('Loading', 'multi')
        dispatch(
            addUnitAsync({
                name: unitName,
                description: unitDesc,
                //instructor_id: unitInst
                instructor_id: ''
            })
        )
        f7.dialog.close()
        successToast.open()
    }


    return (
        <Page name="new-unit">
            <Navbar backLink="Back" sliding  title="New Unit" />

            <form onSubmit={onSubmit}>
                <List noHairlinesMd>
                    <ListInput
                        outline
                        label="Name"
                        floatingLabel
                        type="text"
                        placeholder="Unit name"
                        clearButton
                        required
                        validateOnBlur
                        value={unitName}
                        onChange={(event) => setUnitName(event.target.value)}
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
                        value={unitDesc}
                        onChange={(event) => setUnitDesc(event.target.value)}
                    >
                    </ListInput>
                </List>
                <Button outline color="green" text="Save" type="submit" />
            </form>

        </Page>
    );
};
