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
import { editDepartmentAsync } from '../../../redux/departmentSlice';

export default (props) => {

    const dispatch = useDispatch()
    const departments = useSelector((state) => state.departments)
    const schools = useSelector((state) => state.schools)
    const department = departments.find(dept=> dept.id == props.id)

    const [departmentName, setDepartmentName] = useState(department.name)
    const [departmentDesc, setDepartmentDesc] = useState(department.description)
    const [departmentSchl, setDepartmentSchl] = useState(department.school_id)

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
            editDepartmentAsync({
                id: props.id,
                name: departmentName,
                description: departmentDesc,
                school_id: departmentSchl
            })
        )
        f7.dialog.close()
        successToast.open()
    }


    return (
        <Page name="edit-department">
            <Navbar backLink="Back" sliding  title="Edit Department" />

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
