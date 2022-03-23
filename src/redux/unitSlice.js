import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUnitsAsync = createAsyncThunk(
    'units/getUnitsAsync',
    async () => {
        try {
            const resp = await fetch('http://localhost:8000/api/units');
            const units = await resp.json();
            return { units }; 
        } 
        catch (error) {
            const units = 'error';
            return { units }
        }
    }
);

export const addUnitAsync = createAsyncThunk(
    'units/addUnitAsync',
    async (payload) => {
        const resp = await fetch('http://localhost:8000/api/units',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: payload.name,
                description: payload.description,
                department_id: payload.school_id
            })
        });

        if (resp.ok) {
            const unit = await resp.json();
            return { unit };
        }
        else
        {
            throw new Error(resp)
        }
        
    }
);

export const editUnitAsync = createAsyncThunk(
    'units/editUnitAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/units/${payload.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (resp.ok) {
            const unit = await resp.json();
            return { unit };
        }
    }
); 

export const deleteUnitAsync = createAsyncThunk(
    'units/deleteUnitAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:8000/api/units/${payload.id}`,{
            method: 'DELETE'
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
); 

export const unitSlice = createSlice({
    name: 'units',
    initialState: null,
    reducers:   {
                    addUnit: (state, action) => 
                                {
                                    
                                    const newUnit = 
                                    {
                                        id: payload.id,
                                        name: action.payload.name,
                                        description: payload.description
                                    };
                                    
                                    return state.push(newUnit);
                                },
                    editUnit: (state, action) => 
                                {
                                    const index = state.findIndex(unit => unit.id === action.payload.unit.id);
                                    state[index].name = action.payload.unit.name;
                                    state[index].description = action.payload.unit.description;

                                },
                    deleteUnit: (state, action) => 
                                {
                                    return state.filter((unit) => unit.id != action.payload.id);
                                }
                },
    extraReducers: {
                    [getUnitsAsync.fulfilled]: (state, action) => {
                        return action.payload.units;
                    },
                    [addUnitAsync.fulfilled]: (state, action) => {
                        state.push(action.payload.unit);
                    },
                    [editUnitAsync.fulfilled]: (state, action) => {
                        const index = state.findIndex(unit => unit.id === action.payload.unit.id);
                        state[index].name = action.payload.unit.name;
                        state[index].description = action.payload.unit.description;
                    },
                    [deleteUnitAsync.fulfilled]:  (state, action) => {
                        return state.filter((unit) => unit.id != action.payload.id);
                    }
                }
    
});

export const { addUnit, editUnit, deleteUnit } = unitSlice.actions; 

export default unitSlice.reducer;