import React, { useState, useEffect } from 'react';
import {  
    FaBuilding, 
    FaTimes, 
    FaTag,  
    FaParagraph, 
    FaExclamationTriangle,
    FaEllipsisV 
} from 'react-icons/fa';
import {
  f7,
  Page,
  Popup,
  Popover,
  Navbar,
  NavRight,
  Button,
  Icon,
  List,
  Link,
  ListItem,
  ListInput,
  SkeletonBlock,
  Searchbar,
  Subnavbar,
  Row,
  Range,
  Col,
  theme,
  Views,
  View,
  PageContent,
} from 'framework7-react';
import { useSelector, useDispatch } from 'react-redux';
import { editSchoolAsync } from '../../../redux/schoolSlice';

export default () => {

    const dispatch = useDispatch()
    const schools = useSelector((state) => state.schools)
    const school = schools.find(sch => sch.id == props.id)

    const [schoolName, setSchoolName] = useState(school.name)
    const [schoolDesc, setSchoolDesc] = useState(initialschoolDesc)

    var initialschoolDesc = ""
    
    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'School Deleted',
        position: 'bottom',
    })

    const deleteSchool = () => {
        f7router.back()
        f7.dialog.close()
        f7.dialog.preloader('Loading')
        dispatch(deleteSchoolAsync({id: props.id}))
        setTimeout(() => {
            f7.dialog.close()
            deleteToast.open()
        } ,3000)    
    }

    const onSubmit = (event) => {
        event.preventDefault();
        f7.dialog.preloader('Loading', 'multi')
        dispatch(
            addSchoolAsync({
                id: props.id,
                name: schoolName,
                description: schoolDesc
            })
        )
        f7.dialog.close()
        f7.dialog.alert('New School has been saved.', 'Saved!')
    }

    if(school.description != null){
        initialschoolDesc = school.description
    }

    return (
        <Page name="edit-school">
            <Navbar backLink="Back" sliding  title="edit School" />

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
