import apiService from "../api/apiService";

//http://localhost:3000/register : post request by auth Component when register btn clicked
export const registerAPI = async (userData)=>{
    return await apiService("POST","/register",userData)
}