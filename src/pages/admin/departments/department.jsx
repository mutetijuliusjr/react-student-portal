import React, { useEffect} from 'react';
import {
    FaEllipsisV,
    FaGraduationCap
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
import { getDepartmentsAsync, deleteDepartmentAsync } from '../../../redux/departmentSlice';

export default (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => { 
        dispatch(getDepartmentsAsync())
    }, [dispatch])
    
    const { f7router } = props
    const state = useSelector((state) => state.departments)
    
    const departments = state.data
    const loading = state.loading
    const error = state.error 
    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Department Deleted',
        position: 'bottom',
    })
    
    
    const deleteDepartment = () => {
        f7router.back()
        f7.dialog.close()
        f7.dialog.preloader('Loading')
        dispatch(deleteDepartmentAsync({id: props.id}))
        setTimeout(() => {
            f7.dialog.close()
            deleteToast.open()
        } ,3000)    
    }
    
    let department

    if (departments.length != 0) {
        department = departments.find(sch => sch.id == props.id)
    }


  return (
    
    <Page name="department"> 
        <Navbar 
        title={!loading && departments.length != 0 && `Department of ${department.name}`} 
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
                <ListItem link="#" popoverClose title="Edit Department" onClick={()=>f7router.navigate(`/edit-department/${department.id}`)} />
                <ListItem link="#" popoverClose title="Add Course" onClick={()=>f7router.navigate(`/new-course/?department_id=${department.id}`)} />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete Department" 
                onClick={()=>{ f7.dialog.confirm(
                    "Do You Want To Delete This Department and It's Related Entities?",
                    'Delete Department',
                    ()=>{deleteDepartment()}
                    )}} />
            </List>
            }
        </Popover>

        <Row noGap>
            <Col width="100" medium="50">
                <BlockTitle>Name</BlockTitle>
                <Card 
                outline 
                padding 
                content={departments.length == 0 ?<p className="skeleton-text">skeleton text</p> :department.name}
                 />                
                <BlockTitle>Description</BlockTitle>
                <Card 
                outline 
                padding 
                content={departments.length == 0 ?
                        <p className="skeleton-text">
                            Card with header and footer. 
                            Card headers are used to display card titles 
                            and footers for additional information or 
                            just for custom actions.
                        </p> 
                        :
                        department.description}
                 /> 
                <BlockTitle>School</BlockTitle>
                <Card outline className="row padding" >
                    <Col width="70">
                        <span>School of {department.school.name}</span>
                    </Col>
                    <Col width="30">
                        <Button 
                        href={`/school/${department.school.id}`}
                        fill
                        round
                        color="blue"
                        text="Manage" 
                        />
                    </Col>
                </Card>               
            </Col>

            <Col width="100" medium="50">
                <BlockTitle>Courses</BlockTitle>
                {loading ?
                <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                    <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                </Block>
                :
                <> 
                {department.courses.length == 0 ?
                <Block>
                    <p>There are no departments for this department</p>
                    <Button text="Add Course" outline color="green" href={`/new-course/?department_id=${department.id}`} />
                </Block>
                :
                <List inset noHairlines='true' noChevron>
                    {department.courses.map((course)=>
                        <ListItem 
                            key={course.id} 
                            title={course.name} 
                            link={`/course/${course.id}`} 
                        >
                        <Block
                            style={{ 
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                margin: '0',
                                padding: '8px',
                            }}
                            bgColor='red'
                            slot="media"
                        >
                            <FaGraduationCap color="white" style={{fontSize: '24px'}} />
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