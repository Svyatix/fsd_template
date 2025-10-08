// src/features/chat/model/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ChatState } from '@app/providers/StoreProvider/config/StateSchema';

const initialState: ChatState = { messages: [] };

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        push: (state, action: PayloadAction<string>) => {
            state.messages.push(action.payload);
        },
    },
});

export const { actions: chatActions, reducer: chatReducer } = chatSlice;
