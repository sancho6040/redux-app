import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice' // se puede importar con el nombre que quieras ya que tiene un export default

const store = configureStore({
    reducer:{
        //TODO: agregar reducers
        user:userReducer
    }

})

export default store