import React, { useEffect} from 'react';
import {
    FaEllipsisV,
    FaGraduationCap,
    FaBriefcase,
    FaClipboard
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
import { getUnitsAsync, deleteUnitAsync } from '../../../redux/unitSlice';

export default (props) => {
    const dispatch = useDispatch()
    
    useEffect(() => { 
        dispatch(getUnitsAsync())
    }, [dispatch])
    
    const { f7router } = props
    const state = useSelector((state) => state.units)
    
    const units = state.data
    const loading = state.loading
    const deleteToast = f7.toast.create({
        closeTimeout: 5000,
        text: 'Unit Deleted',
        position: 'bottom',
    })
    
    
    const deleteUnit = () => {
        f7router.back()
        f7.dialog.close()
        f7.dialog.preloader('Loading')
        dispatch(deleteUnitAsync({id: props.id}))
        setTimeout(() => {
            f7.dialog.close()
            deleteToast.open()
        } ,3000)    
    }
    
    let unit

    if (units.length != 0) {
        unit = units.find(sch => sch.id == props.id)
    }


  return (
    
    <Page name="unit"> 
        <Navbar 
        title={!loading && units.length != 0 && unit.name}
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
                <ListItem link="#" popoverClose title="Edit Unit" onClick={()=>f7router.navigate(`/edit-unit/${unit.id}`)} />
                <ListItem link="#" popoverClose title="Add Teacher"  />
                <ListItem 
                link="#" 
                popoverClose
                textColor="red" 
                title="Delete Unit" 
                onClick={()=>{ f7.dialog.confirm(
                    "Do You Want To Delete This Unit and It's Related Entities?",
                    'Delete Unit',
                    ()=>{deleteUnit()}
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
                content={units.length == 0 ?<p className="skeleton-text">skeleton text</p> :unit.name}
                 />                
                <BlockTitle>Description</BlockTitle>
                <Card 
                outline 
                padding 
                content={units.length == 0 ?
                        <p className="skeleton-text">
                            Card with header and footer. 
                            Card headers are used to display card titles 
                            and footers for additional information or 
                            just for custom actions.
                        </p> 
                        :
                        unit.description}
                 />               
                              
            </Col>

            <Col width="100" medium="50">
                <BlockTitle>Teachers</BlockTitle>
                    {loading ?
                    <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                        <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                    </Block>
                    :
                    <> 
                    {unit.instructors.length == 0 ?
                    <Block>
                        <p>There are no teachers for this unit</p>
                        <Button text="Add Teacher" outline color="green" href='#' />
                    </Block>
                    :
                    <List inset noHairlines='true' noChevron>
                        {unit.instructors.map((instructor)=>
                            <ListItem 
                                key={instructor.id} 
                                title={`${instructor.user.profile.first_name} ${instructor.user.profile.last_name} ${instructor.user.profile.surname}`} 
                                link={`/instructor/${instructor.id}`} 
                            >
                            <Block
                                style={{ 
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    margin: '0',
                                    padding: '8px',
                                }}
                                bgColor='brown'
                                slot="media"
                            >
                                <FaBriefcase color="white" style={{fontSize: '24px'}} />
                            </Block>
                            </ListItem>
                        )}
                    </List>
                    }
                    </>
                }
                <BlockTitle>Semesters</BlockTitle>
                {loading ?
                <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                    <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                </Block>
                :
                <> 
                {unit.semesters.length == 0 ?
                <Block>
                    <p>There are no units for this unit</p>
                    <Button text="Add Course" outline color="green" href={`/new-course/?unit_id=${unit.id}`} />
                </Block>
                :
                <List inset noHairlines='true' noChevron>
                    {unit.semesters.map((semester)=>
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
                            bgColor='gree'
                            slot="media"
                        >
                            <FaClipboard color="white" style={{fontSize: '24px'}} />
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