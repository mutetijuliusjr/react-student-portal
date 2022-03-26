import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSemestersAsync = createAsyncThunk(
    'semesters/getSemestersAsync',
    async () => {
        try {
            const resp = await fetch('http://localhost:8000/api/semesters');
            const semesters = await resp.json();
            return { semesters }; 
        } 
        catch (error) {
            const semesters = 'error';
            return { semesters }
        }
    }
);

export const getSemesterAsync = createAsyncThunk(
    'semesters/getSemesterAsync',
    async (payload) => {
        try {
            const resp = await fetch(`http://localhost:8000/api/semesters/${payload.id}`);
            const semester = await resp.json();
            return { semester }; 
        } 
        catch (error) {
            const semester = 'error';
            return { semester }
        }
    }
);

export const addSemesterAsync = createAsyncThunk(
    'semesters/addSemesterAsync',
    async (payload) => {
        const resp = await fetch('http://localhost:8000/api/semesters',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: payload.name,
                code: payload.code,
                course_id: payload.course_id,
            })
        });

        if (resp.ok) {
            const semester = await resp.json();
            return { semester };
        }
        else
        {
            throw new Error(resp)
        }
        
    }
);

export const editSemesterAsync = createAsyncThunk(
    'semesters/editSemesterAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/semesters/${payload.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            const semester = await resp.json();
            return { semester };
        }
    }
); 

export const deleteSemesterAsync = createAsyncThunk(
    'semesters/deleteSemesterAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/semesters/${payload.id}`,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const semesterSlice = createSlice({
    name: 'semesters',
    initialState: null,
    reducers:   {
                    addSemester: (state, action) => 
                                {
                                    
                                    const newSemester = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        description: payload.description
                                    };
                                    
                                    return state.push(newSemester);
                                },
                    editSemester: (state, action) => 
                                {
                                    const index = state.findIndex(semester => semester.id === action.payload.semester.id);
                                    state[index].name = action.payload.semester.name;
                                    state[index].description = action.payload.semester.description;

                                },
                    deleteSemester: (state, action) => 
                                {
                                    return state.filter((semester) => semester.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getSemestersAsync.fulfilled]: (state, action) => {
                        return action.payload.semesters;
                    },
                    [getSemesterAsync.fulfilled]: (state, action) => {
                        return action.payload.semesters.semester;
                    },
                    [addSemesterAsync.fulfilled]: (state, action) => {
                        state.push(action.payload.semester);
                    },
                    [editSemesterAsync.fulfilled]: (state, action) => {
                        const index = state.findIndex(semester => semester.id === action.payload.semester.id);
                        state[index].name = action.payload.semester.name;
                        state[index].description = action.payload.semester.description;
                    },
                    [deleteSemesterAsync.fulfilled]:  (state, action) => {
                        return state.filter((semester) => semester.id != action.payload.id);
                    }
                }
    
});

export const { addSemester, editSemester, deleteSemester } = semesterSlice.actions; 

export default semesterSlice.reducer;