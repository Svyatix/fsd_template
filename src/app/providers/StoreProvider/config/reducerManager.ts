import { combineReducers, type Reducer, type ReducersMapObject, type UnknownAction } from '@reduxjs/toolkit';
import type { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema, UnknownAction>
): ReducerManager {
    let reducers = { ...initialReducers };
    let combinedReducer = combineReducers(reducers);
    let keysToRemove: StateSchemaKey[] = [];

    return {
        getReducerMap: () => reducers,

        reduce: (state, action) => {
            if (keysToRemove.length && state) {
                state = { ...state };
                // @ts-ignore
                for (const key of keysToRemove) delete (state as any)[key];
                keysToRemove = [];
            }
            //@ts-ignore
            return combinedReducer(state, action);
        },

        add: (key, reducer) => {
            if (!key || reducers[key]) return;
            // @ts-ignore
            reducers = { ...reducers, [key]: reducer as Reducer<StateSchema, UnknownAction> };
            combinedReducer = combineReducers(reducers);
        },

        remove: (key) => {
            if (!key || !reducers[key]) return;
            const { [key]: _, ...rest } = reducers;
            reducers = rest as ReducersMapObject<StateSchema, UnknownAction>;
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
