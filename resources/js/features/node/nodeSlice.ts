import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
export interface NodeState {
    activeNodeId?: string | null
}

// Define the initial state using that type
const initialState: NodeState = {
  activeNodeId: null,
}

export const counterSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    setActiveNode: (state, action: PayloadAction<string>) => {
      state.activeNodeId = action.payload
    },
  },
})

export const { setActiveNode } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAvtiveNodeId = (state: RootState) => state.node.activeNodeId

export default counterSlice.reducer