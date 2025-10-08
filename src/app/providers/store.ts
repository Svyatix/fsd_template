import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@features/counter/model/slice'

export const setupStore = () => configureStore({
  reducer: { counter: counterReducer }
})

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<ReturnType<typeof setupStore>['getState']>
export type AppDispatch = ReturnType<ReturnType<typeof setupStore>['dispatch']>