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
  Col,
  theme,
  PageContent,
  BlockTitle,
  Block,
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getDepartmentsAsync, addDepartmentAsync } from '../../redux/departmentSlice';
import { getSchoolsAsync } from '../../redux/schoolSlice';

export default () => {
  const [departmentName, setDepartmentName] = useState('')
  const [departmentDesc, setDepartmentDesc] = useState('')
  const [departmentSchl, setDepartmentSchl] = useState('')

  const dispatch = useDispatch()
  const departments = useSelector((state) => state.departments)
  const schools = useSelector((state) => state.schools)

  const schoolName = (id)=>{
      if (schools != null) {
          var schl = schools.find((schl) => schl.id == id)
          return `School of ${schl.name}`
      }
      else
      {return '...'}
  }


  const departmentCreatedToast = f7.toast.create({
    text: 'Department created!',
    position: 'bottom',
    horizontalPosition: 'center',
    closeTimeout: 3000,
  })

  const clearForm = ()=>{
      setDepartmentName('')
      setDepartmentDesc('')
  }

  const onSubmit = (event) => {
    event.preventDefault();
        f7.dialog.preloader('Loading', 'multi') 
        dispatch(
            addDepartmentAsync({
                name: departmentName,
                description: departmentDesc,
                school_id: departmentSchl
            })
        ) 
        f7.dialog.close()
        departmentCreatedToast.open()
    };

  useEffect(() => {
    dispatch(getDepartmentsAsync())
    dispatch(getSchoolsAsync())
  }, [dispatch])

  return (
    
      
    <Page name="departments">
        <Navbar backLink="Back" sliding title="Departments">
            <NavRight>
                <Link popoverOpen=".popover-menu">
                    <Icon>
                        <FaEllipsisV />
                    </Icon>
                </Link>
            </NavRight>
            <Subnavbar>
                <Searchbar
                    style={{position: "static"}}
                    searchContainer=".search-list"
                    searchIn=".item-title"
                    disableButton={!theme.aurora}
                ></Searchbar>
            </Subnavbar>
        </Navbar>
    {departments == null ? 
    <>
        <List mediaList className="skeleton-text skeleton-effect-fade">
            <ListItem
            title="Title"
            subtitle="Subtitle"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
            >
            <SkeletonBlock
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                slot="media"
            />
            </ListItem>
            <ListItem
            title="Title"
            subtitle="Subtitle"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
            >
            <SkeletonBlock
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                slot="media"
            />
            </ListItem>
            <ListItem
            title="Title"
            subtitle="Subtitle"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
            >
            <SkeletonBlock
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                slot="media"
            />
            </ListItem>
            <ListItem
            title="Title"
            subtitle="Subtitle"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
            >
            <SkeletonBlock
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                slot="media"
            />
            </ListItem>
            <ListItem
            title="Title"
            subtitle="Subtitle"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
            >
            <SkeletonBlock
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                slot="media"
            />
            </ListItem>
            <ListItem
            title="Title"
            subtitle="Subtitle"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum."
            >
            <SkeletonBlock
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                slot="media"
            />
            </ListItem>
        </List>
    </>
    :
        <>
            {departments.length == 0 ? 
            <>
                <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
                    <div>
                        <Icon size="48px">
                            <FaExclamationTriangle />
                        </Icon>
                        <p>Hmm...</p>
                        <p>There are no departments listed.</p>
                        <p>Yet.</p>
                    </div>
                </PageContent>
            </>
            :
            <>
                <PageContent className="padding-vertical">
                    <List className="searchbar-not-found">
                        <ListItem title="Nothing found"></ListItem>
                    </List>
                    
                    <List mediaList  className="search-list searchbar-found">
                        {departments.map( (department) => 
                            <ListItem
                                link={`/department/${department.id}`}    
                                key={department.id}
                                title={`Department of ${department.name}`}
                                subtitle={schoolName(department.school_id)}
                                text={department.description}
                            >
                                <Icon size="40px" slot="media" color="orange">
                                    <FaBuilding />
                                </Icon>
                            </ListItem>
                        )}
                    </List>    
                </PageContent> 
            </>
            } 
        </>
    }

    <Popover className="popover-menu">
        <List noChevron noHairlines="true">
            <ListItem link="#" popupOpen="#newDepartment" popoverClose title="New Department" />
        </List>
    </Popover>

    <Popup className="demo-popup-swipe" id="newDepartment" swipeToClose>
        <Page>
            <Navbar title="Add Department">
                <NavRight>
                    <Link popupClose tooltip="Close">
                        <FaTimes />
                    </Link>
                </NavRight>
            </Navbar>

            <form onSubmit={onSubmit}>
                <List inlineLabels noHairlines>
                    <ListInput
                        label="Name"
                        type="text"
                        placeholder="Department name"
                        clearButton={false}
                        required
                        validateOnBlur
                        value={departmentName}
				        onChange={(event) => setDepartmentName(event.target.value)}
                    >
                        <Icon color="blue" slot="media">
                            <FaTag />
                        </Icon>
                    </ListInput>
                    <ListInput
                        label="Description"
                        type="textarea"
                        placeholder="Department Description"
                        name="description"
                        clearButton={false}
                        resizable
                        value={departmentDesc}
				        onChange={(event) => setDepartmentDesc(event.target.value)}
                    >
                        <Icon color="blue" slot="media">
                            <FaParagraph />
                        </Icon>
                    </ListInput>
                    <BlockTitle>School</BlockTitle>
                    {schools != null && 
                        <Block className="no-padding">
                           <List mediaList>
                           <ListInput
                               label="Name"
                               name="school_id"
                               type="select"
                               value={departmentSchl}
                               onChange={(event) => setDepartmentSchl(event.target.value)}
                           >
                               <Icon color="blue" slot="media">
                                   <FaBuilding />
                               </Icon>
                               <option>Choose a School</option>
                               {schools.map((school)=>
                                   <option key={school.id} value={school.id}>{`School of ${school.name}`}</option>
                               )}
                               
                               
                           </ListInput>
                           </List>
                       </Block>     
                    }
                </List>
                <Row>
                    <Col><Button outline color="red" text="Clear" onClick={clearForm} /></Col>
                    <Col><Button outline color="green" text="Save" type="submit" /></Col>
                </Row>
            </form>

        </Page>
    </Popup>
    

    </Page>
      
    
  );
};
