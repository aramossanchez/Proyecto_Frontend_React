import {GUARDAR_ID_USUARIO} from '../types';

const initialState = 0;

const idUsuarioBuscadoReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO EL ID DEL USUARIO CLICKADO EN LISTA DE USUARIOS
        case GUARDAR_ID_USUARIO :
            return action.payload;
            
        default :
            return state
    }
}
export default idUsuarioBuscadoReducer;