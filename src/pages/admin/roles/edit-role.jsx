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
import { useSelector, useDispatch } from 'react-redux';
import { editRoleAsync } from '../../../redux/roleSlice';

export default (props) => {

    const dispatch = useDispatch()
    const state = useSelector(state => state.roles)
    const loading = state.loading
    const error = state.error
    const updated = state.updated
    const role = state.data.find(sch => sch.id == props.id)
    
    const [roleName, setRoleName] = useState(role.name)

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
            editRoleAsync({
                id: props.id,
                name: roleName
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
        <Page name="edit-role">
            <Navbar backLink="Back" sliding  title="Edit Role" />

            <form onSubmit={onSubmit}>
                <List noHairlinesMd>
                    <ListInput
                        outline
                        label="Name"
                        floatingLabel
                        type="text"
                        placeholder="Role name"
                        clearButton
                        required
                        validateOnBlur
                        value={roleName}
                        onChange={(event) => setRoleName(event.target.value)}
                    >
                    </ListInput>
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
