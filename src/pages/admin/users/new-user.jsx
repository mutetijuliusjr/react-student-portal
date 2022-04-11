import React, { useState, useEffect } from 'react';
import {
  f7,
  Page,
  Navbar,
  Button,
  List,
  ListInput,
  Block,
  BlockTitle,
  ListItem,
} from 'framework7-react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAsync, addUserAsync } from '../../../redux/userSlice';
import { getRolesAsync } from '../../../redux/roleSlice';
import { getCoursesAsync } from '../../../redux/courseSlice';
import { getUnitsAsync } from '../../../redux/unitSlice';

export default () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getRolesAsync())
        dispatch(getUsersAsync())
        dispatch(getCoursesAsync())
        dispatch(getUnitsAsync())
    }, [dispatch])
    
    const users =  useSelector(state => state.users)
    const roles =  useSelector(state => state.roles)
    const courses =  useSelector(state => state.courses)
    const units =  useSelector(state => state.units)

    const [userRoles, setUserRoles] = useState([])


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
        text: 'Please choose a role.',
        closeTimeout: 3000,
        position: 'center'
    })

    const successToast = f7.toast.create({
        icon: '<i class="fa fa-check-circle text-color-green style="font-size: 30px""></i>',
        text: 'User has been saved',
        closeTimeout: 3000,
      })

    const onSubmit = (event) => {
        event.preventDefault();
            dispatch(
                addUserAsync({
                    name: userName,
                    description: userDesc,
                    role_id: roleId
                })
            )
    }
        
    if (users.updated) {
        successToast.open()
    }
    
    if(users.error && !users.updated) {
        errorNotification.open()
    }

    return (
        <Page name="new-user">
            <Navbar backLink="Back" sliding  title="Add User" />

            <form onSubmit={onSubmit}>
                <BlockTitle>Personal Information </BlockTitle>
                <List noHairlinesMd>
                    <ListInput
                        outline
                        label="First name"
                        floatingLabel
                        type="text"
                        placeholder="Required"
                        clearButton
                        required
                        validate
                    >
                    </ListInput>
                    <ListInput
                        outline
                        label="Last name"
                        floatingLabel
                        type="text"
                        placeholder="Last name"
                        clearButton
                    >
                    </ListInput>
                    <ListInput
                        outline
                        label="Surname"
                        floatingLabel
                        type="text"
                        placeholder="Surname"
                        clearButton
                    >
                    </ListInput>                    
                    <ListInput
                        outline
                        label="ID Number"
                        floatingLabel
                        type="text"
                        placeholder="ID Number"
                        clearButton
                    >
                    </ListInput> 
                </List>

                <BlockTitle>Contact Information</BlockTitle>
                <List noHairlinesMd>
                    <ListInput
                        outline
                        label="Phone Number"
                        floatingLabel
                        type="tel"
                        placeholder="Phone Number"
                        clearButton
                    >
                    </ListInput>                    
                    <ListInput
                        outline
                        label="E-mail"
                        floatingLabel
                        type="email"
                        placeholder="E-mail"
                        clearButton
                    >
                    </ListInput>  
                </List>

                <BlockTitle>Roles</BlockTitle>
                <List noHairlinesMd>
                    <ListItem title="User Role" />                    
                    <ListItem title="Please choose..." smartSelect smartSelectParams={{ openIn: 'popover' }}>
                        <select multiple >
                            {roles.data.length != 0 && 
                                <>                            
                                {roles.data.map((role)=>
                                <option 
                                key={role.id} 
                                value={role.id}
                                onSelect={(event) => setUserRoles([...userRoles, event.target.value])}
                                >
                                {role.name}
                                </option>
                                )}
                                </>
                            }
                        </select>
                    </ListItem>
                </List>
                
                {console.log(userRoles)}
                <BlockTitle>Student information</BlockTitle>
                <List noHairlinesMd>
                    <ListInput
                        outline
                        label="Registration number"
                        floatingLabel
                        type="text"
                        placeholder="Required"
                        clearButton
                        required
                        validate
                    >
                    </ListInput>
                    <ListItem title="Student Course(s)" />
                    <ListItem title="Please choose..." smartSelect smartSelectParams={{ openIn: 'popover' }}>
                        <select multiple>
                            {courses.data.length != 0 && 
                                <>                            
                                {courses.data.map((course)=>
                                <option key={course.id} value={course.id}>{course.name}</option>
                                )}
                                </>
                            }
                        </select>
                    </ListItem>
                    <ListInput
                        label="Intake"
                        type="date"
                        placeholder="Intake"
                    ></ListInput>
                </List>
                <BlockTitle>Teacher information</BlockTitle>
                <List noHairlinesMd>
                    <ListItem title="Unit(s) Currently Teaching" />
                    <ListItem title="Please choose..." smartSelect smartSelectParams={{ openIn: 'popover' }}>
                        <select multiple>
                            {units.data.length != 0 && 
                                <>                            
                                {units.data.map((course)=>
                                <option key={unit.id} value={unit.id}>{unit.name}</option>
                                )}
                                </>
                            }
                        </select>
                    </ListItem>
                </List>

                <Block>
                {!roles.loading && 
                    <Button
                    fill
                    round
                    color="green" 
                    text='Save'
                    loading={users.loading}
                    preloader={users.loading}
                    type="submit" />
                }
                </Block>
            </form>

        </Page>
    );
};
