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
import { editUnitAsync } from '../../../redux/unitSlice';

export default (props) => {

    const dispatch = useDispatch()
    const units = useSelector((state) => state.units)
    //const instructors = useSelector((state) => state.instructors)
    const unit = units.find(dept=> dept.id == props.id)

    const [unitName, setUnitName] = useState(unit.name)
    const [unitDesc, setUnitDesc] = useState(unit.description)
    const [unitTeacher, setUnitSchl] = useState(unit.instructor_id)

    const successToast = f7.toast.create({
        position: "center",
        closeButton: "true",
        text:'Edit has been saved.',
        closeTimeout: 3000
    })

    const onSubmit = (event) => {
        event.preventDefault();
        f7.dialog.preloader('Loading', 'multi')
        dispatch(
            editUnitAsync({
                id: props.id,
                name: unitName,
                description: unitDesc,
                instructor_id: unitTeacher
            })
        )
        f7.dialog.close()
        successToast.open()
    }


    return (
        <Page name="edit-unit">
            <Navbar backLink="Back" sliding  title="Edit Unit" />

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
                    {/* <ListInput
                        label="School"
                        type="select"
                        value={unitTeacher}
                        onChange={(event) => setUnitSchl(event.target.value)}
                        >
                        {instructors.map(instructor=>
                            <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
                            )
                        }
                        
                    </ListInput> */}
                </List>
                <Button outline color="green" text="Save" type="submit" />
            </form>

        </Page>
    );
};
