import { createSlice } from '@reduxjs/toolkit'

type aprState = {
  apr: any
}

const initialState: aprState = {
  apr: '',
}

const apr = createSlice({
  name: 'apr',
  initialState,
  reducers: {
    setApr: (state, action: any) => {
      state.apr = action.payload
    },
  },
})

export const { setApr } = apr.actions

export default apr.reducer
