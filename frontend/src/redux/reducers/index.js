import {combineReducers} from 'redux';
import datosLogin from './datosLogin-reducer';
import datosActualizarUsuario from './datosActualizarUsuario.reducer'


const rootReducer = combineReducers({
    datosLogin, datosActualizarUsuario
});

export default rootReducer;