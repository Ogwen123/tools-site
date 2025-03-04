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
                link: "/conversions/binary-to-denary",
            },
            hex_to_denary: {
                name: "Hex To Denary",
                link: "/conversions/hex-to-denary"
            },
            colour_conversions: {
                name: "Colour Conversions",
                link: "/conversions/colour-conversions"
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
            },
            markdown_visualiser: {
                name: "Markdown Visualiser",
                link: "/visual/markdown-visualiser"
            },
            maps_visualiser: {
                name: "Maps Visualiser",
                link: "/visual/maps-visualiser"
            }
        },
        show: true
    },
    string: {
        name: "String",
        tools: {
            string_length: {
                name: "String Length",
                link: "/string/string-length"
            },
            regex_matcher: {
                name: "RegEx Matcher",
                link: "/string/regex-matcher",
                show: false
            },
            lister: {
                name: "Lister",
                link: "/string/lister",
            }
        }
    },
    logic: {
        name: "Logic and Maths",
        tools: {
            truth_table_generator: {
                name: "Truth Table Generator",
                link: "/logic/truth-table-generator"
            },
            matrix_inverter: {
                name: "Matrix Inverter",
                link: "/logic/matrix-inverter"
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

export const GRADIENT_COUNT = 5

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