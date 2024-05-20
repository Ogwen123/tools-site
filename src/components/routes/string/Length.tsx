//import React from 'react'

import React from "react"
import { countLetters, countLettersWithoutSpaces, wordCount } from "../../../utils/length"

const Length = () => {

    const [countSpecific, setCountSpecific] = React.useState<string>("")
    const [string, setString] = React.useState<string>("")

    return (
        <div className="w-full flex flex-row h-full">
            <div className="w-[calc(25%-5px)] flex flex-col mr-[5px]">
                <div className="bg-bgdark rounded-md p-[10px] shrink">
                    <div>
                        <div className="text-lg">Count Specific String</div>
                        <input
                            type="text"
                            className="form-input bg-bg"
                            placeholder="String"
                            value={countSpecific}
                            onChange={(e) => {
                                setCountSpecific(e.target.value)
                            }}
                        ></input>
                    </div>
                    <hr className="border-hr my-[5px]" />
                </div>
            </div>
            <div className="w-[calc(75%-5px)] ml-[5px] ">
                <textarea
                    className="w-full mb-[5px] rounded-md bg-bgdark text-white px-[10px] py-[5px] h-[350px] resize-none"
                    placeholder="Enter your text here..."
                    value={string}
                    onChange={(e) => {
                        setString(e.target.value)
                    }}
                >

                </textarea>
                <div className="w-full my-[5px] bg-bgdark rounded-lg p-[10px] flex flex-row">
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
                    {countSpecific !== "" &&
                        <div className="flex flex-row items-end mr-[40px]">
                            <div className="text-2xl text-mainlight">{(string.match(new RegExp(countSpecific, "g")) || []).length}</div>
                            <div className="mb-[2px] flex flex-row">&nbsp;Occurences of&nbsp;<div className="text-secondary">{countSpecific}</div></div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Length