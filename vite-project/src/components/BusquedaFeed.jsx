import React, { useState } from 'react';
import Publicaciones from './Publicaciones';

function BusquedaFeed() {
    const [busqueda, setBusqueda] = useState('');

    return (
        <div className='fondoB margen'>
            <div className="barra">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />
            </div>
            <Publicaciones mostrarTodas={true} filtroBusqueda={busqueda} />
        </div>
    );
}

export default BusquedaFeed;