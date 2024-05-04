import React from 'react'
import { useTools } from '../App'
import { parsedPathname } from '../utils/url'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { NavLink, useLocation } from 'react-router-dom'
import { Tool } from '../global/types'

const Path = () => {

    const { tools } = useTools()

    const [path, setPath] = React.useState<(Tool | "ERROR")[]>([])

    React.useEffect(() => {
        const pathComponenents: ({ name: string, link: string } | "ERROR")[] = []
        const pathname = parsedPathname().split("/")
        let next: any = tools

        let pathToSet = ""

        for (let [index, i] of pathname.entries()) {
            pathToSet += "/" + i
            if (next[i] === undefined) {
                if (next.tools === undefined) {
                    pathComponenents.push("ERROR")
                    break
                }
                if (index !== pathname.length - 1) {
                    pathComponenents.push("ERROR")
                    break
                } else {
                    let found = false
                    for (let j of Object.keys(next.tools)) {
                        if (j === i.replace(/-/g, "_")) {
                            pathComponenents.push(next.tools[j])
                            found = true
                            break
                        }
                    }
                    if (!found) {
                        pathComponenents.push("ERROR")
                    }
                }
            } else {
                pathComponenents.push({ name: next[i].name, link: pathToSet })
                next = next[i]
            }
        }

        setPath([{ name: "Tools", link: "/" }, ...pathComponenents])
    }, [useLocation().pathname])

    return (
        <div className='p-[10px] flex'>
            <div className='py-[5px] px-[10px] flex flex-row shrink text-lg bg-main rounded-md'>
                {
                    path?.map((component, index) => {
                        return (
                            <div key={index} className='fc flex-row'>
                                <NavLink to={(component instanceof Object ? component.link : "/")} className=" hover:underline">
                                    {component instanceof Object ? component.name : component}
                                </NavLink>
                                {
                                    index !== path.length - 1 &&
                                    <ChevronRightIcon className='h-5 w-5' />
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Path