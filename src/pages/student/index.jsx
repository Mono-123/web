import React, { useState } from 'react'
import { useParams, Outlet, useNavigate } from 'react-router-dom'

export default () => {

  return (
    <div> 
      <h1>Student</h1>

      <Outlet />
    </div>
  )
}