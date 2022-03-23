import { configureStore } from '@reduxjs/toolkit';

import schoolReducer from './schoolSlice';
import departmentReducer from './departmentSlice';
import courseReducer from './courseSlice';
import unitReducer from './unitSlice';

export default configureStore({
	reducer: {
		schools: schoolReducer,
		departments: departmentReducer,
		courses: courseReducer,
		units: unitReducer,
	},
});