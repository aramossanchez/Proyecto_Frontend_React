import {MENSAJE_ALQUILAR} from '../types';
import {PELICULA_ALQUILADA} from '../types';

const initialState = {
    verMensaje: false,
    peliculaBuscada: {}
};

const controlarMensajeAlquilerReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO EL ID DE LA PELICULA CLICKADA
        case MENSAJE_ALQUILAR :
            return{
                ...state,
                verMensaje: action.payload
            };

        case PELICULA_ALQUILADA :
            return {
                ...state,
                peliculaBuscada: action.payload
            };
            
        default :
            return state
    }
}
export default controlarMensajeAlquilerReducer;