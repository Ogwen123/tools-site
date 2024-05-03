//import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import { ToolObject } from './global/types'


export const tools: ToolObject = {
    conversions: {
        name: "Conversions",
        tools: {
            binary_to_hex: {
                name: "Binary To Hex",
                link: "/conversions/binary-to-hex"
            },
            binary_to_denary: {
                name: "Binary To Denary",
                link: "/conversions/binary-to-denary"
            },
            hex_to_denary: {
                name: "Hex To Denary",
                link: "/conversions/hex-to-denary"
            }
        }
    },
    visual: {
        name: "Visual",
        tools: {
            plotting: {
                name: "Plotting",
                link: "/visual/plotting",
                show: false
            }
        },
        show: true
    },
    misc: {
        name: "Miscellaneous",
        tools: {
            string_length: {
                name: "String Length",
                link: "/misc/string-length"
            }
        }
    },
    external: {
        name: "External Tools",
        tools: {
            markdown_table: {
                name: "Markdown Table Generator",
                link: "https://table.ogwen.eu.org"
            },
            sqlite_generator: {
                name: "SQLite Generator",
                link: "https://sql.ogwen.eu.org"
            }
        }
    }
}

const App = () => {
    return (
        <div className='min-h-[100vh]'>
            <Outlet context={{ tools }} />
        </div>
    )
}

export const useTools = () => {
    return useOutletContext<{ tools: ToolObject }>()
}

export default App