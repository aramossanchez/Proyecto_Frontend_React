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


    const guardarId = (e) =>{
        setIdPedido(e.target.value);
    }

    const encontrarPedido = async () =>{
        let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/pedidos/${idPedido}`, config);
        setPedidoEncontrado(res.data);
        console.log(res.data);
    }

    //AL CARGAR EL COMPONENTE COMPRUEBO SI idPedidoBuscado TIENE VALOR DISTINTO DE 0. SI LO TIENE, QUE BUSQUE UN PEDIDO CON ESE ID. CUANDO TERMINE TODAS LAS COMPROBACIONES, GUARDARÁ EN REDUX EL VALOR 0  
    useEffect(()=>{
        if (props.idPedidoBuscado !== 0) {
            const buscarPedidoDesdeListado = async () => {
            document.getElementById("busqueda-pedido-id").value = props.idPedidoBuscado;
            let res = await axios.get(`https://aramossanchez-videoclub-api.herokuapp.com/pedidos/${props.idPedidoBuscado}`, config);
            console.log(res.data);
            setPedidoEncontrado(res.data);
            setIdPedido(props.idPedidoBuscado)
        }
        buscarPedidoDesdeListado();
    } else{
        document.getElementById("busqueda-pedido-id").value = "";
    }
    props.dispatch({type:GUARDAR_ID_PEDIDO, payload: 0});
        
    }, [])

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
                    <div className="barra-busqueda-pedido">
                        <input type="text" name="busqueda" id="busqueda-pedido-id" autoComplete="off" onChange={(e)=>guardarId(e)}/>
                        <div className="boton-lupa"><img onClick={()=>encontrarPedido()} src={lupa} alt="Lupa" /></div>                    
                    </div>
                        <div id="datos-pedido-id">
                            <h3>Datos del pedido</h3>
                            <p><span>Fecha de alquiler:</span><input readOnly value={pedidoEncontrado.fecha_alquiler}/></p>
                            <p><span>Fecha de devolución:</span><input readOnly value={pedidoEncontrado.fecha_devolucion}/></p>
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
                                <div><img src={pedidoEncontrado.pelicula.caratula} alt="Caratula" /></div>
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