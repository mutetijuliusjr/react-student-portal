import { configureStore } from '@reduxjs/toolkit';
import schoolReducer from './schoolSlice';
import departmentReducer from './departmentSlice';

export default configureStore({
	reducer: {
		schools: schoolReducer,
		departments: departmentReducer,
	},
});