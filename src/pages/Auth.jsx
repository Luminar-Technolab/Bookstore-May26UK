import React from 'react'

function Auth({insideRegisterRoute}) {
  console.log(insideRegisterRoute?'Register':'Login');
  
  return (
    <div>Auth</div>
  )
}

export default Auth