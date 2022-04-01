import React, { useState } from 'react';
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
import { addSchoolAsync } from '../../../redux/schoolSlice';

export default () => {

    const dispatch = useDispatch()

    const state = useSelector(state => state.schools)
    const loading = state.loading
    const error = state.error
    const updated = state.updated

    const [schoolName, setSchoolName] = useState('')
    const [schoolDesc, setSchoolDesc] = useState('')

    const errorNotification = f7.notification.create({
        icon: '<i class="fa fa-exclamation-circle text-color-red"></i>',
        title: 'Error',
        subtitle: 'Cannot complete request. Please check your inputs and try again.',
        text: 'If error persists, try again later.',
        closeButton: true,
    })

    const successToast = f7.toast.create({
        icon: '<i class="fa fa-check-circle text-color-green"></i>',
        text: 'School has been saved',
        closeTimeout: 3000,
      })

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(
            addSchoolAsync({
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
        <Page name="new-school">
            <Navbar backLink="Back" sliding  title="Add School" />

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
                        validate
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
                    text='Save'
                    loading={loading}
                    preloader={loading}
                    type="submit" />
                </Block>
            </form>

        </Page>
    );
};
