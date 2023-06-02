import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import axios from "axios";

// Define a type for the slice state
interface CmsObjectState {
    isSelectorOpen: boolean;
    prevSelectedObject: StaticCmsObject | null;
    activeObjectPickerUuid: string | null;
    isEditorOpen: boolean;
    editNode: CmsNode | null;
    editNodeOrigial: CmsNode | null;
    editNodeObject: CmsObject | null;
}
// Define a type for the slice state
export interface UpdateNodePayload {
    target: string;
    value: any;
}

// Define the initial state using that type
const initialState: CmsObjectState = {
    isSelectorOpen: false,
    prevSelectedObject: null,
    activeObjectPickerUuid: null,
    isEditorOpen: false,
    editNode: null,
    editNodeObject: null,
    editNodeOrigial: null,
};

export const openEditor = createAsyncThunk(
    'object/fetchObjectDetail',
    async (node: CmsNode, thunkAPI) => {
      const response = await axios.get(`/cms/admin/api/nodes/${node.id}/object`);
      return response.data;
    }
)

export const cmsObjectSlice = createSlice({
    name: "cmsObject",
    initialState,
    reducers: {
        //Selector
        openSelector: (
            state,
            action: PayloadAction<{
                objectPickerId: string;
            }>
        ) => {
            state.isSelectorOpen = true;
            state.prevSelectedObject = null;
            state.activeObjectPickerUuid = action.payload.objectPickerId;
        },
        selectObject: (state, action: PayloadAction<StaticCmsObject>) => {
            state.isSelectorOpen = false;
            state.prevSelectedObject = action.payload;
        },
        abortSelection: (state, action: PayloadAction) => {
            state.isSelectorOpen = false;
            state.activeObjectPickerUuid = null;
        },
        //Editor
        openEditor: (state, action: PayloadAction<{ node: CmsNode }>) => {
            state.isEditorOpen = true;
            state.isSelectorOpen = false;
            state.prevSelectedObject = null;
            state.editNode = action.payload.node;
        },
        updateObject: (state, action: PayloadAction<UpdateNodePayload>) => {
            if(!state.editNode?.settings) {
                console.error("No node in edit mode.");
                return;
            }
            state.editNode.settings[action.payload.target] = action.payload.value;
        },
        saveObject: (state, action: PayloadAction) => {
            state.isEditorOpen = false;
            state.editNode = null;
            state.editNodeOrigial = null;
        },
        abortEdit: (state, action: PayloadAction) => {
            state.isEditorOpen = false;
            state.editNode = null;
            state.editNodeOrigial = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(openEditor.fulfilled, (state, action) => {
            state.isEditorOpen = true;
            state.isSelectorOpen = false;
            state.prevSelectedObject = null;
            state.editNode = action.meta.arg;
            state.editNodeObject = action.payload;
            state.editNodeOrigial = action.payload;
        });
    }
});

export const {
    openSelector,
    selectObject,
    abortSelection,
    updateObject,
    saveObject,
    abortEdit,
} = cmsObjectSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsSelectorOpen = (state: RootState) =>
    state.cmsObject.isSelectorOpen;

export const selectEditNodeObject = (state: RootState) =>
    state.cmsObject.editNodeObject;

export const selectEditNode = (state: RootState) =>
    state.cmsObject.editNode;

export const selectEditNodeOriginal = (state: RootState) =>
    state.cmsObject.editNodeOrigial;

export default cmsObjectSlice.reducer;
