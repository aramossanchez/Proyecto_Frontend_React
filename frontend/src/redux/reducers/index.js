import {combineReducers} from 'redux';
import datosLogin from './datosLogin-reducer';
import datosActualizarUsuario from './datosActualizarUsuario-reducer'
import peliculasMostradas from './peliculasMostradas-reducer';
import idUsuarioBuscado from './idUsuarioBuscado-reducer';
import idPeliculaBuscada from './idPeliculaBuscada-reducer';
import controlarMensajeAlquiler from './controlarMensajeAlquiler-reducer';


const rootReducer = combineReducers({
    datosLogin, datosActualizarUsuario, peliculasMostradas, idUsuarioBuscado, idPeliculaBuscada, controlarMensajeAlquiler
});

export default rootReducer;