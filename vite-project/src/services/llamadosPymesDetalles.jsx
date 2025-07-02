async function getPymesDetalles(id = null) {
    try {
        const url = id
            ? `http://127.0.0.1:8000/api/pymes-detalles/${id}/`
            : `http://127.0.0.1:8000/api/pymes-detalles/`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener detalles de pyme');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al obtener detalles de pyme:', error);
        throw error;
    }
}


async function postPymeDetalle(data) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/pymes-detalles/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al crear pyme');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al crear pyme:', error);
        throw error;
    }
}


async function updatePymeDetalle(id, data) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar pyme');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar pyme:', error);
        throw error;
    }
}


async function deletePymeDetalle(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pymes-detalles/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar pyme con id ${id}`);
        }

        return { message: `Pyme con id ${id} eliminada correctamente` };
    } catch (error) {
        console.error('Error al eliminar pyme:', error);
        throw error;
    }
}

export default { getPymesDetalles, postPymeDetalle, updatePymeDetalle, deletePymeDetalle };