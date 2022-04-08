import { configureStore } from '@reduxjs/toolkit';

import schoolReducer from './schoolSlice';
import departmentReducer from './departmentSlice';
import courseReducer from './courseSlice';
import unitReducer from './unitSlice';
import semesterReducer from './semesterSlice';
import userReducer from './userSlice';
import roleReducer from './roleSlice';

export default configureStore({
	reducer: {
		schools: schoolReducer,
		departments: departmentReducer,
		courses: courseReducer,
		units: unitReducer,
		semesters: semesterReducer,
		users: userReducer,
		roles: roleReducer,
	},
});