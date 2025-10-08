# FSD Remote (Rsbuild + Module Federation + React Router)

Микрофронтенд (remote-only) по методологии **FSD**, со **styled-components**, **Redux Toolkit**, и **react-router-dom**.
Экспортирует два entry для хоста:
- `fsdRemote/MicroApp` — автономное приложение (внутри `BrowserRouter`) — удобно для локальной разработки.
- `fsdRemote/MicroRoutes` — набор роутов (без собственного роутера) для монтирования в `Routes` хоста.

## Быстрый старт
```bash
npm i
npm run dev
```

## Подключение в host (пример)
```ts
// rsbuild.config.ts (host)
import moduleFederation from '@rsbuild/plugin-module-federation'
export default defineConfig({
  plugins: [
    moduleFederation({
      name: 'host',
      remotes: {
        fsdRemote: 'fsdRemote@http://localhost:5173/remoteEntry.js',
      }
    })
  ]
})
```

В коде host:
```tsx
// types
declare module 'fsdRemote/MicroApp';
declare module 'fsdRemote/MicroRoutes';
declare module 'fsdRemote/StoreProvider';

// 1) Полностью изолированное встраивание (ленивая загрузка)
const MicroApp = React.lazy(() => import('fsdRemote/MicroApp'));

// 2) Встраивание маршрутов внутрь роутера хоста
const MicroRoutes = React.lazy(() => import('fsdRemote/MicroRoutes'));
// ...
<Routes>
  <Route path="/mf/*" element={<MicroRoutes />} />
</Routes>
```

## Структура слоёв
`app/`, `widgets/`, `pages/`, `features/`, `entities/`, `shared/`

## CLI
`npm run fsd:feature|entity|page|widget -- <name>`