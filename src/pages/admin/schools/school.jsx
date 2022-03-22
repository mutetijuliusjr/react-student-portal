import React, { useEffect, useState } from 'react';
import {
    FaEllipsisV,
    FaTimesCircle,
    FaTag,
    FaParagraph,
    FaList,
    FaBuilding
} from 'react-icons/fa';

import {
  Col,
  Page,
  Popover,
  Preloader,
  Navbar,
  Block,
  Button,
  Icon,
  NavRight,
  Link,
  List,
  ListItem,
  ListInput,
  BlockTitle,
  f7,
  Row,
  Popup,
  Card,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { editSchoolAsync, deleteSchoolAsync } from '../../../redux/schoolSlice';
import { getDepartmentsAsync } from '../../../redux/departmentSlice';

export default (props) => {
    const { f7router } = props

    const dispatch = useDispatch()
    
    const schools = useSelector((state) => state.schools)
    const school = schools.find(sch => sch.id == props.id) 
    
    const [schoolName, setSchoolName] = useState(school.name)
    const [schoolDesc, setSchoolDesc] = useState(schoolDescription)
    
    const departments = useSelector((state) => state.departments)
    
    var schoolDescription = ""
    var schoolDepts = null
    
    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'School Deleted',
        position: 'bottom',
    })
    
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
        f7.dialog.alert('Saved!')
    }
    
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
    
    
    if(school.description != null){
       schoolDescription = school.description
    }
    
    if (departments != null) {
        schoolDepts = departments.filter((schlDept)=> schlDept.school_id == school.id)   
    }
    
    useEffect(() => { 
        dispatch(getDepartmentsAsync())
    }, [dispatch])

  return (
    
    <Page name="school">
        <Navbar title={`School of ${school.name}`} backLink="Back" sliding={false} >
            <NavRight>
                <Link popoverOpen=".popover-menu">
                    <Icon>
                        <FaEllipsisV />
                    </Icon>
                </Link>
            </NavRight>
        </Navbar>
        <Popover className="popover-menu">
            <List noChevron noHairlines>
                <ListItem link="#" popoverClose title="Edit School" onClick={()=>f7router.navigate(`/edit-school/${school.id}`)} />
                <ListItem link="#" popoverClose title="Add Department" />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete School" 
                onClick={()=>{ f7.dialog.confirm(
                    'Do You Want To Delete School and Related Entities?',
                    'Delete School',
                    )}} />
            </List>
        </Popover>

        <Row noGap>
            <Col width="100" medium="50">
                <BlockTitle>Name</BlockTitle>
                <Card outline padding content={school.name} />
                <BlockTitle>Description</BlockTitle>
                <Card outline padding content={school.description} />
            </Col>
            <Col width="100" medium="50">
                <BlockTitle>Departments</BlockTitle>
                {departments == null ?
                    <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                        <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                    </Block>
                    :
                    <>
                        {schoolDepts.length == 0 ? 
                            <Block>
                                <p>There are no departments for this school</p>
                                <Button text="Add Department" outline color="green" link="#" />
                            </Block>
                            :
                            <List inset noHairlines noChevron>
                                {schoolDepts.map((dept)=>
                                    <ListItem 
                                        key={dept.id} 
                                        title={`Department of ${dept.name}`} 
                                        link={`/department/${dept.id}`} 
                                    >
                                        <Icon color="orange" slot="media">
                                            <FaBuilding />
                                        </Icon>
                                    </ListItem>
                                )}
                            </List>
                        } 
                    </>
                    
                }
            </Col>
        </Row>

    </Page>  
  );
};