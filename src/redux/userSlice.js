import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API ='http://localhost:8000/api/users/';

export const getUsersAsync = createAsyncThunk(
    'users/getUsersAsync',
    async () => {
        const resp = await fetch(API);
        return await resp.json();
    } 
);

export const addUserAsync = createAsyncThunk(
    'users/addUserAsync',
    async (payload) => {
        const resp = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: payload.email,
                password: payload.password
            })
        });

        if (resp.ok) {
            const data = await resp.json();
            const user = await fetch(API + data.id)
            if(user.ok){
                return await user.json();
            } 
        }
        
    }
);

export const editUserAsync = createAsyncThunk(
    'users/editUserAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            const data = await resp.json();
            const user = await fetch(API + data.id)
            if(user.ok){
                return await user.json();
            } 
        }
    }
); 

export const deleteUserAsync = createAsyncThunk(
    'users/deleteUserAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loading: false,
        error: false,
        updated: false,
        deleted: false,
    },
    reducers:   {
                    addUser: (state, action) => 
                                {
                                    const newUser = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        description: payload.description,
                                        school_id: payload.school_id
                                    };
                                    
                                    return state.data.push(newUser);
                                },
                    editUser: (state, action) => 
                                {
                                    const index = state.findIndex(user => user.id === action.payload.user.id);
                                    state.data[index].email = action.payload.user.email;
                                    state.data[index].password = action.payload.user.password;

                                },
                    deleteUser: (state, action) => 
                                {
                                    return state.filter((user) => user.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getUsersAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                    },
                    [getUsersAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [getUsersAsync.fulfilled]: (state, action) => {
                        state.data = action.payload;
                        state.loading = false;
                    },
                    [addUserAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [addUserAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [addUserAsync.fulfilled]: (state, action) => {
                        state.data.push(action.payload);
                        state.loading = false;
                        state.updated = true;
                    },
                    [editUserAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [editUserAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [editUserAsync.fulfilled]: (state, action) => {
                        const index = state.data.findIndex(user => user.id === action.payload.id);
                        state.data[index] = action.payload
                        state.loading = false;
                        state.updated = true;
                    },
                    [deleteUserAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.deleted = false;
                    },
                    [deleteUserAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [deleteUserAsync.fulfilled]:  (state, action) => {
                        state.data = state.data.filter((user) => user.id != action.payload.id);
                        state.loading = false;
                        state.deleted = true;
                    }
                }
    
});

export const { addUser, editUser, deleteUser } = userSlice.actions; 

export default userSlice.reducer;