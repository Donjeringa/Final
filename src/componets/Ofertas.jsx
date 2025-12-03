import React from "react";
import ListaProductos from "./ListaProductos";
const Ofertas =()=>{
    return(
        <div>
            <h1 className="container">Nuestras ofertas</h1>
            <ListaProductos category="Ropa en rebaja"/>
        </div>
    )
}
export default Ofertas;