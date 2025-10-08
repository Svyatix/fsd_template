import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const ChatPage = lazy(() => import('@pages/ChatPage/ui/ChatPage'));

export function AppRouter() {
    return (
        <Suspense fallback={<div>Loading…</div>}>
            <Routes>
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </Suspense>
    );
}
