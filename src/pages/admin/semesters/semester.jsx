import React, { useEffect, useState } from 'react';
import {
    FaEllipsisV,
    FaGraduationCap,
    FaLink,
    FaBookOpen
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
  BlockTitle,
  f7,
  Row,
  Card,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getSemesterAsync } from '../../../redux/semesterSlice';
import { getUnitsAsync } from '../../../redux/unitSlice';

export default (props) => {
    const { f7router } = props

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Semester Deleted',
        position: 'bottom',
    })
    
    const deleteSemester = () => {
        f7router.back()
        f7.dialog.close()
        f7.dialog.preloader('Loading')
        dispatch(deleteSemesterAsync({id: props.id}))
        setTimeout(() => {
            f7.dialog.close()
            deleteToast.open()
        } ,3000)    
    }

    
    useEffect(() => { 
        dispatch(getSemesterAsync({id: props.id}))
    }, [dispatch])

  return (
    
    <Page name="semester">
        <Navbar title={`semester.name`} backLink="Back" sliding={false} >
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
                <ListItem link="#" popoverClose 
                title="Edit Semester" 
                onClick={()=>f7router.navigate(`/edit-semester/${semester.id}`)} />
                <ListItem link="#" popoverClose 
                title="Add Unit" 
                onClick={()=>f7router.navigate('/new-unit/')} />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete Semester" 
                onClick={()=>{ f7.dialog.confirm(
                    "Do You Want To Delete This Semester and It's Related Entities?",
                    'Delete Semester',
                    ()=>{deleteSemester()}
                    )}} />
            </List>
        </Popover>

        <Row noGap>
            <Col width="100" medium="50">
                <BlockTitle>Name</BlockTitle>
                <Card outline padding content={loading ? 'loading...':"semester.name"} />
                <BlockTitle>Code</BlockTitle>
                <Card outline padding content={loading ? 'loading...':"semester.code"} />
                <BlockTitle>Course</BlockTitle>
                <Card outline className="row padding" >
                    <Col width="70">
                    {loading ? 
                        'loading...'
                        :
                        <span>courseName</span>
                    }
                    </Col>
                    <Col width="30">
                        {!loading && 
                            <Button 
                            href={`/course/semester.course_id`}
                            fill
                            color="blue"
                            text="Manage"
                            />
                        }
                    </Col>
                </Card>
            </Col>
            <Col width="100" medium="50">
                <BlockTitle>Units</BlockTitle>
                <List inset noHairlines noChevron>
                
                </List>
            </Col>
        </Row>

    </Page>  
  );
};