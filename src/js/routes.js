
import HomePage from '../pages/home.jsx';
import AboutPage from '../pages/about.jsx';
import FormPage from '../pages/form.jsx';
import ProductPage from '../pages/product.jsx';
import SettingsPage from '../pages/settings.jsx';

import AdminHomePage from '../pages/admin/home.jsx';

import SchoolsPage from '../pages/admin/schools/all-schools.jsx';
import SchoolPage from '../pages/admin/schools/school.jsx';
import NewSchoolPage from '../pages/admin/schools/new-school.jsx';
import EditSchoolPage from '../pages/admin/schools/edit-school.jsx';

import DepartmentsPage from '../pages/admin/departments/all-departments.jsx';
import DepartmentPage from '../pages/admin/departments/department.jsx';
import NewDepartmentPage from '../pages/admin/departments/new-department.jsx';
import EditDepartmentPage from '../pages/admin/departments/edit-department.jsx';

import CoursesPage from '../pages/admin/courses/all-courses.jsx';
import CoursePage from '../pages/admin/courses/course.jsx';
import NewCoursePage from '../pages/admin/courses/new-course.jsx';
import EditCoursePage from '../pages/admin/courses/edit-course.jsx';

import SemestersPage from '../pages/admin/semesters/all-semesters.jsx';
import SemesterPage from '../pages/admin/semesters/semester.jsx';
import NewSemesterPage from '../pages/admin/semesters/new-semester.jsx';
import EditSemesterPage from '../pages/admin/semesters/edit-semester.jsx';

import UnitsPage from '../pages/admin/units/all-units.jsx';
import UnitPage from '../pages/admin/units/unit.jsx';
import NewUnitPage from '../pages/admin/units/new-unit.jsx';
import EditUnitPage from '../pages/admin/units/edit-unit.jsx';

import UsersPage from '../pages/admin/users/all-users.jsx';
import UserPage from '../pages/admin/users/user.jsx';
import NewUserPage from '../pages/admin/users/new-user.jsx';
import EditUserPage from '../pages/admin/users/edit-user.jsx';

import RolesPage from '../pages/admin/roles/all-roles.jsx';
import RolePage from '../pages/admin/roles/role.jsx';
import NewRolePage from '../pages/admin/roles/new-role.jsx';
import EditRolePage from '../pages/admin/roles/edit-role.jsx';

import MessagesPage from '../pages/admin/users/messages.jsx';
import NotificationsPage from '../pages/admin/users/notifications.jsx';
import ProfilePage from '../pages/admin/users/profile.jsx';
import StudentPage from '../pages/admin/users/student.jsx';
import TeacherPage from '../pages/admin/users/teacher.jsx';

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
  /*
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  */
  {
    path: '/admin/',
    component: AdminHomePage,
    options: {
      clearPreviousHistory: true,
    }
  },
  {
    path: '/roles/',
    component: RolesPage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '/new-role/',
    component: NewRolePage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/role/:id',
    component: RolePage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    path: '/edit-role/:id',
    component: EditRolePage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/schools/',
    component: SchoolsPage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '/new-school/',
    component: NewSchoolPage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/school/:id',
    component: SchoolPage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    path: '/edit-school/:id',
    component: EditSchoolPage,
    options: {
      transition: 'f7-cover-v',
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
    path: '/department/:id',
    component: DepartmentPage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    path: '/new-department/',
    component: NewDepartmentPage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/edit-department/:id',
    component: EditDepartmentPage,
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
    path: '/course/:id',
    component: CoursePage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    path: '/new-course/',
    component: NewCoursePage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/edit-course/:id',
    component: EditCoursePage,
    options: {
      transition: 'f7-push',
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
    path: '/semester/:id',
    component: SemesterPage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    path: '/edit-semester/:id',
    component: EditSemesterPage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/new-semester/',
    component: NewSemesterPage,
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
    path: '/new-unit/',
    component: NewUnitPage,
    options: {
      transition: 'f7-cover-v',
    },
  },
  {
    path: '/edit-unit/:id',
    component: EditUnitPage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '/unit/:id',
    component: UnitPage,
    options: {
      transition: 'f7-push',
    },
  },
  {
    path: '/users/:id',
    component: UserPage,
  },
  {
    path: '/user/:id/profile/',
    component: ProfilePage,
  },
  {
    path: '/edit-user/:id',
    component: EditUserPage,
    options: {
      transition: 'f7-cover',
    },
  },
  {
    path: '/users/',
    component: UsersPage,
    master: true,
  },
  {
    path: '/new-user/',
    component: NewUserPage,
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
