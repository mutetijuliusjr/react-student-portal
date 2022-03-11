import React, { useState, useEffect } from 'react';
import { 
    FaPlus, 
    FaBuilding, 
    FaTimesCircle, 
    FaTag, 
    FaAsterisk, 
    FaEnvelope, 
    FaLink, 
    FaPhoneAlt, 
    FaMale, 
    FaBirthdayCake, 
    FaClock, 
    FaParagraph, 
    FaExclamationTriangle, 
    FaSearch, 
    FaEllipsisV 
} from 'react-icons/fa';
import {
  f7,
  Page,
  Popup,
  Popover,
  Menu,
  MenuItem,
  Navbar,
  NavRight,
  Block,
  Button,
  BlockTitle,
  Icon,
  Fab,
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
  Preloader
} from 'framework7-react';

import { useSelector, useDispatch } from 'react-redux';
import { getSchoolsAsync, addSchoolAsync } from '../../redux/schoolSlice';

export default () => {
  const [schoolName, setSchoolName] = useState('')
  const [schoolDesc, setSchoolDesc] = useState('')

  const dispatch = useDispatch()
  const schools = useSelector((state) => state.schools)
 
  const clearForm = ()=>{
      setSchoolName('')
      setSchoolDesc('')
  }

  const onSubmit = (event) => {
    event.preventDefault();
        f7.dialog.preloader('Loading', 'multi')
        dispatch(
            addSchoolAsync({
                name: schoolName,
                description: schoolDesc
            })
        )
        f7.dialog.close()
        f7.dialog.alert('Great!')
    };

  useEffect(() => { 
    dispatch(getSchoolsAsync())
  }, [dispatch])

  return (
    
      
    <Page name="schools">
        <Navbar backLink="Back" sliding title="Schools">
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
    {schools == null ? 
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
            {schools.length == 0 ? 
            <>
                <PageContent className="display-flex flex-direction-column justify-content-center text-align-center">
                    <div>
                        <Icon size="48px">
                            <FaExclamationTriangle />
                        </Icon>
                        <p>Hmm...</p>
                        <p>There are no schools listed.</p>
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
                        {schools.map( (school) => 
                            <ListItem
                                link={`/school/${school.id}`}    
                                key={school.id}
                                title={school.name}
                                text={school.description}
                            >
                                <Icon size="40px" slot="media" color="purple">
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
            <ListItem link="#" popupOpen="#newSchool" popoverClose title="New School" />
        </List>
    </Popover>

    <Popup className="demo-popup-swipe" id="newSchool" swipeToClose>
        <Page>
            <Navbar title="Add School">
                <NavRight>
                    <Link popupClose tooltip="Close">
                        <FaTimesCircle />
                    </Link>
                </NavRight>
            </Navbar>

            <form onSubmit={onSubmit}>
                <List inlineLabels noHairlines>
                    <ListInput
                        label="Name"
                        type="text"
                        placeholder="School name"
                        clearButton={false}
                        required
                        validateOnBlur
                        value={schoolName}
				        onChange={(event) => setSchoolName(event.target.value)}
                    >
                        <Icon color="blue" slot="media">
                            <FaTag />
                        </Icon>
                    </ListInput>
                    <ListInput
                        label="Description"
                        type="textarea"
                        placeholder="School Description"
                        name="description"
                        clearButton={false}
                        resizable
                        value={schoolDesc}
				        onChange={(event) => setSchoolDesc(event.target.value)}
                    >
                        <Icon color="blue" slot="media">
                            <FaParagraph />
                        </Icon>
                    </ListInput>
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
