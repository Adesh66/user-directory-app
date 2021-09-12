import { configureStore } from '@reduxjs/toolkit'
import commonSlice  from './slice/commonSlice'

export default configureStore({
  reducer: {
    commonSlice
  },
})