/* import { sha256 } from 'js-sha256';  */

async function getPymes() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/pymes/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching pymes');
        }

        const pymes = await response.json();
        return pymes;
    } catch (error) {
        console.error('Error fetching pymes:', error);
        throw error;
    }
}

//////////LLAMADO POST//////////
async function postPymes(nombre, correo, telefono, imagen, contrasena) {
    const obj = {
        nombre,
        correo,
        telefono,
        imagen,
        contrasena
    }

    console.log(obj);
    
    try {
        const response = await fetch("http://127.0.0.1:8000/api/pymes/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
     
        if (!response.ok) {
            throw new Error('Error posting pymes');
        }
        
        const data = await response.json();
        console.log(data);
        return data;
        
    } catch (error) {
        console.error('Error posting pyme:', error);
        throw error;
    }
}

//////////////LLAMADO UPDATE/////////////
async function updatePymes(nombre, id) {
    try {
        const pymeData = { 
            nombre
        };

        const response = await fetch(`http://127.0.0.1:8000/api/pymes/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pymeData)
        });

        if (!response.ok) {
            throw new Error('Error updating pyme');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating pyme:', error);
        throw error;
    }
}

//////////////LLAMADO DELETE/////////////
async function deletePymes(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pymes/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting pyme with id ${id}`);
        }

        return { message: `Pyme with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting pyme:', error);
        throw error;
    }
}

export default { getPymes, postPymes, updatePymes, deletePymes };