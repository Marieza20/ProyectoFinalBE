async function getUsuarios() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching usuarios');
        }

        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        console.error('Error fetching usuarios:', error);
        throw error;
    }
}


//////////LLAMADO POST//////////
async function postUsuarios(obj) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
     
        if (!response.ok) {
            throw new Error('Error fetching Usuarios');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error posting Usuario:', error);
        throw error;
    }
}


//////////////LLAMADO UPDATE/////////////
async function updateUsuarios(nombre, id)  
{
    try {

        const UsuarioData = { 
            nombre
        };

        const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UsuarioData)
        });

        if (!response.ok) {
            throw new Error('Error fetching Usuarios');
        }

        return await response.json();
    } catch (error) {
        console.error('Error update Usuarios:', error);
        throw error;
    }
}


//////////////LLAMADO DELETE/////////////
async function deleteUsuarios(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting usuario with id ${id}`);
        }

        return { message: `Usuario with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting Usuario:', error);
        throw error;
    }
}

export default { getUsuarios, postUsuarios, updateUsuarios, deleteUsuarios };