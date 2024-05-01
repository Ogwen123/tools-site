import React from 'react'
import { useTools } from '../App'
import { ToolCategory } from '../global/types'
import { parsedPathname } from '../utils/url'
import { NavLink } from 'react-router-dom'

const SideBar = () => {

    const { tools } = useTools()

    const [page, setPage] = React.useState<ToolCategory>()

    React.useEffect(() => {
        const loc = parsedPathname().split("/")[0]

        if (tools[loc] !== null) {
            setPage(tools[loc])
        }
    }, [])

    return (
        <div className='w-[15vw] bg-bgdark p-[10px]'>
            <NavLink to="/" className="text-3xl text-main w-full fc mb-[10px] py-[10px] bg-bg rounded-md">Tools</NavLink>
            {page ?
                <div>
                    {page.name}
                    <div className='flex flex-row'>
                        <div>
                            {
                                Object.keys(page.tools).map((_, index) => {
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
                                Object.keys(page.tools).map((toolKey, index) => {
                                    const tool = page.tools[toolKey]
                                    return (
                                        <div className='h-[40px] flex items-center' key={index}>
                                            <NavLink
                                                key={index}
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
                :
                <div></div>
            }
        </div>
    )
}

export default SideBar