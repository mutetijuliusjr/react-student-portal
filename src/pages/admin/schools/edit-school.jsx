import React, { useState, useEffect } from 'react';
import {
  f7,
  Page,
  Navbar,
  Button,
  List,
  ListInput,
} from 'framework7-react';
import { useSelector, useDispatch } from 'react-redux';
import { editSchoolAsync } from '../../../redux/schoolSlice';

export default (props) => {

    const dispatch = useDispatch()
    const schools = useSelector((state) => state.schools)
    const school = schools.find(sch => sch.id == props.id)

    const [schoolName, setSchoolName] = useState(school.name)
    const [schoolDesc, setSchoolDesc] = useState(school.description)

    const onSubmit = (event) => {
        event.preventDefault();
        f7.dialog.preloader('Loading', 'multi')
        dispatch(
            editSchoolAsync({
                id: props.id,
                name: schoolName,
                description: schoolDesc
            })
        )
        f7.dialog.close()
        f7.dialog.alert('New School has been saved.', 'Saved!')
    }


    return (
        <Page name="edit-school">
            <Navbar backLink="Back" sliding  title="Edit School" />

            <form onSubmit={onSubmit}>
                <List noHairlinesMd>
                    <ListInput
                        outline
                        label="Name"
                        floatingLabel
                        type="text"
                        placeholder="School name"
                        clearButton
                        required
                        validateOnBlur
                        value={schoolName}
                        onChange={(event) => setSchoolName(event.target.value)}
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
                        value={schoolDesc}
                        onChange={(event) => setSchoolDesc(event.target.value)}
                    >
                    </ListInput>
                </List>
                <Button outline color="green" text="Save" type="submit" />
            </form>

        </Page>
    );
};
