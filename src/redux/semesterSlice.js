import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API ='http://localhost:8000/api/semesters/';

export const getSemestersAsync = createAsyncThunk(
    'semesters/getSemestersAsync',
    async () => {
        const resp = await fetch(API);
        return await resp.json();
    } 
);

export const addSemesterAsync = createAsyncThunk(
    'semesters/addSemesterAsync',
    async (payload) => {
        const resp = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: payload.name,
                code: payload.code,
                year: payload.year,
                course_id: payload.course_id
            })
        });

        if (resp.ok) {
            const data = await resp.json();
            const semester = await fetch(API + data.id)
            if(semester.ok){
                return await semester.json();
            } 
        }
        
    }
);

export const editSemesterAsync = createAsyncThunk(
    'semesters/editSemesterAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            const data = await resp.json();
            const semester = await fetch(API + data.id)
            if(semester.ok){
                return await semester.json();
            } 
        }
    }
); 

export const deleteSemesterAsync = createAsyncThunk(
    'semesters/deleteSemesterAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const semesterSlice = createSlice({
    name: 'semesters',
    initialState: {
        data: [],
        loading: false,
        error: false,
        updated: false,
        deleted: false,
    },
    reducers:   {
                    addSemester: (state, action) => 
                                {
                                    const newSemester = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        code: payload.code,
                                        year: payload.year,
                                        course_id: payload.course_id
                                    };
                                    
                                    return state.data.push(newSemester);
                                },
                    editSemester: (state, action) => 
                                {
                                    const index = state.findIndex(semester => semester.id === action.payload.semester.id);
                                    state.data[index].name = action.payload.semester.name;
                                    state.data[index].description = action.payload.semester.description;
                                    state.data[index].school_id = action.payload.semester.school_id;

                                },
                    deleteSemester: (state, action) => 
                                {
                                    return state.filter((semester) => semester.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getSemestersAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                    },
                    [getSemestersAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [getSemestersAsync.fulfilled]: (state, action) => {
                        state.data = action.payload;
                        state.loading = false;
                    },
                    [addSemesterAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [addSemesterAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [addSemesterAsync.fulfilled]: (state, action) => {
                        state.data.push(action.payload);
                        state.loading = false;
                        state.updated = true;
                    },
                    [editSemesterAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [editSemesterAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [editSemesterAsync.fulfilled]: (state, action) => {
                        const index = state.data.findIndex(semester => semester.id === action.payload.id);
                        state.data[index] = action.payload
                        state.loading = false;
                        state.updated = true;
                    },
                    [deleteSemesterAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.deleted = false;
                    },
                    [deleteSemesterAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [deleteSemesterAsync.fulfilled]:  (state, action) => {
                        state.data = state.data.filter((semester) => semester.id != action.payload.id);
                        state.loading = false;
                        state.deleted = true;
                    }
                }
    
});

export const { addSemester, editSemester, deleteSemester } = semesterSlice.actions; 

export default semesterSlice.reducer;