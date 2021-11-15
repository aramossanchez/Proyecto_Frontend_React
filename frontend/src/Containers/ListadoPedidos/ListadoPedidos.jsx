import React, { useEffect, useState } from 'react';
import './ListadoPedidos.css';
import axios from 'axios';
import Lateral from '../../Components/Lateral/Lateral';
import { connect } from 'react-redux';
import loading from '../../img/loading.svg';

const ListadoPedidos = (props) =>{

    //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
    let config = {
        headers: { Authorization: `Bearer ${props.datosLogin.token}` }
    };

    //HOOKS
    const [listaPedidos, setListaPedidos] = useState([])
    const [mensajeError, setmensajeError] = useState("");
    //CREADO PARA MOSTRAR ICONO CARGANDO
    const [cargando, setCargando] = useState(false);

    //HACE QUE SE VEA EL ICONO DE CARGANDO DURANTE 1.25 SEGUNDOS
    const mostrarLoading = () =>{
        setCargando(true);
        setTimeout(() => {
            setCargando(false);
        }, 1250);
    }

    //HACEMOS LA CONSULTA DE TODOS LOS PEDIDOS A LA BASE DE DATOS Y LA GUARDAMOS EN EL HOOK
    const guardarlistaPedidos = async () =>{
        let res = await axios.get("https://aramossanchez-videoclub-api.herokuapp.com/pedidos",config);
        setListaPedidos(res.data);
    }

    //CADA VEZ QUE CARGUEMOS EL COMPONENTE POR PRIMERA VEZ, SE HARÁ LA CONSULTA
    useEffect(()=>{
        guardarlistaPedidos();
        mostrarLoading();
    },[]);

    const borrarPedido = async (pedido, pelicula) =>{
        try {
            await axios.delete(`https://aramossanchez-videoclub-api.herokuapp.com/pedidos/${pedido}/pelicula/${pelicula}`, config);
            guardarlistaPedidos();
             //SETEAMOS MENSAJE INDICANDO QUE EL BORRADO SE HA EFECTUADO CORRECTAMENTE
            setmensajeError("Pedido borrado correctamente.");

            //TRAS 4 SEGUNDOS, HAGO DESAPARECER EL MENSAJE
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        } catch (error) {
            //SETEO MENSAJE DE ERROR
            setmensajeError("Ha habido un error al intentar borrar el pedido.");

            //TRAS 4 SEGUNDOS, HAGO DESAPARECER EL MENSAJE
            setTimeout(() => {
                setmensajeError("");
            }, 4000);
        }
    }


    return(
        <div id="container-pedidos">
            <Lateral/>
            <div id="contenido-pedidos">
                <h2>Listado de pedidos realizados</h2>
                {/* SI mensajeError ESTÁ VACIO NO MUESTRA NADA. SI TIENE ALGO, MUESTRA EL MENSAJE */}
                {!mensajeError
                ?
                ""
                :
                <div className="mensaje-error">{mensajeError}</div>    
                }
                <div id="nombres-columnas-pedidos">
                    <div>ID de pedido</div>
                    <div>ID de película</div>
                    <div>ID de usuario</div>
                    <div>Fecha de alquiler</div>
                    <div>Fecha de devolución</div>
                    <div></div>
                </div>
                {/* MOSTRAR LAS PELICULAS O ICONO DE CARGANDO*/}
                {cargando
                ?
                <img src={loading} alt="loading" />
                :
                <div id="lista-pedidos">
                    {listaPedidos?.map((pedido)=>{
                        return <div key={pedido.id} className="pedido-individual">
                            <div></div>
                            <p>{pedido.id}</p>
                            <p>{pedido.peliculaId}</p>
                            <p>{pedido.usuarioId}</p>
                            <p>{pedido.fecha_alquiler}</p>
                            <p>{pedido.fecha_devolucion}</p>
                            <p><div className="boton" onClick={()=>borrarPedido(pedido.id, pedido.peliculaId)}>BORRAR PEDIDO</div> </p>               
                        </div>
                    })}
                </div>
                }
            </div>
            
        </div>
    )
}

export default connect((state)=>({
    datosLogin: state.datosLogin,
}))(ListadoPedidos);