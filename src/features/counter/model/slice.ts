import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CounterState = { value: number }
const initialState: CounterState = { value: 0 }

const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    inc: (s) => { s.value += 1 },
    dec: (s) => { s.value -= 1 },
    addBy: (s, a: PayloadAction<number>) => { s.value += a.payload }
  }
})

export const { inc, dec, addBy } = slice.actions
export default slice.reducer