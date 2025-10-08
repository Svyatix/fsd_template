import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ChatState } from '@app/providers/StoreProvider/config/StateSchema';

const initialState: ChatState = {
    messages: [],
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // Добавляем сообщение в конец списка
        pushMessage: (state, action: PayloadAction<string>) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        },
    },
});

export const { actions: chatActions, reducer: chatReducer } = chatSlice;
