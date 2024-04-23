import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['chart'], // Add here all reducers you want to persist
}

export default persistConfig