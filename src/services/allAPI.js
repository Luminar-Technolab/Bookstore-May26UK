import apiService from "../api/apiService";

//http://localhost:3000/register : post request by auth Component when register btn clicked
export const registerAPI = async (userData)=>{
    return await apiService("POST","/register",userData)
}
//http://localhost:3000/login : post request by auth component when login clicked
export const loginAPI = async (userData)=>{
    return await apiService("POST","/login",userData)
}

//http://localhost:3000/google-login : post request by auth component when login clicked
export const googleLoginAPI = async (userData)=>{
    return await apiService("POST","/google-login",userData)
}

//http://localhost:3000/users/6a33aca0723ab2526ab071c6 : put request by edit component when update btn clicked
export const userUpdateAPI = async (id,userData)=>{
    return await apiService("PUT",`users/${id}`,userData)
}