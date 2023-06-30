import React, { useState } from 'react'
import { useParams, Outlet, useNavigate } from 'react-router-dom'

export default () => {

  return (
    <div> 
      <h1>Score</h1>

      <Outlet />
    </div>
  )
}