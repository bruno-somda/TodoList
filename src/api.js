export const  setStorage =(data)=>{
    localStorage.setItem("state",JSON.stringify(data))
}
//end set storage state
export const getStorage = async()=>{
    let data = localStorage.getItem("state")?JSON.parse(localStorage.getItem("state")):[];
    return data;
}
//get storage state
