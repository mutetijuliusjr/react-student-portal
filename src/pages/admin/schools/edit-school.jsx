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
import { editSchoolAsync } from '../../../redux/schoolSlice';

export default (props) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state.schools)
    const loading = state.loading
    const error = state.error
    const updated = state.updated
    const school = state.data.find(sch => sch.id == props.id)
    
    let desc = ''
   
    if(school.description != null) {
        desc = school.description
    }
    
    const [schoolName, setSchoolName] = useState(school.name)
    const [schoolDesc, setSchoolDesc] = useState(desc)

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
            editSchoolAsync({
                id: props.id,
                name: schoolName,
                description: schoolDesc
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
                <Block>
                    <Button
                    fill
                    round
                    color="green" 
                    text='Update'
                    loading={loading}
                    preloader={loading}
                    type="submit" />
                </Block>
            </form>

        </Page>
    );
};
