//creating redux store
import {configureStore} from '@reduxjs/toolkit';
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import userAuthorReducer from './slices/userAuthorSlice';
const persistconfig={
    key:'user-state',
    storage
}
const persisteduserAuthorReducer=persistReducer(persistconfig,userAuthorReducer)
export const store=configureStore({
    reducer:{
        userAuthorLoginReducer:persisteduserAuthorReducer
    }
})
export const persistor=persistStore(store);