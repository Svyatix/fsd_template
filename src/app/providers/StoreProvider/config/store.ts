import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit';
import { createReducerManager } from './reducerManager';
import type { StateSchema } from './StateSchema';
import { apiSlice } from '@shared/api/apiSlice';
// import { userSlice } from '@features/user/model/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const staticReducers: ReducersMapObject<StateSchema> = {
    // user: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
};

const reducerManager = createReducerManager(staticReducers);

export const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

// Экспорт типов
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Пробрасываем менеджер для динамического подключения
// (например, внутри роутов или провайдера фичи)
export type StoreWithManager = typeof store & { reducerManager: typeof reducerManager };
(store as StoreWithManager).reducerManager = reducerManager;
