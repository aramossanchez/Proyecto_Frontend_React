import {GUARDAR_PELICULAS} from '../types';

const initialState = {
    peliculas:[]
};

const PeliculasMostradasReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO LOS DATOS DEL USUARIO LOGUEADO
        case GUARDAR_PELICULAS :
            return {
                peliculas: action.payload
            };
            
        default :
            return state
    }
}
export default PeliculasMostradasReducer;