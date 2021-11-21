import React, {useState} from 'react';
import './AlquilarPelicula.scss';
import { connect } from 'react-redux';
import { MENSAJE_ALQUILAR } from '../../redux/types';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AlquilarPelicula = (props) =>{

    const navigate = useNavigate();

    //HOOK
    const [mensajeError, setmensajeError] = useState("");

    //CAMBIAMOS ESTADO DE REDUX A FALSE, PARA DEJAR DE MOSTRAR MENSAJE DE ALQUILER DE PELICULAS
    const cerrarMensajeAlquiler = () =>{
        props.dispatch({type:MENSAJE_ALQUILAR, payload: false});
    }

    //CREAMOS PEDIDO EN LA BASE DE DATOS
    const crearPedido = async (precio, dias) =>{
        

        //CREAMOS LA CABECERA PARA HACER EL PUT, CON EL TOKEN
        let config = {
            headers: { Authorization: `Bearer ${props.datosLogin.token}` }
        };

        //CREAMOS EL BODY PARA HACER EL PUT
        let body = {
            peliculaId: props.controlarMensajeAlquiler.peliculaBuscada.id,
            usuarioId: props.datosLogin.usuario.id,
            fecha_alquiler: new Date,
            //GENERAMOS UNA FECHA NUEVA, PASANDO COMO PARAMETRO LOS MILISEGUNDOS DE LA FECHA ACTUAL Y SUMANDO LOS MILISEGUNDOS CORRESPONDIENTES AL NUMERO DE DÍAS QUE DURA EL ALQUILER
            fecha_devolucion: new Date(new Date().getTime() + (dias * 24 * 60 * 60 * 1000)),
            precio: precio
        }
        
        try {
            //HACEMOS EL PUT A LA BASE DE DATOS
            let res = await axios.post(`https://aramossanchez-videoclub-api.herokuapp.com/pedidos`, body, config);
            console.log(res);

            //SETEO MENSAJE PARA MOSTRAR TRAS LOGIN CON EXITO
            setmensajeError("Se ha realizado el alquiler correctamente");

            //TRAS 2 SEGUNDOS, CAMBIO A PANTALLA TUZONA
            setTimeout(() => {
                navigate("/alquileres");
                cerrarMensajeAlquiler();
            }, 2000);
        } catch (error) {
            //SETEO MENSAJE PARA MOSTRAR ERROR
            setmensajeError("Ha habido un error al intentar crear el pedido.");

            //TRAS 4 SEGUNDOS, SETEO MENSAJE A STRING VACIO
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
            
        }
        
    }
    return(
        <div id="container-mensaje-alquilar">
            <div id="cuador-mensaje-alquilar">
                <div id="cerrar-mensaje-alquilar" onClick={()=>cerrarMensajeAlquiler()}>X</div>
                <h2>Elige cuantos días quieres alquilar la película</h2>
                {/* SI mensajeError ESTÁ VACIO NO MUESTRA NADA. SI TIENE ALGO, MUESTRA EL MENSAJE */}
                {!mensajeError
                ?
                ""
                :
                <div className="mensaje-error">{mensajeError}</div>    
                }
                <div id="opciones-alquiler">
                    <div className="boton" onClick={()=>crearPedido(3.95, 2)}>2 días (3,95€)</div>
                    <div className="boton" onClick={()=>crearPedido(4.95, 3)}>3 días (4,95€)</div>
                    <div className="boton" onClick={()=>crearPedido(6.95, 7)}>7 días (6.95€)</div>
                </div>
            </div>
        </div>
    )
}

export default connect((state)=>({
    controlarMensajeAlquiler: state.controlarMensajeAlquiler,
    datosLogin: state.datosLogin,
}))(AlquilarPelicula);