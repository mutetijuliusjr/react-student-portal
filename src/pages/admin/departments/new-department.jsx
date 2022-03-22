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
import { addSchoolAsync } from '../../../redux/schoolSlice';

export default () => {

    const dispatch = useDispatch()

    const [schoolName, setSchoolName] = useState('')
    const [schoolDesc, setSchoolDesc] = useState('')

    const onSubmit = (event) => {
        event.preventDefault();
        f7.dialog.preloader('Loading', 'multi')
        dispatch(
            addSchoolAsync({
                name: schoolName,
                description: schoolDesc
            })
        )
        f7.dialog.close()
        f7.dialog.alert('New School has been saved.', 'Saved!')
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
