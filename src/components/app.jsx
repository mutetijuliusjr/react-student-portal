import React from 'react';
import { FaClipboard, FaCogs, FaHome, FaTimes, FaUserCircle, FaBook, FaUserAlt, FaUserCog, FaExternalLinkSquareAlt } from 'react-icons/fa';

import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Block,
  BlockTitle,
  Icon,
  Link,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
  Tabs
} from 'framework7-react';

import store from '../redux/store';
import { Provider } from 'react-redux';

import routes from '../js/routes';

const MyApp = () => {

  // Framework7 Parameters
  const f7params = {
    name: 'Student Portal',
	theme: 'auto',
	version: '0.0.0.1',
    routes: routes,

	serviceWorker: process.env.NODE_ENV ==='production' ? {
	path: '/service-worker.js',
	} : {},
  };



  f7ready(() => {
	// Call F7 APIs here
	
  });


  return (
		<Provider store={store}>
			<App { ...f7params } themeDark>

				{/* Left panel with cover effect*/}
				<Panel left cover>
					<View>
						<Page>
							<Navbar title={f7params.name}/>
							<Block className="justify-content-center">
								<img alt="user image" src="icons/favicon.png" />
							</Block>
							<List>
  								<ListItem title="Profile" link="#" panelClose>
								  <Icon slot="media">
									  <FaUserAlt />
								  </Icon>
								</ListItem>
  								<ListItem title="Logout" link="#" panelClose>
								  <Icon slot="media">
									  <FaExternalLinkSquareAlt />
								  </Icon>
								</ListItem>
							</List>
						</Page>
					</View>
				</Panel>


				{/* Right panel with reveal effect*/}
				<Panel right reveal>
					<View>
					<Page>
						<Navbar title="Right Panel"/>
						<Block>Right panel content goes here</Block>
					</Page>
					</View>
				</Panel>


				{/* Views/Tabs container */}
				<Views tabs className="safe-areas" >
					{/* Tabbar for switching views-tabs */}
					<Toolbar tabbar labels bottom>
						
						<Link tabLink="#view-home" tabLinkActive tooltip="Home" className="padding">
							<Icon size='30px' tooltipTrigger>
								<FaHome />
							</Icon>
						</Link>
						<Link tabLink="#view-admin" tooltip="Admin" className="padding">
							<Icon size='25px'>
								<FaUserCircle />
							</Icon>
						</Link>
						<Link tabLink="#view-student" tooltip="Student" className="padding">
							<Icon size='25px'>
								<FaBook />
							</Icon>
						</Link>
						<Link tabLink="#view-teacher" tooltip="Teacher" className="padding">
							<Icon size='25px'>
								<FaClipboard />
							</Icon>
						</Link>
						<Link tabLink="#view-settings" tooltip="Settings" className="padding">
							<Icon size='25px'>
								<FaCogs />
							</Icon>
						</Link>
					
					</Toolbar>

					{/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
					<Tabs animated swipeable>
						<View id="view-home" masterDetailBreakpoint={768} main tab tabActive url="/" />
						<View id="view-admin" masterDetailBreakpoint={768} name="admin" tab url="/admin/" />
						<View id="view-student" masterDetailBreakpoint={768} name="student" tab url="/student/" />
						<View id="view-teacher" masterDetailBreakpoint={768} name="teacher" tab url="/teacher/" />
						<View id="view-settings" masterDetailBreakpoint={768} name="settings" tab url="/settings/" />
					</Tabs>
				</Views>

				{/* Popup */}
				<Popup id="my-popup">
					<View>
						<Page>
							<Navbar title="Books">
								<NavRight>
								<Link popupClose>
									<Icon>
										<FaTimes />
									</Icon>
								</Link>
								</NavRight>
							</Navbar>
							<Block>
								<p>Popup content goes here.</p>
							</Block>
						</Page>
					</View>
				</Popup>

			</App>
		</Provider>
  )
}
export default MyApp;