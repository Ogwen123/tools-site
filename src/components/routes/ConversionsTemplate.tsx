//import React from 'react'

import { Outlet } from "react-router-dom"
import SideBar from "../SideBar"
import Path from "../Path"

const ConversionsTemplate = () => {

    return (
        <div className="flex flex-row min-h-[100vh] w-full">
            <SideBar />
            <div className="flex flex-col w-[85vw]">
                <Path />
                <div className="p-[5px]">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ConversionsTemplate