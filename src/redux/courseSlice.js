import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCoursesAsync = createAsyncThunk(
    'courses/getCoursesAsync',
    async () => {
        const resp = await fetch('http://localhost:8000/api/courses');
        if (resp.ok) {
            const courses = await resp.json();
            return { courses };
        }
        
    }
);

export const addCourseAsync = createAsyncThunk(
    'courses/addCourseAsync',
    async (payload) => {
        const resp = await fetch('http://localhost:8000/api/courses',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: payload.name,
                description: payload.description,
                department_id: payload.school_id
            })
        });

        if (resp.ok) {
            const course = await resp.json();
            return { course };
        }
        else
        {
            throw new Error(resp)
        }
        
    }
);

export const editCourseAsync = createAsyncThunk(
    'courses/editCourseAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/courses/${payload.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            const course = await resp.json();
            return { course };
        }
    }
); 

export const deleteCourseAsync = createAsyncThunk(
    'courses/deleteCourseAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/courses/${payload.id}`,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const courseSlice = createSlice({
    name: 'courses',
    initialState: null,
    reducers:   {
                    addCourse: (state, action) => 
                                {
                                    
                                    const newCourse = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        description: payload.description
                                    };
                                    
                                    return state.push(newCourse);
                                },
                    editCourse: (state, action) => 
                                {
                                    const index = state.findIndex(course => course.id === action.payload.course.id);
                                    state[index].name = action.payload.course.name;
                                    state[index].description = action.payload.course.description;

                                },
                    deleteCourse: (state, action) => 
                                {
                                    return state.filter((course) => course.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getCoursesAsync.fulfilled]: (state, action) => {
                        return action.payload.courses;
                    },
                    [addCourseAsync.fulfilled]: (state, action) => {
                        state.push(action.payload.course);
                    },
                    [editCourseAsync.fulfilled]: (state, action) => {
                        const index = state.findIndex(course => course.id === action.payload.course.id);
                        state[index].name = action.payload.course.name;
                        state[index].description = action.payload.course.description;
                    },
                    [deleteCourseAsync.fulfilled]:  (state, action) => {
                        console.table(state)
                        return state.filter((course) => course.id != action.payload.id);
                    }
                }
    
});

export const { addCourse, editCourse, deleteCourse } = courseSlice.actions; 

export default courseSlice.reducer;