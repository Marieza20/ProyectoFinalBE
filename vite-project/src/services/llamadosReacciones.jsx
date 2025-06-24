import Cookies from "js-cookie";

async function GetReacciones() {
    //const userToken = Cookies.get("access");
    const userToken=localStorage.getItem("access")
    
    try {
        const response = await fetch("http://127.0.0.1:8000/api/reacciones/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Error fetching reacciones");
        }

        const reacciones = await response.json();
        return reacciones;
    } catch (error) {
        console.error('Error fetching reacciones:', error);
        throw error;
    }
}


export default GetReacciones