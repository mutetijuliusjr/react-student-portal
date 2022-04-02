import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API ='http://localhost:8000/api/departments/';

export const getDepartmentsAsync = createAsyncThunk(
    'departments/getDepartmentsAsync',
    async () => {
        const resp = await fetch(API);
        return await resp.json();
    } 
);

export const addDepartmentAsync = createAsyncThunk(
    'departments/addDepartmentAsync',
    async (payload) => {
        const resp = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: payload.name,
                description: payload.description,
                school_id: payload.school_id
            })
        });

        if (resp.ok) {
            const data = await resp.json();
            const department = await fetch(API + data.id)
            if(department.ok){
                return await department.json();
            } 
        }
        
    }
);

export const editDepartmentAsync = createAsyncThunk(
    'departments/editDepartmentAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            const data = await resp.json();
            const department = await fetch(API + data.id)
            if(department.ok){
                return await department.json();
            } 
        }
    }
); 

export const deleteDepartmentAsync = createAsyncThunk(
    'departments/deleteDepartmentAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const departmentSlice = createSlice({
    name: 'departments',
    initialState: {
        data: [],
        loading: false,
        error: false,
        updated: false,
        deleted: false,
    },
    reducers:   {
                    addDepartment: (state, action) => 
                                {
                                    const newDepartment = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        description: payload.description,
                                        school_id: payload.school_id
                                    };
                                    
                                    return state.data.push(newDepartment);
                                },
                    editDepartment: (state, action) => 
                                {
                                    const index = state.findIndex(department => department.id === action.payload.department.id);
                                    state.data[index].name = action.payload.department.name;
                                    state.data[index].description = action.payload.department.description;
                                    state.data[index].school_id = action.payload.department.school_id;

                                },
                    deleteDepartment: (state, action) => 
                                {
                                    return state.filter((department) => department.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getDepartmentsAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                    },
                    [getDepartmentsAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [getDepartmentsAsync.fulfilled]: (state, action) => {
                        state.data = action.payload;
                        state.loading = false;
                    },
                    [addDepartmentAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [addDepartmentAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [addDepartmentAsync.fulfilled]: (state, action) => {
                        state.data.push(action.payload);
                        state.loading = false;
                        state.updated = true;
                    },
                    [editDepartmentAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [editDepartmentAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [editDepartmentAsync.fulfilled]: (state, action) => {
                        const index = state.data.findIndex(department => department.id === action.payload.id);
                        state.data[index] = action.payload
                        state.loading = false;
                        state.updated = true;
                    },
                    [deleteDepartmentAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.deleted = false;
                    },
                    [deleteDepartmentAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [deleteDepartmentAsync.fulfilled]:  (state, action) => {
                        state.data = state.data.filter((department) => department.id != action.payload.id);
                        state.loading = false;
                        state.deleted = true;
                    }
                }
    
});

export const { addDepartment, editDepartment, deleteDepartment } = departmentSlice.actions; 

export default departmentSlice.reducer;