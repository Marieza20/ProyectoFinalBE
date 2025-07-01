async function getRedes() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/redes/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching redes');
        }

        const redes = await response.json();
        return redes;
    } catch (error) {
        console.error('Error fetching redes:', error);
        throw error;
    }
}

async function getPerfilRedes() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/perfil-redes/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching perfil redes');
        }

        const perfilredes = await response.json();
        return perfilredes;
    } catch (error) {
        console.error('Error fetching perfil redes:', error);
        throw error;
    }
}

async function getPymesDetalles() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/pymes-detalles/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching pymes detalles');
        }

        const perfilredes = await response.json();
        return perfilredes;
    } catch (error) {
        console.error('Error fetching perfil redes:', error);
        throw error;
    }
}


export default { getRedes, getPerfilRedes, getPymesDetalles };


