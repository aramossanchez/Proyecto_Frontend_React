import {COPIA_DATOS_LOGIN, GUARDA_CAMBIOS_ACTUALIZAR, ACTUALIZA_DATOS_LOGIN} from '../types';

const initialState = {
    correo:"",
    dni:"",
    nombre:"",
    apellidos:"",
    direccion:"",
    ciudad:"",
    telefono:"",
    createdAt:""
};

const datosActualizarUsuario = (state = initialState, action) => {
    switch(action.type){
        //OBTENEMOS LOS DATOS DEL USUARIO LOGUEADO Y HACEMOS UNA COPIA EN ESTE ESTADO
        case COPIA_DATOS_LOGIN :
            return action.payload;
        //MODIFICAMOS LOS DATOS QUE TENEMOS GUARDADOS EN ESTE ESTADO CON LOS VALORES QUE METAMOS POR INPUT EN Perfil.js
        case GUARDA_CAMBIOS_ACTUALIZAR :
            return {
                ...state,
                [action.payload.propiedad]: action.payload.valor
            };
                    
        default :
            return state
    }
}
export default datosActualizarUsuario;