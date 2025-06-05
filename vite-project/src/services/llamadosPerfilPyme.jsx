async function getPerfilPyme() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/perfil-pymes/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching perfil pymes');
        }

        const perfiles = await response.json();
        return perfiles;
    } catch (error) {
        console.error('Error fetching perfil pymes:', error);
        throw error;
    }
}


//////////LLAMADO POST//////////
async function postPerfilPyme(imagen) {

    const formData = new FormData();
    formData.append('imagen', imagen); 


    try {
        const response = await fetch("http://127.0.0.1:8000/api/perfil-pymes/", {
            method: 'POST',
            body: formData  
        });
     
        if (!response.ok) {
            throw new Error('Error posting perfil pymes');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error posting perfil pyme:', error);
        throw error;
    }
}


//////////////LLAMADO UPDATE/////////////
async function updatePerfilPyme(nombre,precio,cantidad,categoria,id)
{
    try {

        const perfilData = { 
            nombre,
            precio,
            cantidad,
            categoria
        };

        const response = await fetch(`http://127.0.0.1:8000/api/perfil-pymes/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(perfilData)
        });

        if (!response.ok) {
            throw new Error('Error updating perfil pymes');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating perfil pyme:', error);
        throw error;
    }
}


//////////////LLAMADO DELETE/////////////
async function deletePerfilPyme(id) {    
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/perfil-pymes/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting perfil pyme with id ${id}`);
        }

        return { message: `Perfil Pyme with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting perfil pyme:', error);
        throw error;
    }
}

export default { getPerfilPyme, postPerfilPyme, updatePerfilPyme, deletePerfilPyme };