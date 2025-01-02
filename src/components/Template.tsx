//import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar.tsx'
import Path from './Path.tsx'

const Template = () => {
    return (
        <div className="flex flex-row min-h-[100vh] w-full">
            <SideBar />
            <div className="flex flex-col w-[85vw]">
                <Path />
                <div className="p-[10px] h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Template