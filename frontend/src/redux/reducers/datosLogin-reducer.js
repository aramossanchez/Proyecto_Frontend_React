import {LOGIN, LOGOUT, ACTUALIZA_DATOS_LOGIN} from '../types';

const initialState = {
    token : '',
    usuario : {}
};

const datosLoginReducer = (state = initialState, action) => {
    switch(action.type){
        //Ejemplo de añadido de datos
        case LOGIN :
            return action.payload;

        //Ejemplo de reestablecimiento o borrado de datos
        case LOGOUT : 
            return initialState;
        //MODIFICAMOS LOS DATOS QUE TENEMOS GUARDADOS EN ESTE ESTADO CON LOS VALORES QUE METAMOS POR INPUT EN Perfil.js
        case ACTUALIZA_DATOS_LOGIN :
            return {
                ...state,
                usuario: action.payload
            }
            
        default :
            return state
    }
}
export default datosLoginReducer;