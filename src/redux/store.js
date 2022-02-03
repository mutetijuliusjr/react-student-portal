import { configureStore } from '@reduxjs/toolkit';
import schoolReducer from './schoolSlice';

export default configureStore({
	reducer: {
		schools: schoolReducer,
	},
});