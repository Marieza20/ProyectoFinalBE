async function getImagenes() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/imagenes/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching imagenes');
        }

        const imagenes = await response.json();
        return imagenes;
    } catch (error) {
        console.error('Error fetching imagenes:', error);
        throw error;
    }
}


export default { getImagenes };