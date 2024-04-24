//import React from 'react'
import { useTools } from '../../App'
import { NavLink } from 'react-router-dom'

const Home = () => {

    const { tools } = useTools()

    return (
        <div className='flex flex-row min-h-[100vh]'>
            {
                Object.keys(tools).map((categoryKey, index) => {
                    const category = tools[categoryKey]
                    return (
                        <div key={index} className='rounded-md p-[10px] m-[10px] bg-bgdark min-w-[calc(25%-20px)] h-[300px]'>
                            {category.name}
                            <div className='flex flex-row'>
                                <div>
                                    {
                                        Object.keys(category.tools).map((_, index) => {
                                            return (
                                                <div key={index} className='h-[40px]'>
                                                    <svg
                                                        className='w-[40px] h-[40px] rotate-[135deg]'
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 7 45 20"
                                                    >
                                                        <polyline className="fill-none stroke-main stroke-[2px]" points="12.25,5 23.25,16 12.25,27 " />
                                                    </svg>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    {
                                        Object.keys(category.tools).map((toolKey, index) => {
                                            const tool = category.tools[toolKey]
                                            return (
                                                <div className='h-[40px] flex items-center' key={index}>
                                                    <NavLink
                                                        to={tool.link}
                                                        className="hover:underline hover:text-main underline-offset-2"
                                                    >{tool.name}</NavLink>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home