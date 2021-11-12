import {GUARDAR_ID_USUARIO} from '../types';

const initialState = {};

const idUsuarioBuscadoReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO LOS DATOS DEL USUARIO LOGUEADO
        case GUARDAR_ID_USUARIO :
            return action.payload;
            
        default :
            return state
    }
}
export default idUsuarioBuscadoReducer;