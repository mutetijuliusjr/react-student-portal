import React, { useEffect} from 'react';
import {
    FaEllipsisV,
    FaGraduationCap,
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
import { getCoursesAsync, deleteCourseAsync } from '../../../redux/courseSlice';

export default (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => { 
        dispatch(getCoursesAsync())
    }, [dispatch])
    
    const { f7router } = props
    const state = useSelector((state) => state.courses)
    
    const courses = state.data
    const loading = state.loading
    const error = state.error 
    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Course Deleted',
        position: 'bottom',
    })
    
    
    const deleteCourse = () => {
        f7router.back()
        f7.dialog.close()
        f7.dialog.preloader('Loading')
        dispatch(deleteCourseAsync({id: props.id}))
        setTimeout(() => {
            f7.dialog.close()
            deleteToast.open()
        } ,3000)    
    }
    
    let course

    if (courses.length != 0) {
        course = courses.find(sch => sch.id == props.id)
    }


  return (
    
    <Page name="course"> 
        <Navbar 
        title={!loading && courses.length != 0 && course.name} 
        backLink="Back" 
        sliding={false} >
            <NavRight>
                <Link popoverOpen=".popover-menu">
                    <Icon>
                        <FaEllipsisV />
                    </Icon>
                </Link>
            </NavRight>
        </Navbar>
        <Popover className="popover-menu">
            {!loading && 
            <List noChevron noHairlines>
                <ListItem link="#" popoverClose title="Edit Course" onClick={()=>f7router.navigate(`/edit-course/${course.id}`)} />
                <ListItem link="#" popoverClose title="Add Course" onClick={()=>f7router.navigate(`/new-course/?course_id=${course.id}`)} />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete Course" 
                onClick={()=>{ f7.dialog.confirm(
                    "Do You Want To Delete This Course and It's Related Entities?",
                    'Delete Course',
                    ()=>{deleteCourse()}
                    )}} />
                <ListItem link="#" popoverClose title="Back To Home" onClick={()=>f7router.navigate("/admin/")} />
            </List>
            }
        </Popover>

        <Row noGap>
            <Col width="100" medium="50">
                <BlockTitle>Name</BlockTitle>
                <Card 
                outline 
                padding 
                content={courses.length == 0 ?<p className="skeleton-text">skeleton text</p> :course.name}
                 />                
                <BlockTitle>Description</BlockTitle>
                <Card 
                outline 
                padding 
                content={courses.length == 0 ?
                        <p className="skeleton-text">
                            Card with header and footer. 
                            Card headers are used to display card titles 
                            and footers for additional information or 
                            just for custom actions.
                        </p> 
                        :
                        course.description}
                 /> 
                <BlockTitle>Department</BlockTitle>
                <Card outline className="row padding" >
                    <Col width="70">
                        <span>Department of {course.department.name}</span>
                    </Col>
                    <Col width="30">
                        <Button 
                        href={`/department/${course.department.id}`}
                        fill
                        round
                        color="blue"
                        text="Manage" 
                        />
                    </Col>
                </Card>               
            </Col>

            <Col width="100" medium="50">
                <BlockTitle>Semesters</BlockTitle>
                {loading ?
                <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                    <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                </Block>
                :
                <> 
                {course.semesters.length == 0 ?
                <Block>
                    <p>There are no semesters for this course</p>
                    <Button text="Add Semester" outline color="green" href={`/new-semester/?course_id=${course.id}`} />
                </Block>
                :
                <List inset noHairlines='true' noChevron>
                    {course.semesters.map((semester)=>
                        <ListItem 
                            key={semester.id} 
                            title={semester.name} 
                            link={`/semester/${semester.id}`} 
                        >
                        <Block
                            style={{ 
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                margin: '0',
                                padding: '8px',
                            }}
                            bgColor='green'
                            slot="media"
                        >
                            <FaBookOpen color="white" style={{fontSize: '24px'}} />
                        </Block>
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