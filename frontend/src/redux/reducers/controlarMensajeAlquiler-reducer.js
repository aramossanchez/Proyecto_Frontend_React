import {MENSAJE_ALQUILAR} from '../types';

const initialState = false;

const controlarMensajeAlquilerReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO EL ID DE LA PELICULA CLICKADA
        case MENSAJE_ALQUILAR :
            return action.payload;
            
        default :
            return state
    }
}
export default controlarMensajeAlquilerReducer;