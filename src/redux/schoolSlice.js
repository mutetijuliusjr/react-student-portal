import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API ='http://localhost:8000/api/schools/';

export const getSchoolsAsync = createAsyncThunk(
    'schools/getSchoolsAsync',
    async () => {
        const resp = await fetch(API);
        return await resp.json();
    } 
);

export const addSchoolAsync = createAsyncThunk(
    'schools/addSchoolAsync',
    async (payload) => {
        const resp = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: payload.name,
                description: payload.description
            })
        });

        if (resp.ok) {
            const data = await resp.json();
            const school = await fetch(API + data.id)
            if(school.ok){
                return await school.json();
            } 
        }
        
    }
);

export const editSchoolAsync = createAsyncThunk(
    'schools/editSchoolAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            return await resp.json();
        }
    }
); 

export const deleteSchoolAsync = createAsyncThunk(
    'schools/deleteSchoolAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const schoolSlice = createSlice({
    name: 'schools',
    initialState: {
        data: [],
        loading: false,
        error: false,
        updated: false
    },
    reducers:   {
                    addSchool: (state, action) => 
                                {
                                    const newSchool = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        description: payload.description
                                    };
                                    
                                    return state.data.push(newSchool);
                                },
                    editSchool: (state, action) => 
                                {
                                    const index = state.findIndex(school => school.id === action.payload.school.id);
                                    state.data[index].name = action.payload.school.name;
                                    state.data[index].description = action.payload.school.description;

                                },
                    deleteSchool: (state, action) => 
                                {
                                    return state.filter((school) => school.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getSchoolsAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                    },
                    [getSchoolsAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                    },
                    [getSchoolsAsync.fulfilled]: (state, action) => {
                        state.data = action.payload;
                        state.loading = false;
                    },
                    [addSchoolAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [addSchoolAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [addSchoolAsync.fulfilled]: (state, action) => {
                        state.data.push(action.payload);
                        state.loading = false;
                        state.updated = true;
                    },
                    [editSchoolAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [editSchoolAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [editSchoolAsync.fulfilled]: (state, action) => {
                        const index = state.data.findIndex(school => school.id === action.payload.id);
                        state.data[index].name = action.payload.name;
                        state.data[index].description = action.payload.description;
                        state.loading = false;
                        state.updated = true;
                    },
                    [deleteSchoolAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [deleteSchoolAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [deleteSchoolAsync.fulfilled]:  (state, action) => {
                        state.data = state.data.filter((school) => school.id != action.payload.id);
                        state.loading = false;
                        state.updated = true;
                    }
                }
    
});

export const { addSchool, editSchool, deleteSchool } = schoolSlice.actions; 

export default schoolSlice.reducer;