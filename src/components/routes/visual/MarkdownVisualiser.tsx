import React from 'react'
import Markdown from 'react-markdown'

const MarkdownVisualiser = () => {

    const [markdown, setMarkdown] = React.useState<string>("")

    return (
        <div className='flex flex-row h-full'>
            <textarea
                value={markdown}
                onChange={(e) => {
                    setMarkdown(e.target.value)
                }}
                className='form-input w-[calc(50%-10px)] mr-[10px] my-0'
                placeholder='Enter your markdown here...'
            >

            </textarea>
            {
                markdown === "" ?
                    <div className="bg-bgdark ml-[10px] rounded-lg p-[10px] w-[calc(50%-10px)] fc text-2xl">
                        Your markdown will appear here
                    </div>
                    :
                    <Markdown className="bg-bgdark ml-[10px] rounded-lg p-[10px] w-[calc(50%-10px)] prose lg:prose-xl prose-invert text-white">{markdown}</Markdown>
            }
        </div>
    )
}

export default MarkdownVisualiser