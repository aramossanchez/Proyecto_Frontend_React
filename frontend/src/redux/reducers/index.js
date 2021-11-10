import {combineReducers} from 'redux';
import datosLogin from './datosLogin-reducer';
import datosActualizarUsuario from './datosActualizarUsuario-reducer'
import peliculasMostradas from './peliculasMostradas-reducer';


const rootReducer = combineReducers({
    datosLogin, datosActualizarUsuario, peliculasMostradas
});

export default rootReducer;