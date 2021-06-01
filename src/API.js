const API_URL= "http://localhost:4000";

export const getLogs= async ()=>{
    const response= await fetch(`${API_URL}/api/logs`)
    return response.json()
}

export const createLogEntry = async (entry) =>{
    const response= await fetch(`${API_URL}/api/logs`, {
        method: `POST`,
        headers :{
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry)
    });
    return response.json();

}