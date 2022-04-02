import React, { useEffect} from 'react';
import {
    FaEllipsisV,
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
                <ListItem link="#" popoverClose title="Add Department" onClick={()=>f7router.navigate(`/new-department/?department_id=${department.id}`)} />
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
            </Col>

            <Col width="100" medium="50">
                <BlockTitle>Departments</BlockTitle>
                {loading && departments.length == 0 ?
                <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                    <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                </Block>
                :
                <>
                    {departments.length != 0 &&
                        <>
                            {department.departments.length == 0 ?
                            <Block>
                                <p>There are no departments for this department</p>
                                <Button text="Add Department" outline color="green" href={`/new-department/?department_id=${department.id}`} />
                            </Block>
                            :
                            <List inset noHairlines='true' noChevron>
                                {department.departments.map((dept)=>
                                    <ListItem 
                                        key={dept.id} 
                                        title={`Department of ${dept.name}`} 
                                        link={`/department/${dept.id}`} 
                                    >
                                    <Block
                                        style={{ 
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            margin: '0',
                                            padding: '8px',
                                        }}
                                        bgColor='orange'
                                        slot="media"
                                    >
                                        <FaBuilding style={{fontSize: '24px'}} />
                                    </Block>
                                    </ListItem>
                                )}
                            </List>
                            }
                        </>
                    }
                </>
                }
                
            </Col>
        </Row>
        
    </Page>  
  );
};