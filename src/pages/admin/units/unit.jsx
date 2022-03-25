import React, { useEffect } from 'react';
import {
    FaEllipsisV,
    FaGraduationCap,
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
import { deleteUnitAsync } from '../../../redux/unitSlice';

export default (props) => {
    const { f7router } = props

    const dispatch = useDispatch()
    
    const units = useSelector((state) => state.units)
    const unit = units.find(sch => sch.id == props.id) 
    /* 
    const schools = useSelector((state) => state.schools)
    const courses = useSelector((state) => state.courses)
    
    const schoolName = ()=>{
        if (schools != null) {
            var schl = schools.find((schl) => schl.id == unit.school_id)
            return `School of ${schl.name}`
        }
        else
        {return '...'}
    }
    
    var unitCrses = null
    
    if (courses != null) {
        unitCrses = courses.filter((schlCrse)=> schlCrse.unit_id == unit.id)   
    } */

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

    
   /*  useEffect(() => { 
        dispatch(getCoursesAsync())
    }, [dispatch])
 */
  return (
    
    <Page name="unit">
        <Navbar title={unit.name} backLink="Back" sliding={false} >
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
                <ListItem link="#" popoverClose title="Edit Unit" onClick={()=>f7router.navigate(`/edit-unit/${unit.id}`)} />
                <ListItem link="#" popoverClose title="Add Teacher" />
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
            </List>
        </Popover>

        <Row noGap>
            <Col width="100" medium="50">
                <BlockTitle>Name</BlockTitle>
                <Card outline padding content={unit.name} />
                <BlockTitle>Description</BlockTitle>
                <Card outline padding content={unit.description} />
                {/* <BlockTitle>School</BlockTitle>
                <Card outline className="row padding" >
                    <Col width="70">
                        <span>{schoolName()}</span>
                    </Col>
                    <Col width="30">
                        <Button 
                        href={`/school/${unit.school_id}`}
                        fill
                        color="blue"
                        text="Manage" 
                        />
                    </Col>
                </Card> */}
            </Col>
            <Col width="100" medium="50">
               {/*  <BlockTitle>Units</BlockTitle>
                {courses == null ?
                    <Block className="display-flex flex-direction-column justify-content-center text-align-center">
                        <div><Preloader className="color-multi" size="24px" text="Loading" /></div>
                    </Block>
                    :
                    <>
                        {unitCrses.length == 0 ? 
                            <Block>
                                <p>There are no courses for this unit</p>
                                <Button text="Add Unit" outline color="green" link="#" />
                            </Block>
                            :
                            <List inset noHairlines noChevron>
                                {unitCrses.map((course)=>
                                    <ListItem 
                                        key={course.id} 
                                        title={course.name} 
                                        link={`/course/${course.id}`} 
                                    >
                                        <Icon color="red" slot="media">
                                            <FaGraduationCap />
                                        </Icon>
                                    </ListItem>
                                )}
                            </List>
                        } 
                    </>
                    
                } */}
            </Col> 
        </Row>

    </Page>  
  );
};