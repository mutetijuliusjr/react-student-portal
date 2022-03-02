
import HomePage from '../pages/home.jsx';
import AboutPage from '../pages/about.jsx';
import FormPage from '../pages/form.jsx';
//import CatalogPage from '../pages/catalog.jsx';
import ProductPage from '../pages/product.jsx';
import SettingsPage from '../pages/settings.jsx';

import AdminHomePage from '../pages/admin/home.jsx';
import SchoolsPage from '../pages/admin/schools.jsx';
import SchoolPage from '../pages/admin/school.jsx';
import NewSchoolPage from '../pages/admin/new-school.jsx';
import DepartmentPage from '../pages/admin/department.jsx';
import DepartmentsPage from '../pages/admin/departments.jsx';
import CoursePage from '../pages/admin/course.jsx';
import CoursesPage from '../pages/admin/courses.jsx';
import SemesterPage from '../pages/admin/semester.jsx';
import SemestersPage from '../pages/admin/semesters.jsx';
import UnitPage from '../pages/admin/unit.jsx';
import UnitsPage from '../pages/admin/units.jsx';

import UsersPage from '../pages/admin/users.jsx';
import UserPage from '../pages/admin/user.jsx';
import RolesPage from '../pages/admin/roles.jsx';

import TestPage from '../pages/test.jsx';

import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/test/',
    component: TestPage,
  },
  /*
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  */
  {
    path: '/admin/',
    component: AdminHomePage,
  },
  {
    path: '/school/:id',
    component: SchoolPage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/new-school/',
    component: NewSchoolPage,
  },
  {
    path: '/schools/',
    component: SchoolsPage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '/departments/',
    component: DepartmentsPage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '/department/',
    component: DepartmentPage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/course/',
    component: CoursePage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/courses/',
    component: CoursesPage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '/semester/',
    component: SemesterPage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/semesters/',
    component: SemestersPage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '/unit/',
    component: UnitPage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/units/',
    component: UnitsPage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '/user/',
    component: UserPage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/users/',
    component: UsersPage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '/roles/',
    component: RolesPage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
