import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDynamicReducers } from '@shared/lib/dynamicReducers/useDynamicReducers';
import { chatReducer, chatActions } from '@features/chat/model/chatSlice';
import type { RootState, AppDispatch } from '@app/providers/StoreProvider/config/store';

export default function ChatPage() {
    // Подключаем редьюсер при монтировании (вариант А)
    useDynamicReducers({ chat: chatReducer });

    const dispatch = useDispatch<AppDispatch>();
    const [message, setMessage] = useState('');

    // Достаём массив сообщений из стора
    const messages = useSelector((state: RootState) => state.chat?.messages ?? []);

    const handleSend = () => {
        if (!message.trim()) return;
        dispatch(chatActions.pushMessage(message.trim())); // <— вот тут мы добавляем сообщение
        setMessage('');
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">💬 Chat</h1>

            <div className="border rounded p-2 h-48 overflow-auto mb-2 bg-gray-50">
                {messages.length === 0 ? (
                    <p className="text-gray-500">Пока нет сообщений…</p>
                ) : (
                    messages.map((m, i) => (
                        <div key={i} className="mb-1">
                            {m}
                        </div>
                    ))
                )}
            </div>

            <div className="flex gap-2">
                <input
                    className="border rounded px-2 flex-1"
                    placeholder="Введите сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white rounded px-4"
                    onClick={handleSend}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
}
