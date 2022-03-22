import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getDepartmentsAsync = createAsyncThunk(
    'departments/getDepartmentsAsync',
    async () => {
        try {
            const resp = await fetch('http://localhost:8000/api/departments');
            const departments = await resp.json();
            return { departments }; 
        } 
        catch (error) {
            const departments = 'error';
            return { departments }
        }
    }
);

export const addDepartmentAsync = createAsyncThunk(
    'departments/addDepartmentAsync',
    async (payload) => {
        const resp = await fetch('http://localhost:8000/api/departments',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: payload.name,
                description: payload.description,
                school_id: payload.school_id
            })
        });

        if (resp.ok) {
            const department = await resp.json();
            return { department };
        }
        else
        {
            throw new Error(resp)
        }
        
    }
);

export const editDepartmentAsync = createAsyncThunk(
    'departments/editDepartmentAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/departments/${payload.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            const department = await resp.json();
            return { department };
        }
    }
); 

export const deleteDepartmentAsync = createAsyncThunk(
    'departments/deleteDepartmentAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/departments/${payload.id}`,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const departmentSlice = createSlice({
    name: 'departments',
    initialState: null,
    reducers:   {
                    addDepartment: (state, action) => 
                                {
                                    
                                    const newDepartment = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        description: payload.description
                                    };
                                    
                                    return state.push(newDepartment);
                                },
                    editDepartment: (state, action) => 
                                {
                                    const index = state.findIndex(department => department.id === action.payload.department.id);
                                    state[index].name = action.payload.department.name;
                                    state[index].description = action.payload.department.description;

                                },
                    deleteDepartment: (state, action) => 
                                {
                                    return state.filter((department) => department.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getDepartmentsAsync.fulfilled]: (state, action) => {
                        return action.payload.departments;
                    },
                    [addDepartmentAsync.fulfilled]: (state, action) => {
                        state.push(action.payload.department);
                    },
                    [editDepartmentAsync.fulfilled]: (state, action) => {
                        const index = state.findIndex(department => department.id === action.payload.department.id);
                        state[index].name = action.payload.department.name;
                        state[index].description = action.payload.department.description;
                    },
                    [deleteDepartmentAsync.fulfilled]:  (state, action) => {
                        console.table(state)
                        return state.filter((department) => department.id != action.payload.id);
                    }
                }
    
});

export const { addDepartment, editDepartment, deleteDepartment } = departmentSlice.actions; 

export default departmentSlice.reducer;