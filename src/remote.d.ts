declare module 'fsdRemote/MicroApp' {
  import * as React from 'react'
  export type MicroAppProps = { basename?: string }
  const MicroApp: React.ComponentType<MicroAppProps>
  export default MicroApp
}
declare module 'fsdRemote/MicroRoutes' {
  import * as React from 'react'
  const MicroRoutes: React.ComponentType
  export default MicroRoutes
}
declare module 'fsdRemote/StoreProvider' {
  import * as React from 'react'
  export const StoreProvider: React.ComponentType<{ children?: React.ReactNode }>
}