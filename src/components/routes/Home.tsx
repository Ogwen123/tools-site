import React from 'react'
import { useTools } from '../../App'
import { NavLink } from 'react-router-dom'

const Home = () => {

    const GRADIENT_COUNT = 5

    const { tools } = useTools()

    const [search, setSearch] = React.useState<string>("")

    return (
        <div className='min-h-[100vh] flex flex-col items-center'>
            <div className='w-full flex flex-row items-center justify-evenly'>
                <div className='text-5xl bg-gradient-to-r from-main to-secondary inline-block text-transparent bg-clip-text'>Tools</div>
                <input
                    type="text"
                    className='form-input h-[50px] w-3/5 my-[10px]'
                    placeholder='Search'
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                ></input>
            </div>
            <div className='flex flex-row flex-wrap w-full'>
                {
                    Object.keys(tools).map((categoryKey, index) => {
                        const category = tools[categoryKey]
                        if (category.show !== undefined && category.show === false) {
                            return (<div key={index}></div>)
                        }

                        const formattedSearch = search.toLowerCase().replace(/ /g, "_")
                        let show = false

                        if (search !== "") {
                            const categoryTools = Object.keys(category.tools)

                            for (let i of categoryTools) {
                                const formattedSearch = search.toLowerCase().replace(/ /g, "_")

                                if (i.includes(formattedSearch)) {
                                    show = true
                                }
                            }

                            if (categoryKey.includes(formattedSearch)) {
                                show = true
                            }
                        } else {
                            show = true
                        }

                        console.log(categoryKey + " " + show)

                        return (
                            <div key={index} className={'flex flex-col flex-grow rounded-md p-[10px] min-w-[300px] m-[10px] h-[100px]' + (show ? " " : " opacity-15 ") + (index % GRADIENT_COUNT === 0 ? "gradient-0" : index % GRADIENT_COUNT === 1 ? "gradient-1" : index % GRADIENT_COUNT === 2 ? "gradient-2" : index % GRADIENT_COUNT === 3 ? "gradient-3" : "gradient-4")}>
                                <div className='text-xl'>{category.name}</div>
                                <div className='flex flex-row items-center flex-grow'>
                                    {Object.keys(category.tools).map((toolKey, _index) => {
                                        const tool = category.tools[toolKey]
                                        return (
                                            <div key={_index} className='flex flex-row'>
                                                {show ?
                                                    <NavLink to={tool.link} target={tool.link.startsWith("http") ? "_blank" : ""} className="hover:underline">{tool.name}</NavLink>
                                                    :
                                                    <div>{tool.name}</div>
                                                }
                                                {
                                                    _index !== Object.keys(category.tools).length - 1 &&
                                                    <div className='mx-[10px]'>
                                                        •
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='text-bg'>Turn off your dark mode extension to see the pretty gradients.</div>
        </div>
    )
}

export default Home

/*
<div>
    {
        Object.keys(category.tools).map((toolKey, index) => {
            const tool = category.tools[toolKey]
            if (tool.show !== undefined && tool.show === false) {
                return (<div key={index}></div>)
            }
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
            if (tool.show !== undefined && tool.show === false) {
                return (<div key={index}></div>)
            }
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
*/