import React from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import {
  AccordionContent,
  Actions,
  ActionsGroup,
  ActionsLabel,
  ActionsButton,
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button
} from 'framework7-react';

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar sliding={false}>
      <NavLeft>
		    <Link panelOpen="left">
          <FaUserCircle />
		    </Link>
      </NavLeft>
      <NavTitle sliding>Dashboard</NavTitle>
    </Navbar>

    {/* Page content */}
    <Block strong>
      <p>This is an example of tabs-layout application. The main point of such tabbed layout is that each tab contains independent view with its own routing and navigation.</p>

      <p>Each tab/view may have different layout, different navbar type (dynamic, fixed or static) or without navbar like this tab.</p>
    </Block>
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem link="/about/" title="About"/>
      <ListItem link="/form/" title="Form"/>
    </List>

    <BlockTitle>Modals</BlockTitle>
    <Block strong>
      <Row>
        <Col width="50">
          <Button fill raised popupOpen="#my-popup">Popup</Button>
        </Col>
        <Col width="50">
          <Button fill raised loginScreenOpen="#my-login-screen">Login Screen</Button>
        </Col>
      </Row>
    </Block>

    <BlockTitle>Panels</BlockTitle>
    <Block strong>
      <Row>
        <Col width="50">
          <Button fill raised panelOpen="left">Left Panel</Button>
        </Col>
        <Col width="50">
          <Button fill raised panelOpen="right">Right Panel</Button>
        </Col>
      </Row>
    </Block>

    <List>
      <ListItem
        title="Dynamic (Component) Route"
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
      />
      <ListItem
        title="Default Route (404)"
        link="/load-something-that-doesnt-exist/"
      />
      <ListItem
        title="Request Data & Load"
        link="/request-and-load/user/123456/"
      />
    </List>
    
    <BlockTitle>List View Accordion</BlockTitle>
    <List accordionList>
      <ListItem accordionItem title="Lorem Ipsum">
        <AccordionContent>
          <Block>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque
              nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer
              semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est
              rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra
              blandit suscipit eget ipsum.
            </p>
          </Block>
        </AccordionContent>
      </ListItem>
      <ListItem accordionItem title="Nested List">
        <AccordionContent>
          <List>
            <ListItem title="Item 1"></ListItem>
            <ListItem title="Item 2"></ListItem>
            <ListItem title="Item 3"></ListItem>
            <ListItem title="Item 4"></ListItem>
          </List>
        </AccordionContent>
      </ListItem>
      <ListItem accordionItem title="Integer semper">
        <AccordionContent>
          <Block>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque
              nec commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer
              semper arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est
              rhoncus, vel congue dui sollicitudin. Donec eu arcu dignissim felis viverra
              blandit suscipit eget ipsum.
            </p>
          </Block>
        </AccordionContent>
      </ListItem>
    </List>
  </Page>
);
export default HomePage;