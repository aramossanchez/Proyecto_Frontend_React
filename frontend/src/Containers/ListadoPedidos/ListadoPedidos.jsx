import React, { useEffect, useState } from 'react';
import './ListadoPedidos.css';
import axios from 'axios';
import Lateral from '../../Components/Lateral/Lateral';
import { connect } from 'react-redux';

const ListadoPedidos = (props) =>{

    //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
    let config = {
        headers: { Authorization: `Bearer ${props.datosLogin.token}` }
    };

    //HOOKS
    const [listaPedidos, setListaPedidos] = useState([])

    //HACEMOS LA CONSULTA DE TODOS LOS PEDIDOS A LA BASE DE DATOS Y LA GUARDAMOS EN EL HOOK
    useEffect(()=>{
        const guardarlistaPedidos = async () =>{
            let res = await axios.get("https://aramossanchez-videoclub-api.herokuapp.com/pedidos",config);
            setListaPedidos(res.data);
        }
        guardarlistaPedidos();
    },[]);

    return(
        <div id="container-pedidos">
            <Lateral/>
            <div id="contenido-pedidos">
                <h2>Listado de pedidos realizados</h2>
                <div id="nombres-columnas-pedidos">
                    <div>ID de pedido</div>
                    <div>ID de película</div>
                    <div>ID de usuario</div>
                    <div>Fecha de alquiler</div>
                    <div>Fecha de devolución</div>       
                </div>
                <div id="lista-pedidos">
                    {listaPedidos?.map((pedido)=>{
                        return <div key={pedido.id} className="pedido-individual">
                            <div></div>
                            <p>{pedido.id}</p>
                            <p>{pedido.peliculaId}</p>
                            <p>{pedido.usuarioId}</p>
                            <p>{pedido.fecha_alquiler}</p>
                            <p>{pedido.fecha_devolucion}</p>                    
                        </div>
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default connect((state)=>({
    datosLogin: state.datosLogin,
}))(ListadoPedidos);