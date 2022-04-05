import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API ='http://localhost:8000/api/units/';

export const getUnitsAsync = createAsyncThunk(
    'units/getUnitsAsync',
    async () => {
        const resp = await fetch(API);
        return await resp.json();
    } 
);

export const addUnitAsync = createAsyncThunk(
    'units/addUnitAsync',
    async (payload) => {
        const resp = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: payload.name,
                description: payload.description,
                instructor_id: payload.instructor_id
            })
        });

        if (resp.ok) {
            const data = await resp.json();
            const unit = await fetch(API + data.id)
            if(unit.ok){
                return await unit.json();
            } 
        }
        
    }
);

export const editUnitAsync = createAsyncThunk(
    'units/editUnitAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            const data = await resp.json();
            const unit = await fetch(API + data.id)
            if(unit.ok){
                return await unit.json();
            } 
        }
    }
); 

export const deleteUnitAsync = createAsyncThunk(
    'units/deleteUnitAsync',
    async (payload) => {
        const resp = await fetch(API + payload.id,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const unitSlice = createSlice({
    name: 'units',
    initialState: {
        data: [],
        loading: false,
        error: false,
        updated: false,
        deleted: false,
    },
    reducers:   {
                    addUnit: (state, action) => 
                                {
                                    const newUnit = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        description: payload.description,
                                        instructor_id: payload.instructor_id
                                    };
                                    
                                    return state.data.push(newUnit);
                                },
                    editUnit: (state, action) => 
                                {
                                    const index = state.findIndex(unit => unit.id === action.payload.unit.id);
                                    state.data[index].name = action.payload.unit.name;
                                    state.data[index].description = action.payload.unit.description;
                                    state.data[index].instructor_id = action.payload.unit.instructor_id;

                                },
                    deleteUnit: (state, action) => 
                                {
                                    return state.filter((unit) => unit.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getUnitsAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                    },
                    [getUnitsAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [getUnitsAsync.fulfilled]: (state, action) => {
                        state.data = action.payload;
                        state.loading = false;
                    },
                    [addUnitAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [addUnitAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [addUnitAsync.fulfilled]: (state, action) => {
                        state.data.push(action.payload);
                        state.loading = false;
                        state.updated = true;
                    },
                    [editUnitAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.updated = false;
                    },
                    [editUnitAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.updated = false;
                    },
                    [editUnitAsync.fulfilled]: (state, action) => {
                        const index = state.data.findIndex(unit => unit.id === action.payload.id);
                        state.data[index] = action.payload
                        state.loading = false;
                        state.updated = true;
                    },
                    [deleteUnitAsync.rejected]: (state) => {
                        state.loading = false;
                        state.error = true;
                        state.deleted = false;
                    },
                    [deleteUnitAsync.pending]: (state) => {
                        state.loading = true;
                        state.error = false;
                        state.deleted = false;
                    },
                    [deleteUnitAsync.fulfilled]:  (state, action) => {
                        state.data = state.data.filter((unit) => unit.id != action.payload.id);
                        state.loading = false;
                        state.deleted = true;
                    }
                }
    
});

export const { addUnit, editUnit, deleteUnit } = unitSlice.actions; 

export default unitSlice.reducer;