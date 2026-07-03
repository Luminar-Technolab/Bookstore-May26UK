import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'http://localhost:3000',
    timeout:10000
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = sessionStorage.getItem("token")
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error=>{
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response)=>{
        console.log("HTTP Response received!!!");
        return response
    },
    (error)=>{
        if(error.response){
            const status = error.response.status
            if(status==401){
                console.log("Unauthorised access ");
            }else if(status==404){
                console.log("API Not Found");
            }else if(status==500){
                console.log("Server error ");
            }else if(error.request){
                console.log("Client Errors ");
                return error.request
            }else{
                console.log(`Error : ${error.message}`);
                // return error
                
            }
            return Promise.reject(error)
        }
    }
)

export default axiosInstance