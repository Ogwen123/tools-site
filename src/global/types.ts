export type Tool = {
    name: string,
    link: string
}

export type ToolCategory =
    {
        name: string,
        tools: { [id: string]: Tool }
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