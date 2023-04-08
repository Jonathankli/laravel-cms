import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
interface CmsObjectState {
    isSelectorOpen: boolean;
    prevSelectedObject: CmsObject | null;
    activeObjectPickerUuid: string | null;
    isEditorOpen: boolean;
    editNode: CmsNode | null;
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
};

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
        selectObject: (state, action: PayloadAction<CmsObject>) => {
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
        updateObject: (state, action: PayloadAction<UpdateNodePayload>) => {},
        saveObject: (state, action: PayloadAction) => {},
        abortEdit: (state, action: PayloadAction) => {
            state.isEditorOpen = false;
            state.editNode = null;
        },
    },
});

export const {
    openSelector,
    selectObject,
    abortSelection,
    openEditor,
    updateObject,
    saveObject,
    abortEdit,
} = cmsObjectSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsSelectorOpen = (state: RootState) =>
    state.cmsObject.isSelectorOpen;

export default cmsObjectSlice.reducer;
