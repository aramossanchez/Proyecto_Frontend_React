import React, {useEffect, useState} from 'react';
import Lateral from '../../Components/Lateral/Lateral';
import './BuscarPedido.css';
import { connect } from 'react-redux';
import axios from 'axios';
import lupa from '../../img/lupa.png';
import PantallaError from '../PantallaError/PantallaError';
import { GUARDAR_ID_PEDIDO } from '../../redux/types';

const BuscarPedido = (props) =>{

    let config = {
        headers: { Authorization: `Bearer ${props.datosLogin.token}` }
    };

    //HOOK
    const [idPedido, setIdPedido] = useState();
    const [pedidoEncontrado, setPedidoEncontrado] = useState({});
    const [mensajeError, setmensajeError] = useState("");
    
    //COMPROBAR ID INTRODUCIDO
    const [comprobarID, setComprobarID] = useState(false);

    //COMPROBAR CUADRO DE BUSQUEDA
    const comprobarIdBusqueda = (e) =>{
        let er = /^[0-9]+$/;
        if (er.test(e.target.value)) {
            setComprobarID(true);
        }else{
            setComprobarID(false);
        }
        console.log(comprobarID)
    }

    //GUARDO EL ID POR EL QUE BUSCAR EL PEDIDO
    const guardarId = (e) =>{
        setIdPedido(e.target.value);
    }

    const encontrarPedido = async () =>{
        try {
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/pedidos/${idPedido}`, config);
            setPedidoEncontrado(res.data);            
        } catch (error) {
            //SETEO MENSAJE PARA MOSTRAR ERROR
            setmensajeError("Ha surgido un error al intentar buscar el pedido.");//TRAS 4 SEGUNDOS, SETEO MENSAJE A STRING VACIO
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        }
    }

    //AL CARGAR EL COMPONENTE COMPRUEBO SI idPedidoBuscado TIENE VALOR DISTINTO DE 0. SI LO TIENE, QUE BUSQUE UN PEDIDO CON ESE ID. CUANDO TERMINE TODAS LAS COMPROBACIONES, GUARDARÁ EN REDUX EL VALOR 0  
    useEffect(()=>{
        if (props.idPedidoBuscado !== 0) {
            const buscarPedidoDesdeListado = async () => {
            document.getElementById("busqueda-pedido-id").value = props.idPedidoBuscado;
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/pedidos/${props.idPedidoBuscado}`, config);
            setPedidoEncontrado(res.data);
            setIdPedido(props.idPedidoBuscado)
            }
            buscarPedidoDesdeListado();
        } else{
            document.getElementById("busqueda-pedido-id").value = "";
        }
        props.dispatch({type:GUARDAR_ID_PEDIDO, payload: 0});        
    }, []);

    //TRADUCE FECHA DE ALQUILER DE FORMATO BBDD A FORMATO ESPAÑOL
    const calcularFechaAlquiler = (fecha) =>{
        let fechaBBDD = fecha.split(/[- : T .]/);
        let fechaProvisional = [fechaBBDD[2], fechaBBDD[1], fechaBBDD[0]];
        return fechaProvisional.join('-');
    }

    //TRADUCE FECHA DE DEVOLUCION DE FORMATO BBDD A FORMATO ESPAÑOL
    const calcularFechaDevolucion = (fecha) =>{
        let fechaBBDD = fecha.split(/[- : T .]/);
        let fechaProvisional = [fechaBBDD[2], fechaBBDD[1], fechaBBDD[0]];
        return fechaProvisional.join('-');
    }

    //PONER IMAGEN DE ERROR SI FALLA AL CARGAR LA CARATULA
    const cambiarFoto = (e) =>{
        e.target.src = "https://www.pngitem.com/pimgs/m/119-1190874_warning-icon-png-png-download-icon-transparent-png.png";
    }

    if (props.datosLogin.usuario.rol !== "administrador") {
        return(
            <PantallaError/>
        )
    } else{
        return(
            <div id="container-buscar-pedido">
                <Lateral/>
                <div id="contenido-buscar-pedido">
                    <h2>Buscar pedido por ID</h2>
                    {/* SI mensajeError ESTÁ VACIO NO MUESTRA NADA. SI TIENE ALGO, MUESTRA EL MENSAJE */}
                    {!mensajeError
                    ?
                    ""
                    :
                    <div className="mensaje-error">{mensajeError}</div>    
                    }
                    <div className="barra-busqueda-pedido">
                        <input type="text" name="busqueda" id="busqueda-pedido-id" autoComplete="off" onChange={(e)=>{guardarId(e); comprobarIdBusqueda(e)}}/>
                        <div className={comprobarID ? "boton-lupa": "boton-lupa deshabilitado"}><img onClick={()=>encontrarPedido()} src={lupa} alt="Lupa" /></div>                    
                    </div>
                        <div id="datos-pedido-id">
                            <h3>Datos del pedido</h3>
                            {/* INDICO QUE SI AUN NO SE HA CARGADO pedidoEncontrado MAS EL CAMPO CORRESPONDIENTE, QUE NO HAGA NADA. SI SE CARGA, INDICO QUE EJECUTE LA FUNCION DE CONVERSION DE FORMATO DE FECHA */}
                            <p><span>Fecha de alquiler:</span><input readOnly value={pedidoEncontrado.fecha_alquiler !== undefined ? calcularFechaAlquiler(pedidoEncontrado.fecha_alquiler):""}/></p>
                            <p><span>Fecha de devolución:</span><input readOnly value={pedidoEncontrado.fecha_devolucion !== undefined ? calcularFechaDevolucion(pedidoEncontrado.fecha_devolucion):""}/></p>
                            <p><span>Precio:</span><input readOnly value={pedidoEncontrado.precio}/></p>
                        </div>
                        {pedidoEncontrado.usuario
                        ?
                        <div id="contenedor-usuario-pelicula">
                            <div id="datos-usuario-pedido">
                                <h3>Datos del usuario</h3>
                                <p><span>ID:</span><input readOnly value={pedidoEncontrado.usuario.id}/></p>
                                <p><span>Correo:</span><input readOnly value={pedidoEncontrado.usuario.correo}/></p>
                                <p><span>Nombre:</span><input readOnly value={pedidoEncontrado.usuario.nombre}/></p>
                                <p><span>Apellidos:</span><input readOnly value={pedidoEncontrado.usuario.apellidos}/></p>
                                <p><span>DNI:</span><input readOnly value={pedidoEncontrado.usuario.dni}/></p>
                                <p><span>Dirección:</span><input readOnly value={pedidoEncontrado.usuario.direccion}/></p>
                                <p><span>Ciudad:</span><input readOnly value={pedidoEncontrado.usuario.ciudad}/></p>
                                <p><span>Teléfono:</span><input readOnly value={pedidoEncontrado.usuario.telefono}/></p>
                            </div>
                            <div id="datos-pelicula-pedido">
                                <h3>Datos de la película</h3>
                                <div><img src={pedidoEncontrado.pelicula.caratula} alt="Caratula" onError={(e)=>cambiarFoto(e)}/></div>
                                <p><span>ID:</span><input readOnly value={pedidoEncontrado.pelicula.id}/></p>
                                <p><span>Título:</span><input readOnly value={pedidoEncontrado.pelicula.titulo}/></p>
                        </div>
                        </div>
                        :
                        ""
                        }
                </div>
            </div>
        )
    }
};

export default connect((state)=>({
    datosLogin: state.datosLogin,
    idPedidoBuscado: state.idPedidoBuscado
}))(BuscarPedido);