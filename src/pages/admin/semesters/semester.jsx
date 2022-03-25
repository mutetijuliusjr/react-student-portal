import React, { useEffect } from 'react';
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
import { getCoursesAsync } from '../../../redux/courseSlice';
import { getUnitsAsync } from '../../../redux/unitSlice';

export default (props) => {
    const { f7router } = props

    const dispatch = useDispatch()
    
    const semesters = useSelector((state) => state.semesters)
    const semester = semesters.find(sch => sch.id == props.id) 
    const courses = useSelector((state) => state.courses)
    const units = useSelector((state) => state.units)

    var u1 = null
    var u2 = null
    var u3 = null
    var u4 = null
    var u5 = null
    var u6 = null
    var u7 = null
    var u8 = null
    var u9 = null

    if (units != null) {
    u1 = units.find((unit)=>unit.id == semester.unit_1)
    u2 = units.find((unit)=>unit.id == semester.unit_2)
    u3 = units.find((unit)=>unit.id == semester.unit_3)
    u4 = units.find((unit)=>unit.id == semester.unit_4)
    u5 = units.find((unit)=>unit.id == semester.unit_5)
    u6 = units.find((unit)=>unit.id == semester.unit_6)
    u7 = units.find((unit)=>unit.id == semester.unit_7)
    u8 = units.find((unit)=>unit.id == semester.unit_8)
    u9 = units.find((unit)=>unit.id == semester.unit_9)
    }
    
    const courseName = ()=>{
        if (courses != null) {
            var schl = courses.find((schl) => schl.id == semester.course_id)
            return schl.name
        }
        else
        {return '...'}
    }
    
    var semesterCrses = null
    
    if (units != null) {
        semesterCrses = units.filter((schlCrse)=> schlCrse.semester_id == semester.id)   
    }

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
        dispatch(getUnitsAsync())
        dispatch(getCoursesAsync())
    }, [dispatch])

  return (
    
    <Page name="semester">
        <Navbar title={`Semester of ${semester.name}`} backLink="Back" sliding={false} >
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
                <Card outline padding content={semester.name} />
                <BlockTitle>Code</BlockTitle>
                <Card outline padding content={semester.code} />
                <BlockTitle>Course</BlockTitle>
                <Card outline className="row padding" >
                    <Col width="70">
                        <span>{courseName()}</span>
                    </Col>
                    <Col width="30">
                        <Button 
                        href={`/course/${semester.course_id}`}
                        fill
                        color="blue"
                        text="Manage" 
                        />
                    </Col>
                </Card>
            </Col>
            <Col width="100" medium="50">
                <BlockTitle>Units</BlockTitle>
                <List inset noHairlines noChevron>
                {u1 != null &&  
                    <ListItem
                        title={u1.name} 
                        link={`/unit/${u1.id}`} 
                    >
                        <Icon color="green" slot="media">
                            <FaBookOpen />
                        </Icon>
                    </ListItem>
                }
                {u2 != null &&  
                    <ListItem
                        title={u2.name} 
                        link={`/unit/${u2.id}`} 
                    >
                        <Icon color="green" slot="media">
                            <FaBookOpen />
                        </Icon>
                    </ListItem>
                }
                {u3 != null &&  
                    <ListItem
                        title={u3.name} 
                        link={`/unit/${u3.id}`} 
                    >
                        <Icon color="green" slot="media">
                            <FaBookOpen />
                        </Icon>
                    </ListItem>
                }
                {u4 != null &&  
                    <ListItem
                        title={u4.name} 
                        link={`/unit/${u4.id}`} 
                    >
                        <Icon color="green" slot="media">
                            <FaBookOpen />
                        </Icon>
                    </ListItem>
                }
                {u5 != null &&  
                    <ListItem
                        title={u5.name} 
                        link={`/unit/${u5.id}`} 
                    >
                        <Icon color="green" slot="media">
                            <FaBookOpen />
                        </Icon>
                    </ListItem>
                }
                {u6 != null &&  
                    <ListItem
                        title={u6.name} 
                        link={`/unit/${u6.id}`} 
                    >
                        <Icon color="green" slot="media">
                            <FaBookOpen />
                        </Icon>
                    </ListItem>
                }
                {u7 != null &&  
                    <ListItem
                        title={u7.name} 
                        link={`/unit/${u7.id}`} 
                    >
                        <Icon color="green" slot="media">
                            <FaBookOpen />
                        </Icon>
                    </ListItem>
                }
                {u8 != null &&  
                    <ListItem
                        title={u8.name} 
                        link={`/unit/${u8.id}`} 
                    >
                        <Icon color="green" slot="media">
                            <FaBookOpen />
                        </Icon>
                    </ListItem>
                }
                {u9 != null &&  
                    <ListItem
                        title={u9.name} 
                        link={`/unit/${u9.id}`} 
                    >
                        <Icon color="green" slot="media">
                            <FaBookOpen />
                        </Icon>
                    </ListItem>
                }
                </List>
            </Col>
        </Row>

    </Page>  
  );
};