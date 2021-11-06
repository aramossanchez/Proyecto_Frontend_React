import React, { useEffect, useState } from 'react';
import './Peliculas.css';
import axios from 'axios';

const Peliculas = () =>{

    //HOOKS
    const [peliculas, setPeliculas] = useState([]);

    useEffect(async ()=>{
        let res = await axios.get("https://aramossanchez-videoclub-api.herokuapp.com/peliculas/");
        setPeliculas((res.data));
    }, [])

    return(
        <div id="container-peliculas">
            {peliculas.map((pelicula)=>{
                return <div key={pelicula.id} className="pelicula-individual">
                    <p>Título: {JSON.stringify(pelicula.titulo)}</p>
                    <p>Ciudad disponible: {JSON.stringify(pelicula.ciudad)}</p>
                    <p>Disponible para alquilar: {JSON.stringify(pelicula.alquilada)}</p>
                    
                    </div>
            })}
        </div>
    )
}

export default Peliculas;