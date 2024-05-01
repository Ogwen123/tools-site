//import React from 'react'

import React from "react"
import { countLetters, countLettersWithoutSpaces, wordCount } from "../../utils/length"

const Length = () => {

    const [countSpecific, setCountSpecific] = React.useState<boolean>(true)
    const [string, setString] = React.useState<string>("")

    React.useEffect(() => {
        setCountSpecific(false)
    }, [])

    return (
        <div className="w-full flex flex-row h-full">
            <div className="w-[calc(25%-5px)] flex flex-col mr-[5px]">
                <div className="bg-bgdark rounded-md p-[5px] shrink">
                    <div>
                        <div className="text-lg">Count Specific Letter</div>
                    </div>
                    <div>
                        <div className="text-lg">Regex Matching</div>
                    </div>
                </div>
            </div>
            <div className="w-[calc(75%-5px)] ml-[5px] ">
                <textarea
                    className="w-full mb-[5px] rounded-md bg-bgdark text-white px-[10px] py-[5px] h-[200px] resize-none"
                    placeholder="Enter your text here..."
                    value={string}
                    onChange={(e) => {
                        setString(e.target.value)
                    }}
                >

                </textarea>
                <div className="w-full my-[5px] bg-bgdark rounded-lg p-[5px] flex flex-row">
                    <div className="flex flex-row items-end mr-[40px]">
                        <div className="text-2xl text-mainlight">{wordCount(string)}</div>
                        <div className="mb-[2px]">&nbsp;Words</div>
                    </div>
                    <div className="flex flex-row items-end mr-[40px]">
                        <div className="text-2xl text-mainlight">{countLetters(string)}</div>
                        <div className="mb-[2px]">&nbsp;Letters</div>
                    </div>
                    <div className="flex flex-row items-end mr-[40px]">
                        <div className="text-2xl text-mainlight">{countLettersWithoutSpaces(string)}</div>
                        <div className="mb-[2px]">&nbsp;Letters Without Spaces</div>
                    </div>
                    {countSpecific &&
                        <div className="flex flex-row items-end mr-[40px]">
                            <div className="text-2xl text-mainlight">100</div>
                            <div className="mb-[2px]">&nbsp;Occurences of x</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Length