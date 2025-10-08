import React from 'react'
import { Provider } from 'react-redux'
import { setupStore } from './store'

type Props = { children?: React.ReactNode }
export const StoreProvider: React.FC<Props> = ({ children }) => {
  const store = React.useMemo(() => setupStore(), [])
  return <Provider store={store}>{children}</Provider>
}