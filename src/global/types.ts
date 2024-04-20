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