import React from 'react';
import { 
    FaUserCircle, 
    FaUsers, 
    FaTimesCircle, 
    FaGraduationCap, 
    FaBuilding, 
    FaRegBuilding,
    FaClipboard,
    FaBookOpen,
    FaQuidditch,
    FaCalendarCheck,
    FaCalendarAlt,
    FaClipboardCheck,
    FaPenFancy
 } from 'react-icons/fa';
import {
  Page,
  Popup,
  Navbar,
  Tab,
  Tabs,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  Icon,
  List,
  ListItem,
  Swiper,
  SwiperSlide,
  Row,
  Col,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
  Chip,
  Fab,
  FabButtons,
  FabButton,
  View
} from 'framework7-react';
import { width } from 'dom7';

const AdminHomePage = () => (
  <Page name="admin-home">
    {/* Top Navbar */}
    <Navbar sliding={false}>
      <NavLeft>
		    <Link panelOpen="left">
                <FaUserCircle />
		    </Link>
      </NavLeft>
      <NavTitle sliding>Admin</NavTitle>
    </Navbar>
    
    <BlockTitle>School Management</BlockTitle>
    <Block strong>
        <Link href="/schools/">
            <Card style={{width: "80px", height: "80px"}} bgColor="purple">
                <CardContent className="display-flex justify-content-center">
                    <Icon size="24px" color="white">
                        <FaBuilding />
                    </Icon>
                </CardContent>
                <span className="display-flex justify-content-center">
                    <Chip bgColor="deeppurple" textColor="white" outline>Schools</Chip>
                </span>
            </Card>
        </Link>
        <Link href="/departments/">
            <Card style={{width: "80px", height: "80px"}} bgColor="orange">
                <CardContent className="display-flex justify-content-center">
                    <Icon size="24px" color="white">
                        <FaRegBuilding />
                    </Icon>
                </CardContent>
                <span className="display-flex justify-content-center">
                    <Chip bgColor="deeppurple" textColor="white" outline>Departments</Chip>
                </span>
            </Card>
        </Link>
        <Link href="/courses/">
            <Card style={{width: "80px", height: "80px"}} bgColor="red">
                <CardContent className="display-flex justify-content-center">
                    <Icon size="24px" color="white">
                        <FaGraduationCap />
                    </Icon>
                </CardContent>
                <span className="display-flex justify-content-center">
                    <Chip bgColor="deeppurple" textColor="white" outline>Courses</Chip>
                </span>
            </Card>
        </Link>
        <Link href="/semesters/">
            <Card style={{width: "80px", height: "80px"}} bgColor="green">
                <CardContent className="display-flex justify-content-center">
                    <Icon size="24px" color="white">
                        <FaClipboard />
                    </Icon>
                </CardContent>
                <span className="display-flex justify-content-center">
                    <Chip bgColor="deeppurple" textColor="white" outline>Semesters</Chip>
                </span>
            </Card>
        </Link>
        <Link href="/units/">
            <Card style={{width: "80px", height: "80px"}} bgColor="blue">
                <CardContent className="display-flex justify-content-center">
                    <Icon size="24px" color="white">
                        <FaBookOpen />
                    </Icon>
                </CardContent>
                <span className="display-flex justify-content-center">
                    <Chip bgColor="deeppurple" textColor="white" outline>Units</Chip>
                </span>
            </Card>
        </Link>
    </Block>
    
    <BlockTitle>User Management</BlockTitle>
    <Block strong>
        <Link href="/users/">
            <Card style={{width: "80px", height: "80px"}} bgColor="teal">
                <CardContent className="display-flex justify-content-center">
                    <Icon size="24px" color="white">
                        <FaUsers />
                    </Icon>
                </CardContent>
                <span className="display-flex justify-content-center">
                    <Chip bgColor="deeppurple" textColor="white" outline>Users</Chip>
                </span>
            </Card>
        </Link>
        <Link href="/roles/">
            <Card style={{width: "80px", height: "80px"}} bgColor="gray">
                <CardContent className="display-flex justify-content-center">
                    <Icon size="24px" color="white">
                        <FaClipboardCheck />
                    </Icon>
                </CardContent>
                <span className="display-flex justify-content-center">
                    <Chip bgColor="deeppurple" textColor="white" outline>Roles</Chip>
                </span>
            </Card>
        </Link>
        <Link href="#">
            <Card style={{width: "80px", height: "80px"}} bgColor="yellow">
                <CardContent className="display-flex justify-content-center">
                    <Icon size="24px" color="white">
                        <FaPenFancy />
                    </Icon>
                </CardContent>
                <span className="display-flex justify-content-center">
                    <Chip bgColor="deeppurple" textColor="white" outline>Others</Chip>
                </span>
            </Card>
        </Link>
    </Block>
        
    <BlockTitle>Student Management</BlockTitle>
    <Block strong>
        <Link href="#">
            <Card style={{width: "80px", height: "80px"}} bgColor="teal">
                <CardContent className="display-flex justify-content-center">
                    <Icon size="24px" color="white">
                        <FaGraduationCap />
                    </Icon>
                </CardContent>
                <span className="display-flex justify-content-center">
                    <Chip bgColor="deeppurple" textColor="white" outline>All Students</Chip>
                </span>
            </Card>
        </Link>
        <Link href="#">
            <Card style={{width: "80px", height: "80px"}} bgColor="teal">
                <CardContent className="display-flex justify-content-center">
                    <Icon size="24px" color="white">
                        <FaGraduationCap />
                    </Icon>
                </CardContent>
                <span className="display-flex justify-content-center">
                    <Chip bgColor="deeppurple" textColor="white" outline>Something</Chip>
                </span>
            </Card>
        </Link>
        <Link href="#">
            <Card style={{width: "80px", height: "80px"}} bgColor="teal">
                <CardContent className="display-flex justify-content-center">
                    <Icon size="24px" color="white">
                        <FaGraduationCap />
                    </Icon>
                </CardContent>
                <span className="display-flex justify-content-center">
                    <Chip bgColor="deeppurple" textColor="white" outline>Something</Chip>
                </span>
            </Card>
        </Link>
    </Block>
    

    <Popup className="poppy" swipeToClose>
        <Page>
          <Navbar title="Swipe To Close">
            <NavRight>
              <Link popupClose tooltip="Close">
                <Icon>
                    <FaTimesCircle />
                </Icon>
              </Link>
            </NavRight>
          </Navbar>

          <div
            style={{ height: '100%' }}
            className="display-flex justify-content-center align-items-center"
          >
            <Block>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?
            Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.
            Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque, est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde delectus a maiores nihil dolores? Natus, perferendis.
            Atque quis totam repellendus omnis alias magnam corrupti, possimus aspernatur perspiciatis quae provident consequatur minima doloremque blanditiis nihil maxime ducimus earum autem. Magni animi blanditiis similique iusto, repellat sed quisquam!
            Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid impedit! Adipisci!
            Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.
            Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.
            </Block>
          </div>
        </Page>
      </Popup>

  </Page>
);
export default AdminHomePage;