import React from 'react'

const Lister = () => {

    const [delimiter, setDelimiter] = React.useState<string>("")
    const [input, setInput] = React.useState<string>("")
    const [output, setOutput] = React.useState<string>("")
    const [numberMode, setNumberMode] = React.useState<boolean>()

    React.useEffect(() => {
        if (input === "") {
            setOutput("")
            return
        }

        let res = "["
        const split = input.split(delimiter === "" ? " " : delimiter)
        for (let i = 0; i < split.length; i++) {
            let buffer = ""
            if (!numberMode) buffer += "\""
            buffer += split[i]
            if (!numberMode) buffer += "\""
            if (i !== split.length - 1) {
                buffer += ", "
            }
            res += buffer
        }
        res += "]"

        setOutput(res)
    }, [input, numberMode, delimiter])

    return (
        <div className='flex fc flex-col w-full h-full'>
            <div className='flex fc flex-col w-full'>
                <div className='text-2xl'>
                    Lister
                </div>
                <div className='w-2/5 border-w rounded-md text-center p-[10px] mt-[10px]'>
                    Convert a string of characters into a list. The default delimiter is a space but it can be overridden by setting your own in the input below.
                </div>
            </div>

            <div className='w-2/5 flex flex-row'>
                <input
                    type="text"
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    className='form-input w-1/2 mr-[25px]'
                    placeholder='Delimiter'
                />
                <div className='w-1/2 fc ml-[25px]'>
                    Number Mode
                    <input
                        type="checkbox"
                        className='ml-[10px] accent-main'
                        checked={numberMode}
                        onChange={(e) => setNumberMode(e.target.checked)}
                    />
                </div>
            </div>

            <div className='fc flex-row w-4/5 h-4/5'>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='form-input flex-grow h-full resize-none'
                    placeholder='Input'
                />
                <div className='m-[20px] w-[10px]'>
                    {">"}
                </div>
                <textarea
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    className='form-input flex-grow h-full resize-none'
                    placeholder='Result'
                />
            </div>
        </div>
    )
}

export default Lister