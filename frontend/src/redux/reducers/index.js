import {combineReducers} from 'redux';
import datosLogin from './datosLogin-reducer';
import datosActualizarUsuario from './datosActualizarUsuario-reducer'
import peliculasMostradas from './peliculasMostradas-reducer';
import idUsuarioBuscado from './idUsuarioBuscado-reducer';


const rootReducer = combineReducers({
    datosLogin, datosActualizarUsuario, peliculasMostradas, idUsuarioBuscado
});

export default rootReducer;