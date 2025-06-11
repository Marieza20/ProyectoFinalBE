import React from 'react'

function BotonEliminarPublicacion() {

    const handleEliminar = async (idPublicacion) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta publicación?")) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/publicaciones/${idPublicacion}/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setPyme(prev => ({
                    ...prev,
                    publicaciones: prev.publicaciones.filter(publi => publi.id !== idPublicacion)
                }));
            } else {
                console.log(`Error al eliminar la publicación: ${response.statusText}`);

            }
        } catch (error) {
            console.log(`Error al eliminar la publicación: ${error.message}`);

        }
    };

    if (!user || !pyme || user.id !== pyme.usuario.id) {
        return null;
    }

    
    return (
        <div>
            <button className="btnEliminar" onClick={() => handleEliminar(publi.id)}>
                Eliminar Publicación
            </button>
        </div>
    )
}

export default BotonEliminarPublicacion