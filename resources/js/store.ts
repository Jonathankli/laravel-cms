import { configureStore } from '@reduxjs/toolkit'
import nodeSlice from './features/node/nodeSlice'
import objectPickerSlice from './features/objectPicker/objectPickerSlice'

export const store = configureStore({
  reducer: {
    node: nodeSlice,
    objectPicker: objectPickerSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch