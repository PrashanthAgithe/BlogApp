import React from 'react'
import {useRouteError} from 'react-router-dom'
function ErrorLayout() {
  let error=useRouteError();
  console.log(error);
  return (
    <div>
      <h1 style={{margin:'50px'}}>{error.status}-{error.data}</h1>
    </div>
  )
}

export default ErrorLayout