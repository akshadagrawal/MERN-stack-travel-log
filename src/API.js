const API_URL= "http://localhost:4000";

export const getLogs= async ()=>{
    const response= await fetch(`${API_URL}/api/logs`)
    return response.json()
}

export const createLogEntry = async (entry) =>{
    const apiKey= entry.api_key;
    delete entry.api_key;
    const response= await fetch(`${API_URL}/api/logs`, {
        method: `POST`,
        headers :{
            'content-type': 'application/json',
            'x-auth-header': apiKey
        },
        body: JSON.stringify(entry)
    });
    const json= await response.json();
    if(response.ok){
        return json;
    }
    const error= new Error(json.error);
    console.log(json);
    error.response = json;
    throw error;

}