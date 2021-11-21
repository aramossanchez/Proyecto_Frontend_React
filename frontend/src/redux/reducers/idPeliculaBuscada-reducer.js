import {GUARDAR_ID_PELICULA} from '../types';

const initialState = 0;

const idPeliculaBuscadaReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO EL ID DE LA PELICULA CLICKADA
        case GUARDAR_ID_PELICULA :
            return action.payload;
            
        default :
            return state
    }
}
export default idPeliculaBuscadaReducer;