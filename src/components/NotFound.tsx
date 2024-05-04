//import React from 'react'

import { NavLink } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="text-xl text-center pt-[100px] h-[100px]">This is not a valid URL. Click <NavLink to="/" className="text-blue-500 underline">here</NavLink> to go back to the home page.</div>
    )
}

export default NotFound