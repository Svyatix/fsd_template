import type { UnknownAction, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { apiSlice } from '@shared/api/apiSlice';

// ===== Примеры состояний фич =====
export interface UserState {
    name: string | null;
    isLoading: boolean;
}

export interface ChatState {
    messages: string[];
}

// ===== Глобальная схема состояния =====
export interface StateSchema {
    // user: UserState;

    // RTK Query хранит своё состояние под reducerPath:
    [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;

    // Динамические (лениво подключаемые) фичи — делаем опциональными:
    chat?: ChatState;
}

// Удобные алиасы
export type StateSchemaKey = keyof StateSchema;

// Менеджер редьюсеров (строго типизирован)
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema, UnknownAction>;
    reduce: (state: StateSchema | undefined, action: UnknownAction) => StateSchema;
    add: <K extends StateSchemaKey>(
        key: K,
        reducer: Reducer<NonNullable<StateSchema[K]>, UnknownAction>
    ) => void;
    remove: (key: StateSchemaKey) => void;
}
