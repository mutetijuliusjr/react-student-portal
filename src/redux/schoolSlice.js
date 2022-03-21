import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSchoolsAsync = createAsyncThunk(
    'schools/getSchoolsAsync',
    async () => {
        const resp = await fetch('http://localhost:8000/api/schools');
        if (resp.ok) {
            const schools = await resp.json();
            return { schools };
        }
        
        return "error";
    }
);

export const addSchoolAsync = createAsyncThunk(
    'schools/addSchoolAsync',
    async (payload) => {
        const resp = await fetch('http://localhost:8000/api/schools',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: payload.name,
                description: payload.description
            })
        });

        if (resp.ok) {
            const school = await resp.json();
            return { school };
        }
        
    }
);

export const editSchoolAsync = createAsyncThunk(
    'schools/editSchoolAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/schools/${payload.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            const school = await resp.json();
            return { school };
        }
    }
); 

export const deleteSchoolAsync = createAsyncThunk(
    'schools/deleteSchoolAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/schools/${payload.id}`,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const schoolSlice = createSlice({
    name: 'schools',
    initialState: null,
    reducers:   {
                    addSchool: (state, action) => 
                                {
                                    
                                    const newSchool = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        description: payload.description
                                    };
                                    
                                    return state.push(newSchool);
                                },
                    editSchool: (state, action) => 
                                {
                                    const index = state.findIndex(school => school.id === action.payload.school.id);
                                    state[index].name = action.payload.school.name;
                                    state[index].description = action.payload.school.description;

                                },
                    deleteSchool: (state, action) => 
                                {
                                    return state.filter((school) => school.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getSchoolsAsync.fulfilled]: (state, action) => {
                        return action.payload.schools;
                    },
                    [addSchoolAsync.fulfilled]: (state, action) => {
                        state.push(action.payload.school);
                    },
                    [editSchoolAsync.fulfilled]: (state, action) => {
                        const index = state.findIndex(school => school.id === action.payload.school.id);
                        state[index].name = action.payload.school.name;
                        state[index].description = action.payload.school.description;
                    },
                    [deleteSchoolAsync.fulfilled]:  (state, action) => {
                        console.table(state)
                        return state.filter((school) => school.id != action.payload.id);
                    }
                }
    
});

export const { addSchool, editSchool, deleteSchool } = schoolSlice.actions; 

export default schoolSlice.reducer;