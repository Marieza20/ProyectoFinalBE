async function getUserGroup() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/userGroup/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching user group');
        }

        const userGroup = await response.json();
        return userGroup;
    } catch (error) {
        console.error('Error fetching user group:', error);
        throw error;
    }
}


//////////LLAMADO POST//////////
async function postUserGroup(user, group) {
    const obj = {
        user,
        group
    }
    
    try {
        const response = await fetch("http://127.0.0.1:8000/api/userGroup/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
     
        if (!response.ok) {
            throw new Error('Error fetching user group');
        }
        
        const prueba = await response.json();
        console.log(prueba);
        return prueba
        
    } catch (error) {
        console.error('Error posting user group:', error);
        throw error;
    }
}


//////////////LLAMADO UPDATE/////////////
async function updateUserGroup(nombre, id)  
{
    try {

        const UserGroupData = { 
            nombre
        };

        const response = await fetch(`http://127.0.0.1:8000/api/userGroup/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserGroupData)
        });

        if (!response.ok) {
            throw new Error('Error fetching UserGroup');
        }

        return await response.json();
    } catch (error) {
        console.error('Error update UserGroup:', error);
        throw error;
    }
}


//////////////LLAMADO DELETE/////////////
async function deleteUserGroup(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/userGroup/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }

        return { message: `UserGroup with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting UserGroup:', error);
        throw error;
    }
}

export default { getUserGroup, postUserGroup, updateUserGroup, deleteUserGroup };