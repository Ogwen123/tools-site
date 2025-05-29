export type Tool = {
    name: string,
    link: string,
    show?: boolean
}

export type ToolCategory = {
    name: string,
    tools: { [id: string]: Tool },
    show?: boolean
}


export type ToolObject = {
    [id: string]: ToolCategory
}

export type _Alert = [string | [string, string], "SUCCESS" | "ERROR", boolean]

export type PointData = {
    id: number,
    x: number,
    y: number,
    colour: string,
    show: boolean
}

export type TruthTableInputError = {
    valid: boolean,
    error: string | undefined
}

export type TruthTableOutput = {

}

export type ColourFormat = "RGB" | "HEX" | "HSL" | "HWB" | "CMYK" | "NONE"

export type ColourInput = {
    input: string,
    type: ColourFormat
}

export type ColourConversionResult = {
    active: boolean,
    rgb: string,
    hex: string,
    hsl: string,
    hwb: string,
    cmyk: string
}

export type RGB = {
    red: number,
    green: number,
    blue: number,
    string: string
}

export type IntermediateMatrix = { [key: string]: string }