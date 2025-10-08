import type { RootState } from '@app/providers/store'
export const selectCount = (state: RootState) => state.counter.value