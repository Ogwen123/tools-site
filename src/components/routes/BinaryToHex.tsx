import React from 'react'
import { binaryToDenary, denaryToHex, hexToBinary } from '../../utils/conversions'

const BinaryToHex = () => {

    const [binary, setBinary] = React.useState<string>("")
    const [hex, setHex] = React.useState<string>("")
    const [lastChanged, setLastChanged] = React.useState<"BIN" | "HEX">()

    const convert = () => {
        if (lastChanged === "BIN") {
            const denary = binaryToDenary(binary, false)
            if (denary === false) {
                return
            }
            const hexValue = denaryToHex(denary.toString())
            if (hexValue === false) {
                return
            }
            setHex(hexValue.toString())
        } else {
            let tempHex = hex
            if (hex.startsWith("0x")) {
                tempHex = hex.slice(2)
            }

            const binaryValue = hexToBinary(tempHex)

            if (binaryValue === false) {
                return
            }

            setBinary(binaryValue)
        }
    }

    return (
        <div className='flex fc flex-col'>
            <div className='text-4xl mt-[100px]'>Binary to Hexidecimal</div>
            <div className='w-2/5 mt-[30px] bg-bgdark rounded-md p-[10px]'>
                <div className='my-[10px]'>
                    <div>Binary</div>
                    <input
                        value={binary}
                        onChange={(e) => {
                            setBinary(e.target.value)
                            setLastChanged("BIN")
                        }}
                        placeholder='Binary'
                        className='form-input bg-bg'
                    ></input>
                </div>
                <div className='my-[10px]'>
                    <div>Hex</div>
                    <input
                        value={hex}
                        onChange={(e) => {
                            setHex(e.target.value.toUpperCase())
                            setLastChanged("HEX")
                        }}
                        placeholder='Hex'
                        className='form-input bg-bg'
                    ></input>
                </div>
                <button className='button my-[10px]' onClick={() => convert()}>Convert</button>
            </div>
        </div>
    )
}

export default BinaryToHex