import Cookies from "js-cookie";

async function GetPublicaciones() {
    //const userToken = Cookies.get("access");
    const userToken=localStorage.getItem("access")    
    
    try {
        const response = await fetch("http://127.0.0.1:8000/api/publicaciones/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Error fetching publicaciones");
        }

        const publicaciones = await response.json();        
        return publicaciones;
    } catch (error) {
        console.error('Error fetching publicaciones:', error);
        throw error;
    }
}


export default GetPublicaciones