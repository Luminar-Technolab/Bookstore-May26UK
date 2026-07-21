import React, { createContext, useEffect, useState } from 'react'
export const routeContext = createContext('')

function AuthGuard({children}) {

    const [role,setRole] = useState("")
    const [isAuthorised,setIsAuthorised] = useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
            const user = JSON.parse(sessionStorage.getItem("user"))
            setRole(user.role)
            setIsAuthorised(true)
        }
    },[role,isAuthorised])

  return (
    <routeContext.Provider value={{role,setRole,isAuthorised,setIsAuthorised}}>
        {children}
    </routeContext.Provider>
  )
}

export default AuthGuard