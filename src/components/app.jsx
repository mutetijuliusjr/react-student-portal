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
	theme: 'aurora',
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
				<Views tabs className="safe-areas">
					{/* Tabbar for switching views-tabs */}
					<Toolbar tabbar labels bottom>
						
						<Link tabLink="#view-home" tabLinkActive>
							<Icon size='18px' tooltip="Home">
								<FaHome />
							</Icon>
							<span>Home</span>
						</Link>
						<Link tabLink="#view-admin" tooltip="Admin">
							<Icon size='18px'>
								<FaUserCircle />
							</Icon>
							<span>Admin</span>
						</Link>
						<Link tabLink="#view-student" tooltip="Student">
							<Icon size='18px'>
								<FaBook />
							</Icon>
							<span>Student</span>
						</Link>
						<Link tabLink="#view-teacher" tooltip="Teacher">
							<Icon size='18px'>
								<FaClipboard />
							</Icon>
							<span>Teacher</span>
						</Link>
						<Link tabLink="#view-settings" tooltip="Settings">
							<Icon size='18px'>
								<FaCogs />
							</Icon>
							<span>Settings</span>
						</Link>
					
					</Toolbar>

					{/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
					<Tabs animated>
						<View id="view-home" main tab tabActive url="/" />
						<View id="view-admin" name="settings" tab url="/admin/" />
						<View id="view-student" name="settings" tab url="/test/" />
						<View id="view-teacher" name="settings" tab url="/teacher/" />
						<View id="view-settings" name="settings" tab url="/settings/" />
					</Tabs>
				</Views>

				
				<View id="splashScreen">
					<Page>
						<Block>
							<p>Splash Screen!</p>
						</Block>
					</Page>
				</View>

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