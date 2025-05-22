async function getProductos() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/productos/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching productos');
        }

        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error fetching productos:', error);
        throw error;
    }
}


//////////LLAMADO POST//////////
async function postProductos(obj) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/productos/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
     
        if (!response.ok) {
            throw new Error('Error fetching productos');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error posting producto:', error);
        throw error;
    }
}


//////////////LLAMADO UPDATE/////////////
async function updateProductos(nombre,precio,cantidad,categoria,id)
{
    try {

        const productoData = { 
            nombre,
            precio,
            cantidad,
            categoria
        };

        const response = await fetch(`http://127.0.0.1:8000/api/productos/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoData)
        });

        if (!response.ok) {
            throw new Error('Error fetching productos');
        }

        return await response.json();
    } catch (error) {
        console.error('Error update producto:', error);
        throw error;
    }
}


//////////////LLAMADO DELETE/////////////
async function deleteProductos(id) {    
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/productos/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting producto with id ${id}`);
        }

        return { message: `Producto with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting producto:', error);
        throw error;
    }
}

export default { getProductos, postProductos, updateProductos, deleteProductos };