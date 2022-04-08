import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API ='http://localhost:8000/api/roles/';

export const getRolesAsync = createAsyncThunk(
    'roles/getRolesAsync',
    async () => {
        const resp = await fetch(API);
        return await resp.json();
    } 
);

export const addRoleAsync = createAsyncThunk(
    'roles/addRoleAsync',
    async (payload) => {
        const resp = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: payload.name
            })
        });

        if (resp.ok) {
            const data = await resp.json();
            const role = await fetch(API + data.id)
            if(role.ok){
                return await role.json();
            } 
        }
        
    }
);

export const editRoleAsync = createAsyncThunk(
    'roles/editRoleAsync',
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

export const deleteRoleAsync = createAsyncThunk(
    'roles/deleteRoleAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const roleSlice = createSlice({
    name: 'roles',
    initialState: {
        data: [],
        loading: false,
        error: false,
        updated: false,
        deleted: false,
    },
    reducers:   {
                    addRole: (state, action) => 
                                {
                                    const newRole = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name
                                    };
                                    
                                    return state.data.push(newRole);
                                },
                    editRole: (state, action) => 
                                {
                                    const index = state.findIndex(role => role.id === action.payload.role.id);
                                    state.data[index].name = action.payload.role.name;

                                },
                    deleteRole: (state, action) => 
                                {
                                    return state.filter((role) => role.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getRolesAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                    },
                    [getRolesAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [getRolesAsync.fulfilled]: (state, action) => {
                        state.data = action.payload;
                        state.loading = false;
                    },
                    [addRoleAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [addRoleAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [addRoleAsync.fulfilled]: (state, action) => {
                        state.data.push(action.payload.role);
                        state.loading = false;
                        state.updated = true;
                    },
                    [editRoleAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [editRoleAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [editRoleAsync.fulfilled]: (state, action) => {
                        const index = state.data.findIndex(role => role.id === action.payload.id);
                        state.data[index].name = action.payload.name;
                        state.loading = false;
                        state.updated = true;
                        console.log()
                    },
                    [deleteRoleAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.deleted = false;
                    },
                    [deleteRoleAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [deleteRoleAsync.fulfilled]:  (state, action) => {
                        state.data = state.data.filter((role) => role.id != action.payload.id);
                        state.loading = false;
                        state.deleted = true;
                    }
                }
    
});

export const { addRole, editRole, deleteRole } = roleSlice.actions; 

export default roleSlice.reducer;