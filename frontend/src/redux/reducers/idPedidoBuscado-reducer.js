import {GUARDAR_ID_PEDIDO} from '../types';

const initialState = 0;

const idPedidoBuscadoReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO EL ID DEL USUARIO CLICKADO EN LISTA DE USUARIOS
        case GUARDAR_ID_PEDIDO :
            return action.payload;
            
        default :
            return state
    }
}
export default idPedidoBuscadoReducer;