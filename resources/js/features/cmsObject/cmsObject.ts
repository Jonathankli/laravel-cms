import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
interface CmsObjectState {
    isSelectorOpen: boolean;
    prevSelectedObject: CmsObject | null;
    activeObjectPickerUuid: string | null;
}

// Define the initial state using that type
const initialState: CmsObjectState = {
  isSelectorOpen: false,
  prevSelectedObject: null,
  activeObjectPickerUuid: null,
}

export const cmsObjectSlice = createSlice({
  name: 'cmsObject',
  initialState,
  reducers: {
    openSelector: (state, action: PayloadAction<string>) => {
      state.isSelectorOpen = true;
      state.prevSelectedObject = null;
      state.activeObjectPickerUuid = action.payload;
    },
    selectObject: (state, action: PayloadAction<CmsObject>) => {
      state.isSelectorOpen = false;
      state.prevSelectedObject = action.payload;
    },
    abortSelection: (state, action: PayloadAction) => {
      state.isSelectorOpen = false;
      state.activeObjectPickerUuid = null;
    },
  },
})

export const { openSelector, selectObject, abortSelection } = cmsObjectSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsSelectorOpen = (state: RootState) => state.cmsObject.isSelectorOpen;

export default cmsObjectSlice.reducer