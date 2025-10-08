import { useEffect } from 'react';
import { useStore } from 'react-redux';
import type { Reducer } from '@reduxjs/toolkit';
import type { StateSchemaKey } from '@app/providers/StoreProvider/config/StateSchema';
import type { StoreWithManager } from '@app/providers/StoreProvider/config/store';

type ReducersList = Partial<Record<StateSchemaKey, Reducer>>;

interface UseDynamicReducersOptions {
    removeAfterUnmount?: boolean; // по умолчанию true
}

/**
 * Подключает набор редьюсеров на время жизни компонента.
 * Идеально для страниц/фич, загружаемых по маршруту (route-based code splitting).
 */
export function useDynamicReducers(
    reducers: ReducersList,
    options: UseDynamicReducersOptions = { removeAfterUnmount: true }
) {
    const store = useStore() as StoreWithManager;

    useEffect(() => {
        // add on mount (idempotent)
        Object.entries(reducers).forEach(([key, reducer]) => {
            if (!reducer) return;
            store.reducerManager.add(key as StateSchemaKey, reducer);
        });

        return () => {
            if (!options.removeAfterUnmount) return;
            Object.keys(reducers).forEach((key) => {
                store.reducerManager.remove(key as StateSchemaKey);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
