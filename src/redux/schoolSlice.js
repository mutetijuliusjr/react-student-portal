import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSchoolsAsync = createAsyncThunk(
    'schools/getSchools',
    async () => {
        const resp = await fetch('http://localhost:8000/api/schools');
        if (resp.ok) {
            const schools = await resp.json();
            return { schools };
        }
        
    }
);

export const getSchoolAsync = createAsyncThunk(
    'schools/getSchool',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/schools/${payload.id}`);
        if (resp.ok) {
            const school = await resp.json();
            return { school };
        }
        
    }
);

export const addSchoolAsync = createAsyncThunk(
    'schools/addSchool',
    async (payload) => {
        const resp = await fetch('http://localhost:8000/api/schools',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: payload.name})
        });

        if (resp.ok) {
            const school = await resp.json();
            return { school };
        }
        
    }
);

export const editSchoolAsync = createAsyncThunk(
    'schools/editSchool',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/schools/${payload.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        });

        if (resp.ok) {
            const school = await resp.json();
            return { school };
        }
    }
); 

export const deleteSchoolAsync = createAsyncThunk(
    'schools/deleteSchool',
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
    initialState: [],
    reducers:   {
                    addSchool: (state, action) => 
                                {
                                    
                                    const newSchool = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        description: payload.description
                                    };

                                    console.table(newSchool);
                                    
                                    return state.push(newSchool);
                                },
                    editSchool: (state, action) => 
                                {
                                    const index = state.findIndex((school) => {school.id === action.payload.id});
                                    state[index].name = action.payload.name;
                                    state[index].description = action.payload.description;

                                },
                    deleteSchool: (state, action) => 
                                {
                                    return state.filter((school) => school.id !== action.payload.id);
                                }
                },
    extraReducers: {
                    [getSchoolsAsync.fulfilled]: (state, action) => {
                        return action.payload.schools;
                    },
                    [getSchoolAsync.fulfilled]: (state, action) => {
                        return action.payload.school;
                    },
                    [addSchoolAsync.fulfilled]: (state, action) => {
                        state.push(action.payload.school);
                    },
                    [editSchoolAsync.fulfilled]: (state, action) => {
                        const index = state.findIndex((school) => {school.id === action.payload.id});
                        state[index].name = action.payload.name;
                        state[index].description = action.payload.description;
                    },
                    [deleteSchoolAsync]:  (state, action) => {
                        return state.filter((school) => school.id !== action.payload.id);
                    }
                }
    
});

export const { addSchool, editSchool, deleteSchool } = schoolSlice.actions; 

export default schoolSlice.reducer;