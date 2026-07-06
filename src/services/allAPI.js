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
    return await apiService("PUT",`/users/${id}`,userData)
}

//http://localhost:3000/books : post request by uploadBook compoennte when upload btn cliecked
export const addBookAPI = async (bookDetails)=>{
    return await apiService("POST",`/books`,bookDetails)
}

//http://localhost:3000/user-books : get request by bookstatus compoenent whne age loads
export const getAllUserUploadBooksAPI = async ()=>{
    return await apiService("GET",`/user-books`)
}

//http://localhost:3000/user-books/6a477efa2341c81338cc0bf7 : delete request by bookstatus when delete btn clicked
export const removeUserUploadBookAPI = async (bookId)=>{
    return await apiService("DELETE",`/user-books/${bookId}`)
}

//http://localhost:3000/user-purchase-books : get request by purchase component when page loads
export const getAllUserPurchaseBooksAPI = async ()=>{
    return await apiService("GET",`/user-purchase-books`)
}

//http://localhost:3000/home-books : get request by home compoennt when page loads
export const getlatestBooksAPI = async ()=>{
    return await apiService("GET",`/home-books`)
}

//http://localhost:3000/all-books : get request by admin resource compoenet when page loads
export const getallAdminBooksAPI = async ()=>{
    return await apiService("GET",`/all-books`)
}