import React from 'react'
import ConversionsTemplate from './ConversionsTemplate'

const BinaryToHex = () => {

    const [binary, setBinary] = React.useState<string>("")
    const [hex, setHex] = React.useState<string>("")
    const [lastChanged, setLastChanged] = React.useState<"BIN" | "HEX">()

    const validateInput = () => {

    }

    const convert = () => {

    }

    return (
        <div className='flex fc flex-col'>
            <div className='w-2/5 mt-[100px]'>
                <div className='my-[10px]'>
                    <div>Binary</div>
                    <input
                        value={binary}
                        onChange={(e) => {
                            setBinary(e.target.value)
                            setLastChanged("BIN")
                        }}
                        placeholder='Binary'
                        className='form-input'
                    ></input>
                </div>
                <div className='my-[10px]'>
                    <div>Hex</div>
                    <input
                        value={hex}
                        onChange={(e) => {
                            setHex(e.target.value)
                            setLastChanged("HEX")
                        }}
                        placeholder='Hex'
                        className='form-input'
                    ></input>
                </div>
                <button className='button' onClick={() => convert()}>Convert</button>
            </div>
        </div>
    )
}

export default BinaryToHex