import './TuZona.scss';
import Lateral from '../../Components/Lateral/Lateral';
import PantallaError from '../PantallaError/PantallaError';
import { connect } from 'react-redux';

const TuZona = (props) =>{

    if (props.datosLogin.usuario.rol === undefined) {
        return(
            <PantallaError/>
        )
    }
    if(props.datosLogin.usuario.rol === "usuario"){
        return(
            <div id="container-tuzona">
                <Lateral/>
                <div id="contenido-tuzona">
                    <h2>Bienvenido a Tu Zona de usuario</h2>
                    <h3>Esta es tu página principal. Desde aquí puedes:</h3>
                    <div id="opciones-tuzona">
                        <p>🙂 Ver tus datos de usuario y actualizarlos.</p>
                        <p>📕 Consultar tus alquileres (actuales y pasados).</p>
                        <p>📼 Ver todo nuestro catálogo de películas al completo.</p>
                        <p>💲 Comprobar las películas que tenemos en tu ciudad y que están disponibles para alquilar.</p>
                        <p>📋 Mientras ves el listado de las películas, puedes clickar en cada una de ellas para poder ver sus detalles. Si esa película está disponible para alquilar en tu zona, podrás hacerlo pulsando el botón "Alquilar".</p>
                    </div>
                </div>
            </div>
        )
    }
    if(props.datosLogin.usuario.rol === "administrador"){
        return(
            <div id="container-tuzona">
                <Lateral/>
                <div id="contenido-tuzona">
                    <h2>Bienvenido a Tu Zona de administrador</h2>
                    <h3>Esta es tu página principal. Desde aquí puedes:</h3>
                    <div id="opciones-tuzona">
                        <p>👥 Crear usuarios nuevos.</p>
                        <p>🔍 Buscar usuarios por id.</p>
                        <p>📃 Obtener un listado de todos los usuarios. Puedes acceder a los detalles de cada usuario clickando sobre él.</p>
                        <p>🔎 Buscar pedidos por id.</p>
                        <p>📊 Listado de todos los pedidos. Puedes borrar cualquiera de los pedidos desde ese listado.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state)=>({
    datosLogin: state.datosLogin
}))(TuZona);