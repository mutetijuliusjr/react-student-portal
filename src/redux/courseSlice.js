import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API ='http://localhost:8000/api/courses/';

export const getCoursesAsync = createAsyncThunk(
    'courses/getCoursesAsync',
    async () => {
        const resp = await fetch(API);
        return await resp.json();
    } 
);

export const addCourseAsync = createAsyncThunk(
    'courses/addCourseAsync',
    async (payload) => {
        const resp = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: payload.name,
                description: payload.description,
                department_id: payload.department_id
            })
        });

        if (resp.ok) {
            const data = await resp.json();
            const course = await fetch(API + data.id)
            if(course.ok){
                return await course.json();
            } 
        }
        
    }
);

export const editCourseAsync = createAsyncThunk(
    'courses/editCourseAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            const data = await resp.json();
            let course = await fetch(API + data.id)
            if(course.ok){
                course = await course.json();
                return {course};
            } 
        }
    }
); 

export const deleteCourseAsync = createAsyncThunk(
    'courses/deleteCourseAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const courseSlice = createSlice({
    name: 'courses',
    initialState: {
        data: [],
        loading: false,
        error: false,
        updated: false,
        deleted: false,
    },
    reducers:   {
                    addCourse: (state, action) => 
                                {
                                    const newCourse = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        description: payload.description,
                                        school_id: payload.school_id
                                    };
                                    
                                    return state.data.push(newCourse);
                                },
                    editCourse: (state, action) => 
                                {
                                    const index = state.findIndex(course => course.id === action.payload.course.id);
                                    state.data[index].name = action.payload.course.name;
                                    state.data[index].description = action.payload.course.description;
                                    state.data[index].school_id = action.payload.course.school_id;

                                },
                    deleteCourse: (state, action) => 
                                {
                                    return state.filter((course) => course.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getCoursesAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                    },
                    [getCoursesAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [getCoursesAsync.fulfilled]: (state, action) => {
                        state.data = action.payload;
                        state.loading = false;
                    },
                    [addCourseAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [addCourseAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [addCourseAsync.fulfilled]: (state, action) => {
                        state.data.push(action.payload);
                        state.loading = false;
                        state.updated = true;
                    },
                    [editCourseAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [editCourseAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [editCourseAsync.fulfilled]: (state, action) => {
                        const index = state.data.findIndex(course => course.id === action.payload.course.id);
                        state.data[index] = action.payload.course
                        state.loading = false;
                        state.updated = true;
                    },
                    [deleteCourseAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.deleted = false;
                    },
                    [deleteCourseAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [deleteCourseAsync.fulfilled]:  (state, action) => {
                        state.data = state.data.filter((course) => course.id != action.payload.id);
                        state.loading = false;
                        state.deleted = true;
                    }
                }
    
});

export const { addCourse, editCourse, deleteCourse } = courseSlice.actions; 

export default courseSlice.reducer;